'use strict';
var consoleAppender = require('log4js/lib/appenders/console');

function protractorAppender(consoleLog) {
  return function(loggingEvent) {
    if (global.browser) {
      return global.browser.controlFlow().execute(function () {
        return resolveAllPromises(loggingEvent.data).then(function (resolvedData) {
          loggingEvent.startTime = new Date();
          loggingEvent.data = resolvedData;
          consoleLog(loggingEvent);
        });
      });
    } else {
      consoleLog(loggingEvent);
    }
  }
}

function resolveAllPromises(dataParts) {
  var promises = dataParts.map(function (value) {
    if (value.then) {
      return value;
    } else {
      return global.protractor.promise.when(value);
    }
  });
  return global.protractor.promise.fullyResolved(promises);
}

function configure(config) {
  return protractorAppender(consoleAppender.configure(config));
}

exports.appender = protractorAppender;
exports.configure = configure;
