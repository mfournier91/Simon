$(document).on("ready", function(){
  var score = 0;
  // nice work using local storage!
  var highScore = localStorage.getItem("highScore");
  var lightOrder = []; //Array that stores random numbers representing the colors the user needs to remember
  var newColor;  //The color that is involved in the animation
  var oldColor;
  var greenButton = $("#color0");
  var redButton = $("#color1");
  var yellowButton = $("#color2");
  var blueButton = $("#color3");
  var answers = [];
  var choiceNum = 0;

// try and stay away from from variables like n, time or time_multiplier might be better here
  function animate(animationObjectNum, n){
    setTimeout( function(){
      var animationObject = "#color" + animationObjectNum.toString();
      var audio;
      // this is also a duplication of functionality from all your animation methods
      if(animationObjectNum == 0){
        newColor = "#00ff57";
        oldColor = "#00a157";
        audio = new Audio("audio/SimonFile0.mp3");
      }
      else if(animationObjectNum == 1){
        newColor = "#ff000a";
        oldColor = "#a8000a";
        audio = new Audio("audio/SimonFile1.mp3");
      }
      else if(animationObjectNum == 2){
        newColor = "#f2ff01";
        oldColor = "#f2b001";
        audio = new Audio("audio/SimonFile2.mp3");
      }
      else if(animationObjectNum == 3){
        newColor = "#0164ff";
        oldColor = "#01649f";
        audio = new Audio("audio/SimonFile3.mp3");
      }
      TweenMax.to(animationObject, 0.3, {backgroundColor:newColor, ease: Power0.easeNone});
      audio.play();
      TweenMax.to(animationObject, 0.3, {backgroundColor:oldColor, ease: Power0.easeNone, delay:.4});
    }, (1400+n*500));
  }

  function animateRand(){
    lightOrder.push(Math.floor(Math.random()*4));
    for(i=0;i<lightOrder.length;i++){
      console.log("Random Number : " + lightOrder[i], " Array index : "+i);
      animate(lightOrder[i], i);

    }
  }
  function nextRound(){
    if ($(".gamebutton").css("display")== "none"){ //Checks if playing again after losing
      score = 0;
      lightOrder = [];
      TweenMax.to(".gamebutton", 1, {display:"block", opacity:1, scale:1, ease:Bounce.easeOut});
      // it would be really sick if we had one event listener and one animation function
      greenButton.on("click", animateGreen);
      redButton.on("click", animateRed);
      yellowButton.on("click", animateYellow);
      blueButton.on("click", animateBlue);
    }
    choiceNum = 0;
    answers = []; //An array to contain boolean values. True if correct color is clicked.
    animateRand();
  }
  function gameOver(){
    TweenMax.to(".gamebutton", 1, {opacity:0,scale: 0, display:"none", ease:Bounce.easeOut});
    greenButton.off("click", animateGreen);
    redButton.off("click", animateRed);
    yellowButton.off("click", animateYellow);
    blueButton.off("click", animateBlue);
    var message = "";
    if (highScore < score && score != 0){
      highScore = score;
      localStorage.setItem("highScore", highScore);
      message = "YOU BEAT YOUR HIGH SCORE!"
      var song = new Audio("audio/weAreTheChampions.mp3");
      song.play();
    }
    setTimeout(function() {
    // :+1:
    alert("You finished " + score + " rounds. Your High Score is " + highScore + " rounds. " + message);
    var playAgain = confirm("Would you like to play again?")
    console.log(playAgain);
    if (playAgain == true){
      console.log($(".gamebutton").css("display"));
      //reset score, lightOrder, Bring gamebuttons back to visible.
      nextRound();
    }
  }, 1100);

  }
  function passOrFail(){
    // make sure to leave out any console logs for production code
    //console.log("PASSORFAIL");
    //console.log(choiceNum);
    if (answers[choiceNum - 1] == true){
      if (choiceNum == lightOrder.length){

        setTimeout(nextRound, 1500);
      }
    }
    else if (answers[choiceNum - 1] == false) {
      gameOver();
    }
  }

  TweenMax.staggerFrom(".splitText", .8, {opacity:0, rotation:-180, y:-100, ease:Back.easeOut}, .08)
  nextRound();
  // leave out commented code for production
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

// this seems... a bit wet. How can we take these next 4 function calls and make it 1 instead.
  //animation functions call evaluateChoice function
  var animateGreen = function(){
    var audio = new Audio("audio/SimonFile0.mp3");
    TweenMax.to(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone});
    audio.play();
    TweenMax.from(greenButton, 0.3, {backgroundColor:"#00ff57", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(0));
    passOrFail();

  }
  var animateRed = function(){
    var audio = new Audio("audio/SimonFile1.mp3");
    TweenMax.to(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone});
    audio.play()
    TweenMax.from(redButton, 0.3, {backgroundColor:"#ff000a", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(1));
    passOrFail();
  }
  var animateYellow = function(){
    var audio = new Audio("audio/SimonFile2.mp3");
    TweenMax.to(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone});
    audio.play();
    TweenMax.from(yellowButton, 0.3, {backgroundColor:"#f2ff01", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(2));
    passOrFail();
  }
  var animateBlue = function(){
    var audio = new Audio("audio/SimonFile3.mp3");
    TweenMax.to(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone});
    audio.play()
    TweenMax.from(blueButton, 0.3, {backgroundColor:"#0164ff", ease: Power0.easeNone, delay:.4});
    answers.push(evaluateChoice(3));
    passOrFail();
  }

  //event listeners call animation functions
  greenButton.on("click", animateGreen);
  redButton.on("click", animateRed);
  yellowButton.on("click", animateYellow);
  blueButton.on("click", animateBlue);

  //}
});
