(function(){
  var suite = PerfJS.suite("Global variables");
  suite.add({
    name: "One additional global variables",
    test: function(){
      i ++; 
    },
    setUp: function(){
      i = 0;
    },
    tearDown: function(){
      delete i;
    }
  });

  suite.add({
    name: "hundret additional global variables",
    test: function(){
      ff ++; 
    },
    setUp: function(){
      var str = "abcdefghijklmnopqrstuvxyz", i, j;
      for (i = 0; i < 10; i++){
        for (j = 0; j < 10; j++){
          window[str[i]+str[j]] = 42;
        }
      }
    },
    tearDown: function(){
      var str = "abcdefghijklmnopqrstuvxyz", i, j;
      for (i = 0; i < 10; i++){
        for (j = 0; j < 10; j++){
          delete window[str[i]+str[j]];
        }
      }
    }
  });

  suite.add({
    name: "625 additional global variables",
    test: function(){
      ll ++; 
    },
    setUp: function(){
      var str = "abcdefghijklmnopqrstuvxyz", i, j;
      for (i = 0; i < str.length; i++){
        for (j = 0; j < str.length; j++){
          window[str[i]+str[j]] = 42;
        }
      }
    },
    tearDown: function(){
      var str = "abcdefghijklmnopqrstuvxyz", i, j;
      for (i = 0; i < str.length; i++){
        for (j = 0; j < str.length; j++){
          delete window[str[i]+str[j]];
        }
      }
    }
  });
  PerfJS.addSuite(suite);
})();

//64 lines before refector