// Require main function
const app = require('./main_app');

// Run appliction
// Set Interval function set to every hour
// 1000 ms * 60 seconds * 60 minutes

// Entry Point
setInterval(() => {

	console.log('+')
	app();

}, 10000);