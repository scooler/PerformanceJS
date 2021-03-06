PerfJS.suite = function(name, tests){
  var that = {};
  tests = tests || [];

  var tuneCallback = function(i){
    if(tests[i]) {
      tests[i].tune();
      return true;
    }
  }

  that.tune = function(){
    PerfJS.async(tuneCallback);
  };

  var runCallback = function(i){
    var test;
    if (tests[i]){
      test = tests[i];
      PerfJS.log("Test case run " + test.loopCount + " times");
      test.run();
      PerfJS.log("Test case average result: " + test.name + ": " + test.result/test.loopCount+"ms");
      return true;
    }
  }

  that.run = function(){
    PerfJS.log("Running test suite " + name);
    PerfJS.async(runCallback);
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
