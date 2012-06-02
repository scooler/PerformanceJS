(function(){
  var randomArray = function(range, length){
    var i, rand = Math.random, fl = Math.floor, result = [];
    for (i = length; i--;){
      result.push(fl(rand() * range) + "");
    }  
    return result;
  }, 
    setupArray = function(){
      this.arr1 = randomArray(2500, 3000);
      this.arr2 = randomArray(2500, 3000);
    }, 
    tearDownArray = function(){
      delete this.arr1;
      delete this.arr2;
    }, 
    randomObject = function(range, length){
      var i, rand = Math.random, fl = Math.floor, result = {};
      for (i = length; i--;){
        result[fl(rand() * range) + ""] = undefined;
      }  
      return result;
    };
  define(["javascripts/tests/lib/underscore.js"]);
  var suite = PerfJS.suite("Object and Array merging (keeping uniqness)");

  suite.add({
    name: "Mergin 2, unsorted arrays with underscore.js' uniq",
    test: function(){
      var arr1 = this.arr1, arr2 = this.arr2;
      arr1[arr1.length] = arr2;
      arr1 = _.flatten(arr1);
      return _.uniq(arr1).length;
    },
    setUp: setupArray,
    tearDown: tearDownArray
  });

  suite.add({
    name: "Mergin 2, unsorted arrays with underscore.js' sortBy and uniq-sorted",
    test: function(){
      var arr1 = this.arr1, arr2 = this.arr2;
      arr1[arr1.length] = arr2;
      arr1 = _.flatten(arr1);
      arr1 = _.sortBy(arr1, function(el){ return el });
      return _.uniq(arr1, true).length;
    },
    setUp: setupArray,
    tearDown: tearDownArray
  });
  suite.add({
    name: "Mergin 2 sorted arrays with underscore.js' sortBy and uniq-sorted",
    test: function(){
      var arr1 = this.arr1, arr2 = this.arr2;
      arr1[arr1.length] = arr2;
      arr1 = _.flatten(arr1);
      arr1 = _.sortBy(arr1, function(el){ return el });
      return _.uniq(arr1, true).length;
    },
    setUp: function(){
      setupArray.apply(this);
      this.arr1 = _.sortBy(this.arr1, function(el){ return el })
      this.arr2 = _.sortBy(this.arr2, function(el){ return el })
    },
    tearDown: tearDownArray
  });

  suite.add({
    name: "Mergin 2 objects and counting their properties",
    test: function(){
      var obj1 = this.obj1, obj2 = this.obj2, length = 0;
      _.each(obj2, function(val, key){
        obj1[key]=val;
      });
      _.each(obj1, function(val, key){ length ++ });
      return length;
    },
    setUp: function(){
      this.obj1 = randomObject(2500, 3000);
      this.obj2 = randomObject(2500, 3000);
    },
    tearDown: function(){
      delete this.obj1;
      delete this.obj2;
    }
  });

  PerfJS.addSuite(suite);
})();