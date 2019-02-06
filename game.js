var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern= [];
var level= 0;
var started = 0;
function nextSequence() {
    //get color randomly push to gamePattern[]
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

    //Fade in/out
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // play sound
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
  userClickedPattern = [];
}

$(".btn").on("click", function(event){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(userClickedPattern.length=== level){
    checkAnswer(userClickedPattern.length - 1);
}

});

    //Play Sound Function
function playSound(chosenColorSound){
  var audio = new Audio("sounds/" + chosenColorSound + ".mp3");
  audio.play();
}

    // Pressed Button Animation---
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
 }


// listen for keystroke
  $(document).keydown(function(){
    if(started === 0){
      $("h1").text("Level "+level);
      nextSequence();
      started++;
    }
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    console.log("sucess");
    setTimeout(function(){
      nextSequence();},1000);
    

  }else{
    console.log("wrong");
    var wrong = "wrong";
    playSound(wrong);
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Wrong Answer!! Press any key to restart");
    startOver();
  }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started=0;
    userClickedPattern = [];
}
