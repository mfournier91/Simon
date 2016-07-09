$(document).on("ready", function(){
  var score = 0;
  var gameover = false;
  var lightOrder = [];
  var highScore = 0;
  var newColor;
  var divColor;
  //while (!gameover) {
    lightOrder.push(Math.floor(Math.random()*4));
    for(i=0;i<lightOrder.length;i++){
      console.log(lightOrder[i]);
      var divSelection = "#color" + lightOrder[i].toString();
      divColor = $(divSelection).css("background");

      if(lightOrder[i] == 0){
        newColor = "#00ff57";
      }
      else if(lightOrder[i] == 1){
        newColor = "#ff000a";
      }
      else if(lightOrder[i] == 2){
        newColor = "#f2ff01";
      }
      else if(lightOrder[i] == 3){
        newColor = "#0164ff";
      }

      console.log(divColor);
      TweenMax.to(divSelection, 0.5, {backgroundColor:newColor, ease: Power0.easeNone});
      TweenMax.from(divSelection, 0.5, {backgroundColor:newColor, ease: Power0.easeNone, delay:0.6});
    }
  //}
});
