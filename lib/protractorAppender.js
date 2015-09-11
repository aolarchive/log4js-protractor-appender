'use strict';
var consoleAppender = require('log4js/lib/appenders/console');

function protractorAppender(consoleLog) {
  return function(loggingEvent) {
    if (GLOBAL.browser) {
      return GLOBAL.browser.controlFlow().execute(function () {
        return resolveAllPromises(loggingEvent.data).then(function (resolvedData) {
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
      var deferred = GLOBAL.protractor.promise.defer();
      deferred.fulfill(value);
      return deferred.promise;
    }
  });
  return GLOBAL.protractor.promise.fullyResolved(promises);
}

function configure(config) {
  return protractorAppender(consoleAppender.configure(config));
}

exports.appender = protractorAppender;
exports.configure = configure;
