$(document).on("ready", function(){
  var score = 0;
  var gameover = false;
  var lightOrder = [];
  var divSelection;
  //while (!gameover) {
    lightOrder.push(Math.floor(Math.random()*4));
    for(i=0;i<lightOrder.length;i++){
      console.log(lightOrder[i]);
      divSelection = "#color" + lightOrder[i].toString();
      console.log($(divSelection));
    }
  //}
});
