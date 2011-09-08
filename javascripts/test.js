PerfJS.test = function(test, minTime){
  minTime = minTime || PerfJS.minTime
  var that = test || {};
  that.run = function(loops){
    var testStart, testEnd, i, loopCount = loops || that.loopCount || 1;
    that.setUp();
    testStart = new Date().getTime();
    for (i = 0; i < loopCount; i++){
      that.test();
    }
    testEnd = new Date().getTime();
    that.tearDown();
    that.result = testEnd - testStart;
    return that.result;
  };
  that.tune = function(){
    var multiplier = -1, testPeriod, loopCount;
    do{
      multiplier++;
      loopCount = Math.pow(10, multiplier);
      testPeriod = that.run(loopCount);
    } while (testPeriod < minTime);
    that.loopCount = loopCount;
  };
  return that;
};
