$(document).on("ready", function(){
  var score = 0;
  var gameover = false;
  var lightOrder = [];
  var highScore = 0;
  var newColor;
  var divColor;
  var greenButton = $("#color0");
  var redButton = $("#color1");
  var yellowButton = $("#color2");
  var blueButton = $("#color3");
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
      (function() {
        TweenMax.to(divSelection, 0.3, {backgroundColor:newColor, ease: Power0.easeNone});
        TweenMax.from(divSelection, 0.3, {backgroundColor:newColor, ease: Power0.easeNone, delay:.4});
      })();
    }
    var choiceNum = 0;
    var animateGreen = function(){
      TweenMax.to(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone});
      TweenMax.from(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone, delay:.4});
    }
    var animateRed = function(){
      TweenMax.to(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone});
      TweenMax.from(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone, delay:.4});
    }
    var animateYellow = function(){
      TweenMax.to(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone});
      TweenMax.from(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone, delay:.4});
    }
    var animateBlue = function(){
      TweenMax.to(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone});
      TweenMax.from(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone, delay:.4});
    }

    greenButton.on("click", animateGreen);
    redButton.on("click", animateRed);
    yellowButton.on("click", animateYellow);
    blueButton.on("click", animateBlue);
  //}
});
