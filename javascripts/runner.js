(function(){
  var testSuites = [];


  var processTests = function(){
    var i, length = testSuites.length;
    for (i = 0; i < length; i++){
      testSuites[i].run();
    }
  }
  var tuneTests = function(){
    var i, length = testSuites.length;
    for (i = 0; i < length; i++){
      testSuites[i].tune();
    }
    setTimeout(processTests, 1);
  };

  var runTests = function(){
    setTimeout(tuneTests, 1);
  };



  PerfJS.runTests = runTests;
  PerfJS.addSuite = function(suite){
    testSuites.push(suite);
  };
      
}());

$(function(){
  $("#run_tests").click(function(e){
    e.preventDefault();
    e.stopPropagation();
    PerfJS.runTests();
  })
});

