// Requires
const scrape = require('./scrape.js');
const fs = require('fs');

// Read in keys
var data = JSON.parse(fs.readFileSync('./scrapeData.json', 'utf8'));
var urls = [];
for(var key in data) {
	urls.push(key);
}

module.exports = function main_app() {
	urls.forEach((url, index) => {

	    setTimeout(() => {
	        scrape(url);
	    }, index*5000);

	});
}
