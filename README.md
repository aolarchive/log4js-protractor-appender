# log4js-protractor-appender

[![Build Status](https://img.shields.io/travis/aol/log4js-protractor-appender.svg?maxAge=2592000)](https://travis-ci.org/aol/log4js-protractor-appender)
[![npm](https://img.shields.io/npm/v/log4js-protractor-appender.svg?maxAge=2592000)](https://www.npmjs.com/package/log4js-protractor-appender)

Log4js appender suited for Protractor


## What is it for?

Log4js is a very powerful tool to provide logs in a NodeJS application and/or test suite. Unfortunately, it poorly integrates with Protractor, as the latter uses a "control flow" system that runs tasks in a very particular order.

`log4js-protractor-appender` ensures logging is integrated with the control flow, and display logging in the proper order.

Example:

```javascript
logger.info('Navigating to /');
browser.get('/');
element(by.css('#someText')).getText().then(function (text) {
  logger.info('Displayed text is: ', text);
});
logger.info('Should be displayed last');
```

Outputs without `log4js-protractor-appender`:

```
[INFO] Navigating to /
[INFO] Should be displayed last
[INFO] Displayed text is: Some text
```

Outputs with `log4js-protractor-appender`:

```
[INFO] Navigating to /
[INFO] Displayed text is: Some Text
[INFO] Should be displayed last
```

## Promises

It resolves promises passed as arguments before outputting them.

Example:

```javascript
logger.info('Displayed text is:', element(by.css('#someText')).getText());
```

Outputs without `log4js-protractor-appender`:

```
[INFO] Displayed text is: [Promise object]
```

Outputs with `log4js-protractor-appender`:

```
[INFO] Displayed text is: Some Text
```

## Setup

`log4js-protractor-appender` overrides log4js' default console appender. Just install it as a dependency:

```bash
$ npm install log4js-protractor-appender --save
```

Then you can load it as any console appender. For example:

```json
{
  "appenders": [
    {
      "type": "log4js-protractor-appender"
    }
  ]
}
```
