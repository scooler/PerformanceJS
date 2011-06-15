PerformanceJS = {};
(function(){
  var testSuites = [];
  PerformanceJS.addTestCase = function(suiteName, testCases){
    testSuites.push({
      "name": suiteName,
      "tests": testCases});
  };

  var tuneTest = function(testCase){
    var multiplier = -1, testPeriod, loopCount;
    do{
      multiplier++;
      loopCount = Math.pow(10, multiplier);
      testPeriod = runTest(testCase, loopCount);
    } while (testPeriod < 10);
    return loopCount;
  };

  var tuneTests = function(){
    var i, j;
    for (i = 0; i < testSuites.length; i++){
      for (j=0; j < testSuites[i].tests.length; j++){
        testSuites[i].loopCount = Math.max( tuneTest(testSuites[i].tests[j]), testSuites[i].loopCount || 0);
      }
    }
  };

  runTests = function(){
    tuneTests();
    var i, j, testResult;
    for (i = 0; i < testSuites.length; i++){
      console.log("Running test suite " + testSuites[i].name);
      console.log("Each test case run " + testSuites[i].loopCount + " times");
      for (j=0; j < testSuites[i].tests.length; j++){
        testResult = runTest(testSuites[i].tests[j], testSuites[i].loopCount);
        console.log("Test case " + testSuites[i].tests[j].name + " result: " + testResult);
        testSuites[i].tests[j].result = testResult;
      }
    }
  };

  runTest = function(testCase, loopCount){
    var testStart, testEnd, i;
    testCase.setUp();
    testStart = new Date().getTime();
    for (i = 0; i < loopCount; i++){
      testCase.test();
    }
    testEnd = new Date().getTime();
    testCase.tearDown();
    return testEnd - testStart;
  }

  PerformanceJS.runTests = runTests;
}());

window.onload = PerformanceJS.runTests;