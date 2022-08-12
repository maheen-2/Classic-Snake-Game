import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5; // How many sec snake moves / sec or how fast it moves

// Initially, I want to draw the snake in the middle of the screen:
const snakeBody = [{x: 11, y: 11}]; // Array not object
let newSegment = 0; // Snake segment(s) formed after eating food

export function update(){
    addSegments();

    const inputDirection = getInputDirection()
    // We want to loop for every segment except the head one bcuz the head segment will essentially lead them:
for(let i = snakeBody.length - 2; i >= 0; i-- ){
    // i is 2nd last segment
    // By setting snake at the last position, we're shifting our entire snake so that everythin moves forward to where the head of the snake is:
    snakeBody[i + 1] ={ ...snakeBody[i] }; // Spreading it!
}
// Update the head based on where we're removing it:
snakeBody[0].x += inputDirection.x;
snakeBody[0].y += inputDirection.y;
}

// Passing in gameBoard to draw on the screen, particulary, on the gameBoard:
export function draw(gameBoard){
    // In the snakeBody, for each segment i.e. part of snake body we want:
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y; // The grid-row-start CSS property specifies a grid item's start position within the grid row.
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    })
}

// Tells how many new segments will be added /-:
export function expandSnake(EXPANSION_RATE){
    // Expansion rate is how much snake expands
    newSegment += EXPANSION_RATE;
}

// Tells where new segments are added:
 function addSegments() {
    for (let i = 0; i < newSegment; i++) {
      snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
  // if not declared o again, then once the snake eats the food, on all the positions it moves segments will keep on adding (else statement).
    newSegment = 0
  }

// Determines if this new segment position is on our snake:
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPositions(segment, position)
    })
  }

// If 2 positions of the snake body r =, then the above condition will return true:
  function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
  }

// Determines if the head of the snake is touching any of the other body parts:
  export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
  }  
  
// Determines the snake head (used in "game.js" file in checkDeath()):
  export function getSnakeHead() {
    return snakeBody[0]
  }
  

  
 