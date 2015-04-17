var SectorList = function () {
}

SectorList.sectorList = {};

SectorList.getSectorList = function() {
	return SectorList.sectorList;
};

SectorList.getSector = function(sector) {
	return SectorList.sectorList[sector];
}

SectorList.hasSector = function(sector) {
	return SectorList.sectorList[sector] ? true : false;
}

SectorList.addSector = function(sector) {
	SectorList.sectorList[sector] = [];
}

SectorList.addCompanyToSector = function(sector, company) {
	SectorList.sectorList[sector].push(company);
}

SectorList.getKeys = function() {
	return Object.keys(SectorList.sectorList);
}

module.exports = SectorList;