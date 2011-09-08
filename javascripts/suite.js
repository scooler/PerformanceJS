PerfJS.suite = function(name, tests){
  var that = {};
  tests = tests || []
  that.tune = function(){
    var length = tests.length, j;
    for (j = 0; j < length; j++){
      tests[j].tune();
    }
  };

  that.run = function(){
    var j, testResult, length = tests.length, test;
    PerfJS.log("Running test suite " + name);
    for (j = 0; j < length; j++){
      test = tests[j];
      PerfJS.log("Test case run " + test.loopCount + " times");
      test.run();
      PerfJS.log("Test case result: " + test.name + ": " + test.result);
    }
  };

  that.add = function(test){
    if ( typeof test.run !== "function" && typeof test.tune !== "function"){
      test = PerfJS.test(test);
    }
    tests.push(test);
    return that;
  }

  return that;
};