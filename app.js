
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Company = require('./models/company')
  , SectorList = require('./models/sector_list');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	
	require('node.io').scrape(function() {
		console.log("Fetching details");

	    this.get('http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download', function(err, data) {
	        var lines = data.split('\n');
	        var j = 0;
	        for (var line, i = 0, l = lines.length - 1; i < l; i++) {
	            line = this.parseValues(lines[i]);
            	var sector = line[5];
	            var symbol = line[0];
	            var companyName = line[1];
	            var company = new Company(symbol, companyName);
	            if(!SectorList.hasSector(sector)) {
	            	SectorList.addSector(sector);
	            }
	            SectorList.addCompanyToSector(sector, company);
	        }
	        console.log("Done");
	    });
	});
	
});
