var Twitter = require('twitter');

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

Company.prototype.getTweets = function(callBack) {
	var client = new Twitter({
		consumer_key		: '51a38jxTfwYoanBA3AkPL6Ya6',
		consumer_secret		: 'fPY09aYvengQZyGZkOVs12QNJfmk59kg0pXcLe7uvoyZC0Ljja',
		access_token_key	: '3150570950-HAFgU9c5iobJUbCLwOIIpMhD5TQfHnC7FsM4An3',
		access_token_secret	: 'iVVfj1eli0vxKLYRkISuIL7sOjT9ptSQKdQ5vh3IRM4Vt'
	});
	var self = this;
	var searchKeyWord = this.getName();
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
		console.log(self);
		callBack();
	});
}

module.exports = Company;