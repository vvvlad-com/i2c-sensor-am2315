# I2C Driver for Sensor AM2315

[![Build Status](https://travis-ci.org/vvvlad-com/i2c-sensor-am2315.svg?branch=master)](https://travis-ci.org/vvvlad-com/i2c-sensor-am2315)
[![Git Issues](https://img.shields.io/github/issues/vvvlad-com/i2c-sensor-am2315.svg?style=flat)](https://github.com/vvvlad-com/i2c-sensor-am2315)
[![NPM Downloads](https://img.shields.io/npm/dt/i2c-sensor-am2315.svg?style=flat)](https://www.npmjs.com/package/i2c-sensor-am2315)
[![Current Version](https://img.shields.io/npm/v/i2c-sensor-am2315.svg?style=flat)](https://www.npmjs.com/package/i2c-sensor-am2315)

I2C communication driver for the AOSONG AM2315 temperature and humidity sensor.

## Installation

### Using npm
Install via `npm` using:

	npm install i2c-sensor-am2315 --save

### Dependencies

* [i2c-bus](https://github.com/fivdi/i2c-bus)
* [crc](https://github.com/alexgorbatchev/node-crc)

To successfully install i2c-bus, and thus this library from npm, access to the i2c-dev interface and library is needed. If you plan to develop on a Mac or PC:

1. Download the [i2c-sensor-am2315](https://github.com/vvvlad-com/i2c-sensor-am2315) repo.
2. Comment out the `i2c-bus` dependency in package.json
3. Install the `i2c-sensor-am2315` module with the path inside your project folder (npm install)


## Usage

The driver supports an asynchronous read() command:

	// init prerequisites
	var Driver = require('i2c-sensor-am2315');

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

Result:

	Original in K
	{ temperature: 296.25,
	  temperatureUnit: 'K',
	  humidity: 36.3,
	  humidityUnit: '%RH',
	  crcCheck: true,
	  validReading: true }
	Convert K to °F
	{ temperature: 73.58,
	  temperatureUnit: '°F',
	  humidity: 36.3,
	  humidityUnit: '%RH',
	  crcCheck: true,
	  validReading: true }

## Conversions

Temperature is reported by default in SI units (Kelvin), but the driver comes with built-in temperature conversion functions to °F and °C. The functions can convert both atomic numeric values as well as an object with the same structure as the output data. Methods:

* var output = Driver.convertKelvinToCelsius(input);
* var output = Driver.convertKelvinToFahrenheit(input);
* var output = Driver.convertCelsiusToKelvin(input);
* var output = Driver.convertCelsiusToFahrenheit(input);
* var output = Driver.convertFahrenheitToKelvin(input);
* var output = Driver.convertFahrenheitToCelsius(input);

The output matches the input, if input is numeric, then output is numeric. If input is an object, then so is output, however the function does not modify the original input values

## Configuration

Custom driver configuration is available using the following methods, although rarely needed:

### Driver.setI2cBusNumber(bus)
Default is 1 - the default I2C bus on the majority of Raspeberry Pi devices. Use an integer value relevant to your device/controller.

	// init prerequisites
	var Driver = require('i2c-sensor-am2315');

	// create device
	var device = new Driver;

	// set to bus 0 (older Raspberry Pi devices)
	device.setI2cBusNumber(0);

### Driver.setDeviceAddress(address)

Default is 0x5c - the AM2315 microcontroller uses a fixed address of 0x5c on the I2C bus, you should never have to change this value.

### Driver.setReadCmdRegister(register)

Default is 0x03 - also a value you should not have to change, unless you customize this driver library to implement a different read register command.

### Driver.setDebugMode(true)

Default is false - set it to true to output additional debugging information to the console.

## Compatibility

Tested to work on:

* Raspberry Pi 2 Model B, Linux raspberrypi 4.1.15-v7+

Let me know of other tested devices and I'll add them to the list.
