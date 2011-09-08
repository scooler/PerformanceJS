PerformanceJS.addTestCase("Object and Array merging (keeping uniqness)", [
{
  arr1: [],
  arr2: [],
  name: "Mergin 2, unsorted arrays with underscore.js' uniq",
  test: function(){
    var arr1 = this.arr1, arr2 = this.arr2;
    arr1[arr1.length] = arr2;
    arr1 = _.flatten(arr1);
    _.uniq(arr1);
  },
  setUp: function(){
    var i, 
      rand = Math.random(), fl=Math.floor, 
      arr1 = this.arr1,
      arr2 = this.arr2;
    for (i=3000; i--;){
      arr1.push(fl(rand()*2500)+"")
      arr2.push(fl(rand()*2500)+"")
    }
  },

  tearDown: function(){
    delete i;
  }
}
])