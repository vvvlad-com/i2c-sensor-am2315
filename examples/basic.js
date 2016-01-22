'use strict';

// init prerequisites
var Driver = require('../driver');

// create device
var device = new Driver;

// read the sensor
device.read(function(err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log('Original in K');
		console.log(data);
		console.log('Convert K to °F');
		console.log(device.convertKelvinToFahrenheit(data));
	}
});

		