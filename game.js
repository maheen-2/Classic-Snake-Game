// Setting up a game loop
// which is a function thats going to be repeated over & over again on a set interval that way u can constantly update ur render.
// e.g. as our snake moves we can constantly update our snake position and the food and also do all the game calculations on a set time.

const gameBoard = document.getElementById("game-board");

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0; // Initial / start time = 0
let gameOver = false; // If we make the initial value of gameOver as true than whenever the game is loaded, the confirm box of gameOver will appear which we don't want.


// We're requesting browser a frame to animate our game & main(currentTime) tells us the current time when this function runs:
function main(currentTime) {
   if (gameOver === true) { 
      //The confirm() method displays a dialog box with a message, an OK button, and a Cancel button.
      //The confirm() method returns true if the user clicked "OK", otherwise false,similar to alert.
      if (confirm('You lost. Press ok to restart.')) {
        window.location = '/' // Current location --> gonna refresh our page / restart the game.
      }
      return // If the user don't press ok then will be exited out of the game / the game will be stopped.
    }


    // This function will wait till a frame is rendered then will call main() with the current time that when the frame is goin to render:
   window.requestAnimationFrame(main);
    // Tells delay in rendering the frame over & over again:
   const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // If delay is < 1/2 the snake speed, then the snake doesn't moves:
   if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    // So that we constantly hev a new lastRenderedTime:
   lastRenderTime = currentTime

   // SEQUENCE DO MATTERS 🔔🔔🔔

    // For any game logic, we'll always hev 2 of these logics:
    // The update loop will goin to move the snake to its correct position but not actually draw it.
    // Its goin to update if the snake ate the food / not or gonna mek the snake longer / shorter or determines if we win / lose:
   update()
   // Draw everything on the screen based on the update loop:
   draw()
 }
 

// Starts the loop for the first time:
window.requestAnimationFrame(main);

function update(){
   updateSnake();
   updateFood();
   checkDeath();
}

function draw(){
   // This will remove the previous postions / path of the snake i.e. only shows the current snake position:
   gameBoard.innerHTML = "";
   drawSnake(gameBoard);
   drawFood(gameBoard);
}

function checkDeath() {
   // If snake head pops out of the grid or if there is an intersection btw snake body parts.
   gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
 }