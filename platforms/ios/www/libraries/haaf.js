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
    //variables
    var distance = 30;
    var time = 200;
    var mouseX;
    var mouseY;

    obj.addEventListener("mousedown", clickCapture);

    function clickCapture(e){
      // console.log(e.stageX, e.stageY);
      var startX = e.stageX;
      var startY = e.stageY;

      document.addEventListener("mousemove", mouseEvent);
      function mouseEvent(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
        // console.log(e.clientX, e.clientY);
      }

      var swipeTimeout = setTimeout(function(){
        var diffX = mouseX - startX;
        var diffY = mouseY - startY;

        document.removeEventListener("mousemove", mouseEvent);
        // console.log(diffX, diffY);

        var swipeX = 0;
        var swipeY = 0;

        if(Math.abs(diffX) > Math.abs(diffY)){
          // detecting swipe along x axis
          if(diffX <- distance){swipeX = -1;}
          if(diffX > distance){swipeX = 1;}
        }else{
          // detecting swipe along y axis
          if (diffY <- distance){swipeY = -1;}
          if(diffY > distance){swipeY = 1;}
        }

        // create custom event called swipe
        // console.log(swipeX, swipeY);
        var e = new Event("swipe");
        e.swipeX = swipeX;
        e.swipeY = swipeY;
        obj.dispatchEvent(e);

        //seems to be storing this information - repeating swipe number if square is then just clicked..
        // clear afterwards? clear on mouseup?
        // startX = startY = mouseX = mouseY = 0;

      }, time);
    //end of clickCapture function
    }


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
