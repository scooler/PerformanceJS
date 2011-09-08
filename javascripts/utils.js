PerfJS.log = (function(){
  var queue = [], loggerInterval = 100;
  var resultsDiv = (function(){
    var cache;
    return function(){
      return cache || (cache = document.getElementById("test_results"));
    }
  })();

  function showLogs(){
    var elem;
    while (queue.length){
      elem = document.createElement("div");
      elem.appendChild( document.createTextNode( queue.shift() ) );
      resultsDiv().appendChild(elem);      
    }
    setTimeout(showLogs, loggerInterval);
  }
  setTimeout(showLogs, loggerInterval);

  return function(message){
    queue.push(message);
  };
})();

PerfJS.async = function(callback, interval){
  var i = 0; 
  interval = interval || 25;
  function runner(){
    if (callback(i)){
      i++;
      setTimeout(runner, interval);
    }
  }
  runner();
};

PerfJS.addEvent = (function(){
  var callbackHandler = function(callback){
    return function(e){
      var event = e || window.event;
      //var target = event.target || event.srcElement; //not needed right now
      return callback(e);
    }
  }

  return function(el, event, callback){
    var realCallback = callbackHandler(callback);
    if (el.addEventListener){
      el.addEventListener(event, realCallback, false);
    } else if (el.attachEvent) {
      el.attachEvent("on"+event, realCallback);
    } else{
      el["on"+event] = realCallback;
    }
  }
})();
