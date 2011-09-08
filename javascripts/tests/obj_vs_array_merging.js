(function(){
  var randomArray = function(range, length){
    var i, rand = Math.random, fl = Math.floor, result = [];
    for (i = length; i--;){
      result.push(fl(rand() * range) + "");
    }  
    return result;
  }, setupArray = function(){
    this.arr1 = randomArray(2500, 3000);
    this.arr2 = randomArray(2500, 3000);
  }, tearDownArray = function(){
    delete this.arr1;
    delete this.arr2;
  };


  PerformanceJS.addTestCase("Object and Array merging (keeping uniqness)", [
  {
    name: "Mergin 2, unsorted arrays with underscore.js' uniq",
    test: function(){
      var arr1 = this.arr1, arr2 = this.arr2;
      arr1[arr1.length] = arr2;
      arr1 = _.flatten(arr1);
      return _.uniq(arr1).length;
    },
    setUp: setupArray,
    tearDown: tearDownArray
  },
  {
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
  }
  ])
})();