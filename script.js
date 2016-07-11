$(document).on("ready", function(){
  var score = 0;
  var highScore = 0;
  var gameover = false;
  var lightOrder = []; //Array that stores random numbers representing the colors the user needs to remember
  var newColor;  //The color that is involved in the animation
  var oldColor;
  var divSelection;
  var greenButton = $("#color0");
  var redButton = $("#color1");
  var yellowButton = $("#color2");
  var blueButton = $("#color3");
  var answers = [];
  var choiceNum = 0;
  //while (!gameover) {
  // function timeOutAnime(div){
  //   var start = setTimeout(function(){
  //     TweenMax.to(div, 0.3, {backgroundColor:newColor, ease: Power0.easeNone});
  //     TweenMax.from(div, 0.3, {backgroundColor:newColor, ease: Power0.easeNone, delay:.4});
  //   }, 1200)
  //   start;
  // }

  function start(i) {
    TweenMax.to(divSelection, 0.3, {backgroundColor:newColor, ease: Power0.easeNone});
    console.log("Random number animation start "+i);
    console.log($(divSelection).css("background"));
  //};
  //function stop(i) {

    TweenMax.to(divSelection, 0.3, {backgroundColor:oldColor, ease: Power0.easeNone, delay:.4});
    console.log("Random number animation end "+i);
    console.log($(divSelection).css("background"));
  }

  function animateRand(){
    lightOrder.push(Math.floor(Math.random()*4));
    for(i=0;i<lightOrder.length;i++){
      console.log(lightOrder[i]);
      divSelection = "#color" + lightOrder[i].toString(); //selects the div corresponding to the random number
      //divColor = $(divSelection).css("background");

      if(lightOrder[i] == 0){
        newColor = "#00ff57";
        oldColor = "#00a157";
      }
      else if(lightOrder[i] == 1){
        newColor = "#ff000a";
        oldColor = "#a8000a";
      }
      else if(lightOrder[i] == 2){
        newColor = "#f2ff01";
        oldColor = "#f2b001";
      }
      else if(lightOrder[i] == 3){
        newColor = "#0164ff";
        oldColor = "#01649f";
      }
      //console.log(newColor, oldColor);
      //animation function for divs that uses the RNG value assigned to divSelection to animate the right color
      // function start() {
      //   TweenMax.to(divSelection, 0.3, {backgroundColor:newColor, ease: Power0.easeNone});
      //   console.log("Random number animation start "+i);
      // };
      // function stop() {
      //   TweenMax.to(divSelection, 0.3, {backgroundColor:oldColor, ease: Power0.easeNone, delay:.4});
      //   console.log("Random number animation end "+i);
      // }
      setTimeout(start, 1200, i);
      //setTimeout(stop, 300, i);
      //timeOutAnime(divSelection);
    }
  }
  function nextRound(){
    choiceNum = 0;
    answers = []; //An array to contain boolean values. True if correct color is clicked.
    animateRand();
  }
  function gameOver(){
    greenButton.css("display", "none");
    redButton.css("display", "none");
    yellowButton.css("display", "none");
    blueButton.css("display", "none");
    greenButton.off("click", animateGreen);
    redButton.off("click", animateRed);
    yellowButton.off("click", animateYellow);
    blueButton.off("click", animateBlue);
    alert("You finished " + score + " rounds.");
  }
  function passOrFail(){
    //console.log("PASSORFAIL");
    //console.log(choiceNum);
    if (answers[choiceNum - 1] == true){
      if (choiceNum == lightOrder.length){
        console.log("Do next round");

        setTimeout(nextRound(), 1500);
      }
    }
    else if (answers[choiceNum - 1] == false) {
      console.log("Game Over.");
      gameOver();
    }
  }

  nextRound();
  //var roundOver = false;
  //function for evaluating if user clicked correct div
  var evaluateChoice = function(choice){
    if(lightOrder[choiceNum] == choice){
      if(choiceNum == (lightOrder.length - 1)){
        score++;
        //console.log("Score :" + score);
      }
      choiceNum++;
      //console.log("Choice :" + choiceNum);
      return true;
    }
    else{
      choiceNum++;
      //console.log("Choice :" + choiceNum);
      return false;
    }
  }


  //animation functions call evaluateChoice function
  var animateGreen = function(){
    console.log("Click animation start");
    TweenMax.to(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone});
    console.log("Click animation end");
    TweenMax.from(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(0));
    console.log(answers);
    passOrFail();

  }
  var animateRed = function(){
    console.log("Click animation start");
    TweenMax.to(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone});
    console.log("Click animation end");
    TweenMax.from(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(1));
    console.log(answers);
    passOrFail();
  }
  var animateYellow = function(){
    console.log("Click animation start");
    TweenMax.to(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone});
    console.log("Click animation end");
    TweenMax.from(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(2));
    console.log(answers);
    passOrFail();
  }
  var animateBlue = function(){
    console.log("Click animation start");
    TweenMax.to(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone});
    console.log("Click animation end");
    TweenMax.from(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(3));
    console.log(answers);
    passOrFail();
  }

  //event listeners call animation functions
  greenButton.on("click", animateGreen);
  redButton.on("click", animateRed);
  yellowButton.on("click", animateYellow);
  blueButton.on("click", animateBlue);

  //}
});
