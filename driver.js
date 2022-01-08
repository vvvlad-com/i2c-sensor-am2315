"use strict";

// init prerequisites
var I2C = require("i2c-bus");
var CRC = require("crc");

// export the sensor driver
module.exports = function () {
  return {
    config: {
      i2cBusNumber: 1,
      deviceAddress: 0x5c,
      readCmdRegister: 0x03,
      debugMode: false,
    },
    setI2cBusNumber: function (bus) {
      // set a custom bus number
      this.config.i2cBusNumber = bus;
      return true;
    },
    setDeviceAddress: function (address) {
      // set a custom bus number
      this.config.deviceAddress = address;
      return true;
    },
    setReadCmdRegister: function (register) {
      // set a custom bus number
      this.config.readCmdRegister = register;
      return true;
    },
    setDebugMode: function (mode) {
      // set a custom bus number
      this.config.debugMode = mode ? true : false;
      return true;
    },
    calcTemperature: function (hiByte, loByte) {
      // per http://www.switchdoc.com/wp-content/uploads/2015/07/AM2315-3.pdf
      return (
        Math.round(((((hiByte & 0x7f) << 8) + loByte) / 10 + 273.15) * 100) /
        100
      );
    },
    calcHumidity: function (hiByte, loByte) {
      // per http://www.switchdoc.com/wp-content/uploads/2015/07/AM2315-3.pdf
      return Math.round((((hiByte << 8) + loByte) / 10.0) * 100) / 100;
    },
    calcCRC: function (buffer) {
      // per http://www.switchdoc.com/wp-content/uploads/2015/07/AM2315-3.pdf
      return CRC.crc16modbus(
        Buffer.from([
          buffer[0],
          buffer[1],
          buffer[2],
          buffer[3],
          buffer[4],
          buffer[5],
        ])
      );
    },
    convertKelvinToCelsius: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a °F unit?
        if (input.temperatureUnit === "°F") {
          output.temperatureUnit = "K";
          output.temperature = this.convertFahrenheitToKelvin(
            input.temperature
          );
        }

        // convert units
        if (output.temperatureUnit === "K") {
          output.temperatureUnit = "°C";
          output.temperature =
            Math.round((output.temperature - 273.15) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round((input - 273.15) * 100) / 100;
      }

      // return
      return output;
    },
    convertKelvinToFahrenheit: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a °C unit?
        if (input.temperatureUnit === "°C") {
          output.temperatureUnit = "K";
          output.temperature = this.convertCelsiusToKelvin(input.temperature);
        }

        // convert units
        if (output.temperatureUnit === "K") {
          output.temperatureUnit = "°F";
          output.temperature =
            Math.round(((output.temperature * 9) / 5 - 459.67) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round(((input * 9) / 5 - 459.67) * 100) / 100;
      }

      // return
      return output;
    },
    convertFahrenheitToCelsius: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a K unit?
        if (input.temperatureUnit === "K") {
          output.temperatureUnit = "°F";
          output.temperature = this.convertKelvinToFahrenheit(
            input.temperature
          );
        }

        // convert units
        if (output.temperatureUnit === "°F") {
          output.temperatureUnit = "°C";
          output.temperature =
            Math.round((output.temperature - 32) * (5 / 9) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round((input - 32) * (5 / 9) * 100) / 100;
      }

      // return
      return output;
    },
    convertFahrenheitToKelvin: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a K unit?
        if (input.temperatureUnit === "°C") {
          output.temperatureUnit = "°F";
          output.temperature = this.convertCelsiusToFahrenheit(
            input.temperature
          );
        }

        // convert units
        if (output.temperatureUnit === "°F") {
          output.temperatureUnit = "K";
          output.temperature =
            Math.round((output.temperature + 459.67) * (5 / 9) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round((input + 459.67) * (5 / 9) * 100) / 100;
      }

      // return
      return output;
    },
    convertCelsiusToKelvin: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a K unit?
        if (input.temperatureUnit === "°F") {
          output.temperatureUnit = "°C";
          output.temperature = this.convertCelsiusToFahrenheit(
            input.temperature
          );
        }

        // convert units
        if (output.temperatureUnit === "°C") {
          output.temperatureUnit = "K";
          output.temperature =
            Math.round((output.temperature + 273.15) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round((input + 273.15) * 100) / 100;
      }

      // return
      return output;
    },
    convertCelsiusToFahrenheit: function (input) {
      // output
      var output;

      // the entire output array was passed?
      if (
        input.temperature !== undefined &&
        input.temperatureUnit !== undefined
      ) {
        // clone the object so we leave the input intact
        output = JSON.parse(JSON.stringify(input));

        // is it a K unit?
        if (input.temperatureUnit === "K") {
          output.temperatureUnit = "°C";
          output.temperature = this.convertKelvinToFahrenheit(
            input.temperature
          );
        }

        // convert units
        if (output.temperatureUnit === "°C") {
          output.temperatureUnit = "°F";
          output.temperature =
            Math.round((output.temperature * (9 / 5) + 32) * 100) / 100;
        }
      } else {
        // convert value
        output = Math.round((input * (9 / 5) + 32) * 100) / 100;
      }

      // return
      return output;
    },
    read: function (callback) {
      // this becomes that
      var that = this;

      // open the i2c bus
      var i2cBus = I2C.open(that.config.i2cBusNumber, function (err) {
        if (err) {
          // log error
          if (that.config.debugMode) {
            console.error(err, err.stack);
          }

          // callback
          callback(err, null);
        } else {
          // scan the bus so we can wake up the device
          i2cBus.scan(function (err, devices) {
            if (err) {
              // log error
              if (that.config.debugMode) {
                console.error(err, err.stack);
              }

              // callback
              callback(err, null);
            } else {
              // log info
              if (that.config.debugMode) {
                console.log(devices);
              }

              // wait ~900 us
              setTimeout(function () {
                // write to the bus (read command register, start register, and read 4 bytes
                i2cBus.i2cWrite(
                  that.config.deviceAddress,
                  3,
                  Buffer.from([that.config.readCmdRegister, 0x00, 0x04]),
                  function (err, bytesWritten, buffer) {
                    if (err) {
                      // log error
                      if (that.config.debugMode) {
                        console.error(err, err.stack);
                      }

                      // callback
                      callback(err, null);
                    } else {
                      // log info
                      if (that.config.debugMode) {
                        console.log(buffer);
                      }

                      // wait 10 ms
                      setTimeout(function () {
                        // read from the bus
                        i2cBus.i2cRead(
                          that.config.deviceAddress,
                          8,
                          Buffer.alloc(8),
                          function (err, bytesRead, buffer) {
                            if (err) {
                              // log error
                              if (that.config.debugMode) {
                                console.error(err, err.stack);
                              }

                              // callback
                              callback(err, null);
                            } else {
                              // log info
                              if (that.config.debugMode) {
                                console.log(buffer);
                              }

                              // prepare output per http://www.switchdoc.com/wp-content/uploads/2015/07/AM2315-3.pdf
                              var output = {
                                temperature: that.calcTemperature(
                                  buffer[4],
                                  buffer[5]
                                ),
                                temperatureUnit: "K",
                                humidity: that.calcHumidity(
                                  buffer[2],
                                  buffer[3]
                                ),
                                humidityUnit: "%RH",
                                crcCheck:
                                  (buffer[7] << 8) + buffer[6] ==
                                  that.calcCRC(buffer),
                                validReading: false,
                              };

                              // perform a sanity check on the reading (CRC is valid)
                              if (output.crcCheck) {
                                // humidity is a percentage so 100 or less
                                if (
                                  output.humidity >= 0 &&
                                  output.humidity <= 100
                                ) {
                                  // temperature rating is -40 to 125 Celsius
                                  if (
                                    output.temperature >= 273.15 - 40 &&
                                    output.temperature <= 273.15 + 125
                                  ) {
                                    // zero temp and humidity is likely a reading error (null)
                                    if (
                                      !(
                                        output.humidity == 0 &&
                                        output.temperature == 273.15
                                      )
                                    ) {
                                      // mark reading as valid
                                      output.validReading = true;
                                    }
                                  }
                                }
                              }

                              // close the bus
                              i2cBus.close(function (err) {
                                if (err) {
                                  // log error
                                  if (that.config.debugMode) {
                                    console.error(err, err.stack);
                                  }

                                  // callback
                                  callback(err, null);
                                } else {
                                  // is the reading valid
                                  if (output.validReading) {
                                    // success callback
                                    callback(null, output);
                                  } else {
                                    // error callback
                                    callback("Reading is invalid", output);
                                  }
                                }
                              });
                            }
                          }
                        );
                      }, 10);
                    }
                  }
                );
              }, 1);
            }
          });
        }
      });
    },
    readAsync: function () {
      return new Promise((resolve, reject) => {
        this.read((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    },
  };
};
