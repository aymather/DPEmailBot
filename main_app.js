// Requires
const scrape = require('./scrape.js');

urls = [
    'https://www.quora.com/profile/Nicolas-Cole-1/answers/published',
    'https://www.quora.com/profile/Drew-Reggie-1/answers/published'
];


module.exports = function main_app() {
	urls.forEach((url, index) => {

	    setTimeout(() => {
	        scrape(url);
	    }, index*5000);

	});
}