describe('protractorAppender', function () {
  var consoleMock;
  var controlFlow;
  var protractorAppender;
  var protractorMock;
  var promise;

  beforeEach(function () {
    protractorAppender = require('../lib/protractorAppender');
    promise = require('selenium-webdriver').promise;
    consoleMock = jasmine.createSpy('consoleMock');

    controlFlow = jasmine.createSpyObj('controlFlow', ['execute']);
    controlFlow.execute.andCallFake(function (callback) {
      return callback();
    });

    protractorMock = {
      controlFlow: function () {
        return controlFlow;
      }
    };

    global.protractor = {
      promise: promise
    };
  });

  it('should load the appender', function () {
    expect(protractorAppender).toBeDefined();
  });

  describe('configure', function () {
    it('should configure the appender using consoleAppender', function () {
      var appender = protractorAppender.configure({});
      expect(appender).toBeDefined();
    });
  });

  describe('appender', function () {
    var appender, event;

    beforeEach(function () {
      appender = protractorAppender.appender(consoleMock);
      event = {
        data: ['Hello']
      };
    })

    it('should default if protractor is not loaded', function () {
      appender(event);
      expect(consoleMock).toHaveBeenCalledWith(event);
      expect(controlFlow.execute).not.toHaveBeenCalled();
    });

    it('should use protractor\'s control flow', function (done) {
      global.browser = protractorMock;
      appender(event).then(function () {
        expect(consoleMock).toHaveBeenCalledWith(event);
        expect(controlFlow.execute).toHaveBeenCalled();
        done();
      });
    });

    it('should handle promises in the log event', function (done) {
      global.browser = protractorMock;
      deferred = promise.defer();
      event.data.push(deferred.promise);

      appender(event).then(function () {
        expect(consoleMock).toHaveBeenCalledWith({
          data: ['Hello', 'World'],
          startTime: jasmine.any(Date)
        });
        done();
      });

      setTimeout(function () {
        expect(consoleMock).not.toHaveBeenCalled();
        deferred.fulfill('World');
      }, 50);
    });
  });
});
