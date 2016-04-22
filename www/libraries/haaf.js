  var haaf = function(haaf){
  // console.log("hi from swiping mod");
  haaf.shuffle = function(array) {
    if (array == null) return;
    var i = array.length, j, temp;
    if (i == 0) return array;
    while(--i) {
        j = Math.floor(Math.random()*(i+1));
        temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    return array;
}

  // SWIPING IN CREATEJS
  haaf.cjsSwipe = function(obj){
    if (obj == null) return;
          if (obj.getStage == null) return;
          var stage = obj.getStage();

          var swipeDistance = 2;
          var swipeTime = 200;

          obj.on("mousedown", function(){
              var startX = stage.mouseX;
              var startY = stage.mouseY;
              var swipeTimeout = setTimeout(function() {
                  var newX = stage.mouseX;
                  var newY = stage.mouseY;
                  // console.log(newX - startX);
                  // console.log(newY - startY);
                  var diffX = Math.abs(newX-startX);
                  var diffY = Math.abs(newY-startY);
                  if (diffX < swipeDistance && diffY < swipeDistance) return;
                  var e = new createjs.Event("swipe");
                  if (diffX > diffY) {
                      // console.log("swiping in X");
                      e.swipeX = (newX-startX>1) ? 1 : -1;
                      e.swipeY = 0;
                  } else {
                      // console.log("swiping in Y");
                      e.swipeX = 0
                      e.swipeY = (newY-startY>1) ? 1 : -1;
                  }
                  obj.dispatchEvent(e);
                  // obj.dispatchEvent("swipe");
              }, swipeTime);
              var up = obj.on("pressup", function() {
                  clearTimeout(swipeTimeout);
                  obj.off("pressup", up);
              });
          });

      }

  // SWIPING IN THE DOM
  haaf.swipe = function(obj){
    // console.log(obj);

    // TO SWIPE
    //capture evt position on mousedown
    // compare this position to position on mouseup, mousemove
    // if difference is a certain amount (i.e. xDiff>50px) run a function to swipe/move obj

    var distance = 10;
    var time = 200;
    var mouseX;
    var mouseY;

    obj.addEventListener("mousedown", function(e){
      // console.log(e.clientX, e.clientY);
      var startX = e.clientX;
      var startY = e.clientY;

      document.addEventListener("mousemove", mouseEvent);
      function mouseEvent(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
        // console.log(e.clientX);
      }

      var swipeTimeout = setTimeout(function(){
        var diffX = mouseX - startX;
        var diffY = mouseY - startY;

        document.removeEventListener("mousemove", mouseEvent);
        // console.log(diffX, diffY);
        // console.log("here");

        var swipeX = 0;
        var swipeY = 0;

        if(Math.abs(diffX) > Math.abs(diffY)){
          // detecting swipe along x axis
          if(diffX <- distance){
            swipeX = -1;
          }
          if(diffX > distance){
            swipeX = 1;
          }

        }else{
          // detecting swipe along y axis
          if (diffY <- distance){
            swipeY = -1;
          }
          if(diffY > distance){
            swipeY = 1;
          }
        }

        // create custom event called swipe
        var e = new Event("swipe");
        e.swipeX = swipeX;
        e.swipeY = swipeY;
        obj.dispatchEvent(e);
      }, time);
    });
  //end of dom swipe
  }


  return haaf;
}(haaf||{});
