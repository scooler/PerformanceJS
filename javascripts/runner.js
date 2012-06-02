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
  };

  var runTests = function(){
    tuneTests();
    processTests();
  };

  PerfJS.cleanTests = function(){
    testSuites = [];
  };


  PerfJS.runTests = runTests;
  PerfJS.addSuite = function(suite){
    testSuites.push(suite);
  };
      
}());

PerfJS.addEvent(window, "load", function(){
  // var el = document.getElementById("run_tests");
  // var els = document.querySelectorAll("a.test");
  var els = document.getElementsByTagName("a");
  // els.forEach(function(el){
  for (var i=0; i< els.length; i++){
    var el = els[i];
    if (el.className !== "test") return;

    PerfJS.addEvent(el, "click", function(e){
      PerfJS.cleanTests();
      e.preventDefault(); 
      require(['javascripts/tests/'+e.target.attributes["data-src"].value], function(){
          PerfJS.runTests();
      });
    });
  }
  // });
});

