//get the references to DOM element 

let newGameButton = $("#btn_newgame");
let gapsToFill = $("#gaps");
let updateStatement = $("#para");
let guessLeft = $("#guessesleft");
let alreadyGuessed = $("#alreadyguessed");
let wins = $("#wins");
let losses = $("#losses");
let finalmsg = $("#finalmsg");
let totalguesses = $("#totalguesses");
let scorepoint  = $("#scorepoint");

let wordList = ["antimatter" , "asteroid" ,"celestial", "Ceres", "cluster", "comet", "constellation", "Galaxy", "meteor", "nebula", "supernova"] ;
let gameStarted =false ;
let gameEnd =false ;
let score_wins = 0 ; 
let score_losses = 0 ;
let n_guess =0 ;
let lettersGuessedArr = [];
let placeholderArr = [] ;
let ramdamWord ="";
let noOfTotalGuess = 0;
let remainLetter = 0 ;
let score_points =0;


// let wordList = ["antimatter" , "asteroid" ,"celestial", "Ceres", "cluster", "comet", "constellation", "Galaxy", "meteor", "nebula", "supernova"] ;
// let ramdamWord = wordList[Math.floor(Math.random() * wordList.length)];

function win(word)
{
   
    var result = word.fontsize(5).fontcolor("blue");
    document.getElementById("finalmsg").innerHTML = "The word is "+  result +" ."  +  " You WIN!!!";
  
    score_wins=score_wins+1;
    score_points = score_points + word.length + n_guess;
    scorepoint.text(score_points) ; 
    console.log("score_wins" + score_wins);
    console.log("score_points" + score_points);
    wins.text(score_wins);
    $("#btn_newgame").text("Start A New Game");
    $("#btn_newgame").removeClass("green");
    gameEnd=false;
    gameStarted =false;
}

function loose(word){
    
        var result = word.fontsize(5).fontcolor("blue");
        document.getElementById("finalmsg").innerHTML = "The word is "+  result +" ."  +  " You LOST :(";
        // updateStatement.text("Wrong!. Better luck next time.");
        score_losses = score_losses+ 1;
        losses.text(score_losses);
        $("#btn_newgame").text("Start A New Game");
        $("#btn_newgame").removeClass("green");
        gameEnd=false;
}

function letterGuessed(letter)
{
   
    if( gameStarted && lettersGuessedArr.indexOf(letter)=== -1)
    {
        
        lettersGuessedArr.push(letter);
        
            if(ramdamWord.indexOf(letter) ==-1)
            {
                n_guess--;
                guessLeft.text(n_guess);
            
            }
       
        noOfTotalGuess++ ; 
        totalguesses.text(noOfTotalGuess);
        
        if(n_guess === 0 )
        {
            gameStarted = false;
            gameEnd = true;
        }
       
        for( let i=0; i<ramdamWord.length; i++ )
        {
           
            if(ramdamWord[i].toLowerCase() === letter.toLowerCase())
            {
                remainLetter--;
                placeholderArr[i]= ramdamWord[i];
                updateStatement.text("( Hint: " + remainLetter + " letter/s to go )");
            }
        }
        
        gapsToFill.text(placeholderArr.join(" "));
     
        alreadyGuessed.text( lettersGuessedArr.join(" ") );
       
    }
    if( placeholderArr.length > 0 && placeholderArr.join("").toLowerCase() == ramdamWord.toLowerCase())
    {
           
            gameEnd = true;
            win(ramdamWord);
    }
  else if(gameEnd ) 
    {
        loose(ramdamWord);
    }
    else{
        alert("something");
    }
    
}

function newGame()
{
    gameStarted = true;
    gameEnd = false;
    // score_wins = 0 ;
    // score_losses = 0 ;
    noOfTotalGuess = 0;
    // score_points = 0;
    lettersGuesses = [];
    placeholderArr = [];
   
    ramdamWord = wordList[Math.floor(Math.random() * wordList.length)];
    n_guess = ramdamWord.length;
    remainLetter = ramdamWord.length;
    for( let i=0; i<ramdamWord.length; i++ )
    {
        placeholderArr.push("_")
    }
   
    console.log("ramdamWord" + ramdamWord);
   
    
    gapsToFill.text(placeholderArr.join(" "));
    updateStatement.text("( Hint: " + n_guess + " letter word )");
    console.log(n_guess);
    guessLeft.text(n_guess);
    if(lettersGuessedArr.length > 0)
    {
        lettersGuessedArr.splice(0);
    }
    alreadyGuessed.text(lettersGuessedArr);
    finalmsg.text("LETS PLAY A GAME!!!");
    totalguesses.text(noOfTotalGuess);
}

$("#btn_newgame").on("click", function() {
    
    // $("#empty-div").html("Game Started");
    $("#btn_newgame").text("Game Started");
    $("#btn_newgame").addClass("green");
    newGame();
 });

 document.onkeyup = function(e) {
   
        if(gameStarted)
        {
            console.log(e.key);
            if(e.keyCode >=65 && e.keyCode<=90)
            {
                letterGuessed(e.key);
            }
        }
       
       
        
    
  };

  // Gets Link for Theme Song
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "../assets/spacesound.mp3");

  // Theme Button
  $("#theme-button").on("click", function() {
    audioElement.play();
  });
  $("#pause-button").on("click", function() {
    audioElement.pause();
  });