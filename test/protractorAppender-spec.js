describe('protractorAppender', function () {
  var consoleMock;
  var controlFlow;
  var protractorAppender;
  var protractorMock;

  beforeEach(function () {
    protractorAppender = require('../lib/protractorAppender');
    consoleMock = jasmine.createSpy('consoleMock');

    controlFlow = jasmine.createSpyObj('controlFlow', ['execute']);
    controlFlow.execute.andCallFake(function (callback) {
      callback();
    });

    protractorMock = {
      controlFlow: function () {
        return controlFlow;
      }
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
    var event = {};

    it('should default if protractor is not loaded', function () {
      protractorAppender.appender(consoleMock)(event);
      expect(consoleMock).toHaveBeenCalledWith(event);
      expect(controlFlow.execute).not.toHaveBeenCalled();
    });

    it('should use protractor\'s control flow', function () {
      GLOBAL.browser = protractorMock;
      protractorAppender.appender(consoleMock)(event);
      expect(consoleMock).toHaveBeenCalledWith(event);
      expect(controlFlow.execute).toHaveBeenCalled();
    });
  });
});
