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

module.exports = Company;