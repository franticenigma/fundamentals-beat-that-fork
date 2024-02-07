// === REQUIREMENTS //
// there are 2 players and players take turns
// when a player clicks submit, the game rolls 2 dice and shows the dice roll, for example 3 and 6
// the player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. next player would complete all the steps
// after both players have rolled and chosen dice order, the player with the higher combined number wins

// == problem breakdown and planning === //
// ver. 1 rolls 2 dice and turns the output for 1 payer. then player chooses the dice order and get the correct return output. final chosen value will reflect in the outpux box
// ver. 2 refactor the code to work with 2 players
//      - global variables fort currentPlayer; and an array to store the score of all players allPlayerScore
//      - refactor outputMessages to interact with each player, 1 and 2
//      - write logic for player 1 to go first then player 2, and finally point towards comparing score
//ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page

//declare global variable; all caps to remind that these will never change
//GLOBAL VARIABLES
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
//first step of the game
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

// create an array that will store player values

// helper function = rollDice
var rollDice = function () {
  console.log(`Control flow: start of rollDice()`);
  // random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // random integer from 1-6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

// helper function to roll dice for player
var rollDiceForPlayer = function () {
  console.log(`Control flow: start of rollDiceForPlayer()`);
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log(`rollDiceForPlayer changes, playerRolls: `, currentPlayerRolls);
  return `Welcome, Player ${currentPlayer} <br> <br> You rolled: <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]} <br><br> Now, please input either "1" or "2" to choose corresponding dice to be used as the first digit of your final value.</br>`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      `Control flow: input validation, invalid input... NOT 1 AND NOT 2`
    );
    return `Error! Please only input "1" or "" to choose which dice to use as the first digit. <br><br> Your dice rolls are: <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.`;
  }
  // input == 1
  if (playerInput == 1) {
    console.log(`Control flow: input == 1`);
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  // input == 2
  if (playerInput == 2) {
    console.log(`Control flow: input == 2`);
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  // Store playerScore in array
  allPlayersScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is: ${playerScore}`;
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1 score: ${allPlayersScore[0]} <br> Player 2 score: ${allPlayersScore[1]}`;
  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = `${compareMessage} <br><br> Player 1 wins!`;
  }
  // player 2 wins
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = `${compareMessage} <br><br> Player 2 wins!`;
  }
  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = `${compareMessage} <br><br> It's a tie!`;
  }
  return compareMessage;
};

var main = function (input) {
  console.log(`Checking game state on submit click: `, gameState);
  console.log(`Checking currentPlayer on submit click: `, currentPlayer);
  var outputMessage = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log(`Control flow: gameState == GAME_STATE_DICE_ROLL`);
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER`);
    // Caller playerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log(
        `Control flow: end of player 1's turn, now it's player 2's turn`
      );
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${outputMessage} <br> <br> It is now player 2's turn!`;
    }

    if (currentPlayer == 2) {
      console.log(
        `Control flow: end of player 2's turn, next submit click will calculate scores`
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return `${outputMessage} Press submit to calculate scores!`;
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log(`Control flow: gameState == GAME_STATE_COMPARE_SCORES`);

    outputMessage = comparePlayersScores();
    return outputMessage;
  }
};
