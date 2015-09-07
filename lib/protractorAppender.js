'use strict';
var consoleAppender = require('log4js/lib/appenders/console');

function protractorAppender(consoleLog) {
  return function(loggingEvent) {
    if (GLOBAL.browser) {
      GLOBAL.browser.controlFlow().execute(function () {
        consoleLog(loggingEvent);
      });
    } else {
      consoleLog(loggingEvent);
    }
  }
}

function configure(config) {
  return protractorAppender(consoleAppender.configure(config));
}

exports.appender = protractorAppender;
exports.configure = configure;
