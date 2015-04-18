var Twitter = require('twitter');

// Twitter API access parameters
var client = new Twitter({
	consumer_key		: '',
	consumer_secret		: '',
	access_token_key	: '',
	access_token_secret	: ''
});

var Company = function (symbol, name, highStockRate) {
	this.symbol = symbol;
	this.name = name;
	this.highStockRate = !highStockRate ? 0 : Number(highStockRate);
	this.tweets = [];
}

Company.prototype.setSymbol = function(symbol) {
	this.symbol = symbol;
}

Company.prototype.getSymbol = function() {
	return this.symbol;
}

Company.prototype.setName = function(name) {
	this.name = name;
}

Company.prototype.getName = function(name) {
	return this.name;
}

Company.prototype.setHighStockRate = function(highStockRate) {
	this.highStockRate = highStockRate;
}

Company.prototype.getHighStockRate = function() {
	return this.highStockRate;
}

Company.prototype.setTweets = function(tweets) {
	this.tweets = tweets;
}

Company.prototype.getTweets = function() {
	return this.tweets;
}

Company.prototype.addTweet = function(tweet) {
	return this.tweets.push(tweet);
}

/**
 * Fetches tweets using Tweeter search API
 * @param callBack: Called when response is received
 */
Company.prototype.getTweets = function(callBack) {
	var self = this;
	var searchKeyWord = this.getName();
	
	// Fetch 10 popular tweets by company name as search keyword
	var searchCriteria = {q: searchKeyWord, count : 10, result_type : 'popular'};
	client.get('search/tweets', searchCriteria, function(error, tweets, response) {
		console.log("Response for -------> " + searchCriteria.q + " error --> " + error);
		if(!error) {
			if(tweets.statuses.length > 0) {
				for(var i = 0; i < tweets.statuses.length; i++) {
					self.addTweet(tweets.statuses[i].text);
				}
			}
		}
		callBack();
	});
}

module.exports = Company;