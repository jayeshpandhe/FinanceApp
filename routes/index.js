var SectorList = require('../models/sector_list')
var utility = require("./utility");
var yahooFinance = require("./yahoo_finance");
var nasdaqFinance = require("./nasdaq_finance");
var twitter = require("./twitter");
var async = require("async");

var YAHOO = "yahoo";
var NASDAQ = "nasdaq";

exports.index = function(req, res){
	var sector = req.query.sector;	// Required
	var apiName = req.query.api;	// Optional
	
	// Check sector is present in request or not
	if(!sector) {
		utility.sendFailureJSON(res, "Please enter sector");
		return;
	}

	sector = sector.charAt(0).toUpperCase() + sector.slice(1);

	// Check if we have that sector
	if(!SectorList.hasSector(sector)) {
		console.log(sector + " sector not found");
		
		var errorResponseJSON = {};
		errorResponseJSON["sectors_supported"] = SectorList.getKeys();
		utility.sendCustomFailureJSON(res, sector + " sector not found", errorResponseJSON);
		return;
	}
	apiName = !apiName ? YAHOO : apiName.toLowerCase();
	
	var api;
	if(apiName === YAHOO) {
		api = yahooFinance;
	} else if(apiName === NASDAQ) {
		api = nasdaqFinance;
	} else {
		utility.sendFailureJSON(res, apiName + " API not supported");
		return;
	}

	api.getStockDetails(sector, res, function(companiesList) {
		companiesList.sort();
		var limit = Math.min(companiesList.length(), 10);
		companiesList.slice(0, limit);

		var asyncTasks = [];
		companiesList.getList().forEach(function(company) {

			asyncTasks.push(function(callback) {
				var c = company[Object.keys(company)[0]];
				c.getTweets(callback);
			});
		});
		async.parallel(asyncTasks, function(err, results) {
			console.log("------ All Done ------");
			utility.sendSuccessJSON(res, companiesList);
	    });
	});
};