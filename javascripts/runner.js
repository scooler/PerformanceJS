(function(){
  var testSuites = [],
    timeMinimum = 100;




  var tuneTest = function(testCase){
    var multiplier = -1, testPeriod, loopCount;
    do{
      multiplier++;
      loopCount = Math.pow(10, multiplier);
      testPeriod = runTest(testCase, loopCount);
    } while (testPeriod < timeMinimum);
    testCase.loopCount = loopCount;
  };

  var tuneTests = function(){
    var i, j;
    for (i = 0; i < testSuites.length; i++){
      for (j=0; j < testSuites[i].tests.length; j++){
        tuneTest(testSuites[i].tests[j]);
      }
    }
  };

  var runTests = function(){
    tuneTests();
    var i, j, testResult;
    for (i = 0; i < testSuites.length; i++){
      PerfJS.log("Running test suite " + testSuites[i].name);
      for (j=0; j < testSuites[i].tests.length; j++){
        PerfJS.log("Test case run " + testSuites[i].tests[j].loopCount + " times");
        testResult = runTest(testSuites[i].tests[j]);
        PerfJS.log("Test case result: " + testSuites[i].tests[j].name + ": " + testResult);
        testSuites[i].tests[j].result = testResult;
      }
    }
  };

  var runTest = function(testCase, loopCount){
    var testStart, testEnd, i, loopCount = loopCount || testCase.loopCount;
    testCase.setUp();
    testStart = new Date().getTime();
    for (i = 0; i < loopCount; i++){
      testCase.test();
    }
    testEnd = new Date().getTime();
    testCase.tearDown();
    return testEnd - testStart;
  }

  PerfJS.runTests = runTests;
  PerfJS.addTestCase = function(suiteName, testCases){
    testSuites.push({
      "name": suiteName,
      "tests": testCases});
  };
}());

$(function(){
  $("#run_tests").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    PerfJS.runTests();
  })
});

