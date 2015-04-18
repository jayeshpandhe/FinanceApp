var querystring = require("querystring");
var SectorList = require('../models/sector_list')
var Company = require('../models/company');
var CompanyList = require('../models/company_list');
var utility = require("./utility");
var http = require('http');

exports.getStockDetails = function(reqSector, res, callBack) {
	var companiesList = new CompanyList();
	// http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download
	var options = {
		host: 'www.nasdaq.com',
		path: '/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	};
	
	var httpGet = http.request(options, function(response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			console.log("------- Stock details fetched --------");
			var lines = str.split('\n');

			var find = '"';
			var re = new RegExp(find, 'g');

			for (var line, i = 0, l = lines.length; i < l; i++) {
	            var line = lines[i].split(",");
	            var sector = line[5];
	            if(sector && sector.indexOf(reqSector) > -1) {
	            	sector = sector.replace(re, '');
	            	var symbol = line[0].replace(re, '');
	            	var companyName = line[1].replace(re, '');
		            var highStockRate = line[2].replace(re, '');
		            var company = new Company(symbol, companyName, highStockRate);
	            	companiesList.addCompany(company);
	            } 
			}
			callBack(companiesList);
		});
	});
	
	httpGet.on('error', function(e) {
		console.log("------- Error occurred while fetching stock details --------");
		utility.sendFailureJSON(res, "Error occurred while fetching stock details " + e.message);
	});

	httpGet.end();
}
