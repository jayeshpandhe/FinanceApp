/**
 * Provides utility functions to return response to user
 */

var STATUS = "status";
var MESSAGE = "message";
var RESULT = "result";

exports.sendFailureJSON = function(response, errorMessage, responseObject) {
	var responseJSON = {};
	responseJSON[STATUS] = false;
	responseJSON[MESSAGE] = errorMessage;
	responseJSON[RESULT] = responseObject;
	response.send(responseJSON);
};

exports.sendCustomFailureJSON = function(response, errorMessage,responseJSON) {
	responseJSON[STATUS] = false;
	responseJSON[MESSAGE] = errorMessage;
	response.send(responseJSON);
};

exports.sendSuccessJSON = function(response, responseObject) {
	var responseJSON = {};
	responseJSON[STATUS] = true;
	responseJSON[MESSAGE] = "Details fetched successfully";
	responseJSON[RESULT] = responseObject;
	response.send(responseJSON);
};
