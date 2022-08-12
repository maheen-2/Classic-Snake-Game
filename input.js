// Here we'll tell what happens if the snake touches the wall:

// By default, we don't want snake to move in any direction:
let inputDirection = {x: 0, y: 0}; // Object not array
let lastInputDirection = {x:0, y: 0};

// Modifying the above input direction:
window.addEventListener("keydown", e => {
    // Whenever we click a key, we can add an event listener to our window for keydown. This is going to get an event.
    switch (e.key) {
        case 'ArrowUp':
          if (lastInputDirection.y !== 0) break // if last direction is up or down then arrowUp doesn't work!
          inputDirection = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (lastInputDirection.y !== 0) break // if last direction is up or down then arrowDown doesn't work!
          inputDirection = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (lastInputDirection.x !== 0) break // if last direction is left or right then arrowLeft doesn't work!
          inputDirection = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (lastInputDirection.x !== 0) break // if last direction is left or right then arrowRight doesn't work!
          inputDirection = { x: 1, y: 0 }
          break
      }
    })

// Call it in "snake.js" update function:
export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}