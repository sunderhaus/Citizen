var express = require("express"),
	  app = express(),
	  port = process.env.PORT || 3000;

// This serves up all the HTML pages on the site
// The port designation allows us to develop on 8083 but serve from heroku on standard ports

app.use("/", express.static(__dirname + "/app")).listen(port);
// if (app.get('CITIZEN_ENV') === 'development') {
// 	app.use("/", express.static(__dirname + "/app")).listen(port);
// } else {
// 	app.use("/", express.static(__dirname + "/public")).listen(port);
// }

console.log("APP Server started successfully on port " + port);
console.log("Browse to the application at http://localhost:" + port);
