
# WordGuessGame
Guess the word based on the theme . Here theme is Space. So every word related to space. 

Press any key to start the game. 
you can see "Game Started" above the current word panel . 
Hint will display the no. of characters in the word. 
user will be provided with certain no. of guesses.

Start guessing the letters. 
For any guess (correct/wrong) : 
total guess counter will increase by one. 
letter guessed will have all the letter guessed .(this will have all the letters guessed(correct letters and incorrect letters))

letter guessed is correct: 
fill the appropriate blank.

letter guessed is wrong :
"guesses left" counter will reduce by one. 

Same letter guessed more than once:
none of the counter will be affected.  Pop up to notify same letter pressed.



Score: 
wins: # of times user guessed the word correctly. win message displays above the current word panel.
losses: # of times user guessed the word incorrectly. lost message displays above the current word panel.

points: this.score_points + word.length + this.n_guess; 
Players who makes less wrog guesses will score more. 

After the user wins/loses the game will automatically choose another word and make the user play it.

Reset Button
reset button will reset the game anytime. player can start the game by using any key.






















