describe('protractorAppender', function () {
  var protractorAppender;

  beforeEach(function () {
    protractorAppender = require('../lib/protractorAppender');
  });

  it('should load the appender', function () {
    expect(protractorAppender).toBeDefined();
  });
});
