var consoleAppender = require('log4js/lib/appenders/console');

function protractorAppender(layout, timezoneOffset) {
  var consoleLog = consoleAppender.appender(layout, timezoneOffset);
  return function(loggingEvent) {
    consoleLog(loggingEvent);
  }
}

function configure(config) {
  return consoleAppender.configure(config);
}

exports.appender = protractorAppender;
exports.configure = configure;
