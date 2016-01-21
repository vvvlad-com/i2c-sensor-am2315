'use strict';

// inject libraries
var tape = require('tape');
var mockery = require('mockery');

// I2C bus stub
var i2cBusStub = {
	open: function(bus, callback) {
		setImmediate(callback, null);
		return i2cBusStub;
	},
	close: function(callback) {
		callback(null);
	},
	scan: function(callback) {
		callback(null, []);
	},
	i2cWrite: function(address, bytes, buffer, callback) {
		callback(null, 3, buffer);
	},
	i2cRead: function(address, bytes, buffer, callback) {
		callback(null, 8, new Buffer([0x03, 0x04, 0x03, 0x39, 0x01, 0x15, 0xE1, 0xFE]));
	}
};

// test
tape('test i2c-sensor-am2315.setI2cBusNumber() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// set bus number
	device.setI2cBusNumber(1);
	
	// assert equal
	assert.equal(device.config.i2cBusNumber, 1);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.setDeviceAddress() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// set device address
	device.setDeviceAddress(1);
	
	// assert equal
	assert.equal(device.config.deviceAddress, 1);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.setReadCmdRegister() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// set read cmd register
	device.setReadCmdRegister(1);
	
	// assert equal
	assert.equal(device.config.readCmdRegister, 1);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.setDebugMode() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// set debug mode
	device.setDebugMode(true);
	
	// assert equal
	assert.equal(device.config.debugMode, true);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.calcTemperature() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.calcTemperature(0x01, 0x15), 300.85);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.calcHumidity() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.calcHumidity(0x03, 0x39), 82.5);
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.calcCRC() ', function(assert) {
	// use sinon to stub out
	var device, buffer, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// read buffer
	buffer = new Buffer([0x03, 0x04, 0x03, 0x39, 0x01, 0x15, 0xE1, 0xFE]);
	
	// assert equal
	assert.equal(device.calcCRC(buffer), ((buffer[7] << 8) + buffer[6]));
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertKelvinToCelsius() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertKelvinToCelsius(0), -273.15);
	assert.equal(device.convertKelvinToCelsius(273.15), 0);
	assert.deepEqual(device.convertKelvinToCelsius({ temperature: 0, temperatureUnit: 'K' }), { temperature: -273.15, temperatureUnit: '°C' });
	assert.deepEqual(device.convertKelvinToCelsius({ temperature: 273.15, temperatureUnit: 'K' }), { temperature: 0, temperatureUnit: '°C' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertKelvinToFahrenheit() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertKelvinToFahrenheit(0), -459.67);
	assert.equal(device.convertKelvinToFahrenheit(270), 26.33);
	assert.deepEqual(device.convertKelvinToFahrenheit({ temperature: 0, temperatureUnit: 'K' }), { temperature: -459.67, temperatureUnit: '°F' });
	assert.deepEqual(device.convertKelvinToFahrenheit({ temperature: 270, temperatureUnit: 'K' }), { temperature: 26.33, temperatureUnit: '°F' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertFahrenheitToCelsius() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertFahrenheitToCelsius(-459.67), -273.15);
	assert.equal(device.convertFahrenheitToCelsius(-40), -40);
	assert.deepEqual(device.convertFahrenheitToCelsius({ temperature: -459.67, temperatureUnit: '°F' }), { temperature: -273.15, temperatureUnit: '°C' });
	assert.deepEqual(device.convertFahrenheitToCelsius({ temperature: -40, temperatureUnit: '°F' }), { temperature: -40, temperatureUnit: '°C' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertFahrenheitToKelvin() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertFahrenheitToKelvin(-459.67), 0);
	assert.equal(device.convertFahrenheitToKelvin(100), 310.93);
	assert.deepEqual(device.convertFahrenheitToKelvin({ temperature: -459.67, temperatureUnit: '°F' }), { temperature: 0, temperatureUnit: 'K' });
	assert.deepEqual(device.convertFahrenheitToKelvin({ temperature: 100, temperatureUnit: '°F' }), { temperature: 310.93, temperatureUnit: 'K' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertCelsiusToKelvin() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertCelsiusToKelvin(-273.15), 0);
	assert.equal(device.convertCelsiusToKelvin(20), 293.15);
	assert.deepEqual(device.convertCelsiusToKelvin({ temperature: -273.15, temperatureUnit: '°C' }), { temperature: 0, temperatureUnit: 'K' });
	assert.deepEqual(device.convertCelsiusToKelvin({ temperature: 20, temperatureUnit: '°C' }), { temperature: 293.15, temperatureUnit: 'K' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertCelsiusToFahrenheit() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertCelsiusToFahrenheit(0), 32);
	assert.equal(device.convertCelsiusToFahrenheit(100), 212);
	assert.deepEqual(device.convertCelsiusToFahrenheit({ temperature: 0, temperatureUnit: '°C' }), { temperature: 32, temperatureUnit: '°F' });
	assert.deepEqual(device.convertCelsiusToFahrenheit({ temperature: 100, temperatureUnit: '°C' }), { temperature: 212, temperatureUnit: '°F' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.convertCelsiusToFahrenheit() ', function(assert) {
	// use sinon to stub out
	var device, buffer, driver, i2cBusStub;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// assert equal
	assert.equal(device.convertCelsiusToFahrenheit(0), 32);
	assert.equal(device.convertCelsiusToFahrenheit(100), 212);
	assert.deepEqual(device.convertCelsiusToFahrenheit({ temperature: 0, temperatureUnit: '°C' }), { temperature: 32, temperatureUnit: '°F' });
	assert.deepEqual(device.convertCelsiusToFahrenheit({ temperature: 100, temperatureUnit: '°C' }), { temperature: 212, temperatureUnit: '°F' });
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});

// test
tape('test i2c-sensor-am2315.read() ', function(assert) {
	// use sinon to stub out
	var device, driver;
	
	// enable mockery
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	
	// replace the module `i2c-bus` with a stub object
	mockery.registerMock('i2c-bus', i2cBusStub);
	
	// now require the code to be tested
	driver = require('../driver');
	
	// create device
	device = new driver;
	
	// read the device
	device.read(function(err, result) { 
		assert.deepEqual(result, { temperature: 300.85, temperatureUnit: 'K', humidity: 82.5, humidityUnit: '%RH', crcCheck: true });
	});
	
	// disable mockery
	mockery.disable();
	
	// end assertion
	assert.end();
});
