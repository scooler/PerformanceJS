PerfJS.log = (function(){
  var queue = [], loggerInterval = 100;
  var resultsDiv = (function(){
    var cache;
    return function(){
      return cache || (cache = $("#test_results"));
    }
  })();

  function showLogs(){
    while (queue.length){
      resultsDiv().append("<div>"+queue.shift()+"</div>");
    }
    setTimeout(showLogs, loggerInterval);
  }
  setTimeout(showLogs, loggerInterval);

  return function(message){
    queue.push(message);
  };
})()