var CompanyList = function () {
	this.companyList = [];
}

CompanyList.prototype.getList = function() {
	return this.companyList;
}

CompanyList.prototype.addCompany = function(company) {
	var companyMap = {};
	companyMap[company.getSymbol()] = company;
	this.companyList.push(companyMap);
}

CompanyList.prototype.getCompanyBySymbol = function(symbol) {
	a[Object.keys(a)[0]];
}

CompanyList.prototype.getCompanyAtIndex = function(index) {
	var elementAtIndex = this.companyList[index];
	return elementAtIndex[Object.keys(elementAtIndex)[0]];
}

CompanyList.prototype.sort = function() {
	this.companyList.sort(compare);
}

CompanyList.prototype.length = function() {
	return this.companyList.length;
}

CompanyList.prototype.slice = function(start, end) {
	var temp = [];
	for(var i = start; i < end; i++) {
		temp[i] = this.companyList[i];
	}
	this.companyList = temp;
}

function compare(a, b) {
	a = a[Object.keys(a)[0]];	// As object is stored as 'symbol' : {}
	b = b[Object.keys(b)[0]];
	if (a.getHighStockRate() < b.getHighStockRate())
		return 1;
	if (a.getHighStockRate() > b.getHighStockRate())
		return -1;
	return 0;
}

module.exports = CompanyList;