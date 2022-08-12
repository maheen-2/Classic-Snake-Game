import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

// Initial positioning of the food:
let food = getRandomFoodPosition()
// How much the snake grows when it eats the food:
const EXPANSION_RATE = 1;

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

// Passing in gameBoard to draw on the screen, particulary, on the gameBoard:
export function draw(gameBoard){
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
    
}

function getRandomFoodPosition() {
    let newFoodPosition
    // Whenever food gets eaten or snake & food is on the sem location, then food gets random food position:
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
     newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
}