//get the references to DOM element 

let gapsToFill = $("#gaps");
let updateStatement = $("#para");
let guessLeft = $("#guessesleft");
let alreadyGuessed = $("#alreadyguessed");
let wins = $("#wins");
let losses = $("#losses");
let finalmsg = $("#finalmsg");
let totalguesses = $("#totalguesses");
let scorepoint = $("#scorepoint");
let continuegame = $("#btn_reset");
var audio = new Audio("assets/winsound.mp3");

var wordGame ={
    wordList_space : ["antimatter", "asteroid", "celestial", "Ceres", "cluster", "comet", "constellation", "galaxy", "meteor", "nebula", "supernova"],
    gameStarted :false,
    ramdamWord : "",
    score_wins : 0,
    score_losses : 0,
    n_guess : 0,
    lettersGuessedArr :[],
    placeholderArr : [],
    noOfTotalGuess : 0,
    remainLetter : 0,
    score_points : 0,
    firstClicked : false,
    
    
    newGame: function() {
       this.noOfTotalGuess = 0;
       this.lettersGuesses = [];
       this.placeholderArr = [];
       this.gameStarted = true;
       this.ramdamWord =  this.wordList_space[Math.floor(Math.random() *  this.wordList_space.length)];
       this.n_guess = 7;
       this.remainLetter = this.ramdamWord.length;
        for (let i = 0; i < this.ramdamWord.length; i++) {
            this.placeholderArr.push("_")
        }
        gapsToFill.text( this.placeholderArr.join(" "));
        updateStatement.text("( Hint: " + this.remainLetter + " letter word )");
        guessLeft.text(this.n_guess);
        if ( this.lettersGuessedArr.length > 0) {
            this.lettersGuessedArr.splice(0);
        }
        alreadyGuessed.text(this.lettersGuessedArr);
        totalguesses.text(this.noOfTotalGuess);
        // finalmsg.text("Game Started.");
    },

    letterGuessed :function(letter) {
        if ( this.gameStarted &&  this.lettersGuessedArr.indexOf(letter) === -1 ) {
           
            for (let i = 0; i <  this.ramdamWord.length; i++) {
                if ( this.ramdamWord[i].toLowerCase() === letter.toLowerCase()) {
                    this.placeholderArr[i] = this.ramdamWord[i];
                    this.remainLetter--;
                    updateStatement.text("( Hint: " +  this.remainLetter + " letter/s to go )");
                }
            }
            gapsToFill.text(this.placeholderArr.join(" ").toUpperCase());
            this.updateLeftPanelResult(letter);
        }
        else {
            alert("you have tried this letter . Please try with a new letter.");
        }
    },
    win:function(word) {
        var result = word.fontsize(5).fontcolor("red");
        
        finalmsg.html("The word is " + result + " ." + " You WON!. New Game Started.");
        this.score_wins = this.score_wins + 1;
        this.score_points = this.score_points + word.length + this.n_guess;
        scorepoint.text(this.score_points);
        wins.text(this.score_wins);
        audio.play();
        this.gameStarted = false;
        this.ramdamWord = this.wordList_space[Math.floor(Math.random() * this.wordList_space.length)];
        this.newGame();
    },
    
    loss:function(word) {
        var result = word.fontcolor("red");
        finalmsg.html("The word is " + result + " ." + " You LOST! New Game Started.");
        this.score_losses = this.score_losses + 1;
        losses.text(this.score_losses);
        this.ramdamWord = this.wordList_space[Math.floor(Math.random() * this.wordList_space.length)];
        this.newGame();
    },
    updateLeftPanelResult:function(letter) {

        if ( this.lettersGuessedArr.indexOf(letter) === -1) {
            this.lettersGuessedArr.push(letter);
            alreadyGuessed.text(this.lettersGuessedArr.join(" ").toUpperCase());
        }
        this.noOfTotalGuess++;
        totalguesses.text(this.noOfTotalGuess);
    
        if ( this.ramdamWord.toLowerCase().indexOf(letter.toLowerCase()) == -1) {
            this.n_guess--;
            guessLeft.text(this.n_guess);
        }
        this.firstClicked =false;
    
        if ( this.n_guess === 0) {
            this.gameStarted = false;
        }
        if ( this.remainLetter == 0) {
            updateStatement.text("Well Done!!");
        }
        if ( this.placeholderArr.join("").toLowerCase() ==  this.ramdamWord.toLowerCase()) {
            this.gameStarted = false;
            this.win(this.ramdamWord);
        }
        if ( this.n_guess == 0 &&  this.placeholderArr.join("").toLowerCase() !=  this.ramdamWord.toLowerCase()) {
            updateStatement.text("Better luck next time!");
            this.gameStarted = false;
            this.loss(this.ramdamWord);
        }
    },
};


document.onkeyup = function (e) {
    console.log(e.key);
    wordGame.firstClicked=false ;
    if(wordGame.gameStarted == false){
        wordGame.newGame();
        finalmsg.text("Game Started.");
        wordGame.firstClicked =true;
    }
    if (e.keyCode >= 65 && e.keyCode <= 90 && wordGame.firstClicked==false ) {
        wordGame.letterGuessed(e.key);
    }
};

$("#btn_reset").on("click", function () {
    gameStarted = false;
    // newGame();
    wins.text(0);
    losses.text(0);
    scorepoint.text(0);
    totalguesses.text(0);
    wordGame.lettersGuessedArr.splice(0);
    alreadyGuessed.text(wordGame.lettersGuessedArr);
    guessLeft.text(0);
    updateStatement.text("( Hint: No. of letters in the word. )");

});