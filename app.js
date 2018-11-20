// Require main function
const app = require('main_app');

// Run appliction
// Set Interval function should be set for every day or so, 
// whatever you're looking for

setInterval(() => {
	app();
}, 5000);