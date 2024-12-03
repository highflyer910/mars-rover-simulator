import { createSlice } from '@reduxjs/toolkit';

// Initial state of the rover
const initialState = {
  position: { x: 0, y: 0 },
  direction: 'N',
  gridSize: { width: 15, height: 15 }, 
  obstacles: [],
  error: null, 
  commandHistory: [], 
  trail: [{ x: 0, y: 0 }], 
};

// A map to determine the left and right turns for each direction
const directionMap = {
  'N': { left: 'W', right: 'E' },
  'E': { left: 'N', right: 'S' },
  'S': { left: 'E', right: 'W' },
  'W': { left: 'S', right: 'N' }
};

// The rover slice defines the state and reducers to handle rover actions
const roverSlice = createSlice({
  name: 'rover',
  initialState,
  reducers: {
    // Reducer to move the rover based on commands
    moveRover: (state, action) => {
      const { width, height } = state.gridSize; 
      const command = action.payload; 
      
      state.error = null;
      
      state.commandHistory.push(command); // Add the current command to the history

      // Check if the command is valid (f, b, l, r)
      if (!['f', 'b', 'l', 'r'].includes(command)) {
        state.error = `Invalid command: ${command}`;
        return;
      }
    
      let newPosition = { ...state.position };
      let newDirection = state.direction; 
    
      // Handle forward ('f') and backward ('b') movement
      switch(command) {
        case 'f':
        case 'b': {
          // Adjust position based on current direction
          switch(state.direction) {
            case 'N': newPosition.y += command === 'f' ? -1 : 1; break; 
            case 'S': newPosition.y += command === 'f' ? 1 : -1; break; 
            case 'E': newPosition.x += command === 'f' ? 1 : -1; break; 
            case 'W': newPosition.x += command === 'f' ? -1 : 1; break;
            default:
              state.error = `Unexpected direction: ${state.direction}`; 
              return; 
          }
    
          // Wrap the rover around the grid (edge wrapping)
          newPosition.x = (newPosition.x + width) % width; // Wrap horizontally
          newPosition.y = (newPosition.y + height) % height; // Wrap vertically
          break;
        }
        case 'l': {
          // Turn left (rotate clockwise)
          newDirection = directionMap[state.direction].left;
          break;
        }
        case 'r': {
          // Turn right (rotate clockwise)
          newDirection = directionMap[state.direction].right;
          break;
        }
        default: {
          state.error = `Unexpected command: ${command}`; // Error handling for unexpected commands
          return;
        }
      }
    
      // Check for obstacles at the new position
      if (['f', 'b'].includes(command)) {
        const obstacleAtNewPosition = state.obstacles.some(
          obs => obs.x === newPosition.x && obs.y === newPosition.y
        );
    
        if (obstacleAtNewPosition) {
          state.error = 'Obstacle detected! Movement stopped.';
        } else {
          state.position = newPosition;
          
          // Add the new position to the trail
          const isDuplicate = state.trail.some(
            pos => pos.x === newPosition.x && pos.y === newPosition.y // check for duplicate positions
          );
          if (!isDuplicate) {
            state.trail.push({ ...newPosition });
          }
        }
      }
    
      state.direction = newDirection;
    },
    
    // Reducer to set the list of obstacles
    setObstacles: (state, action) => {
      state.obstacles = action.payload; 
    },
    
    // Reset the error state
    resetError: (state) => {
      state.error = null; 
    },
    
    // Reset the rover state to initial state
    resetRover: (state, action) => {
      const payload = action.payload || {};
      state.position = payload.position || { x: 0, y: 0 };
      state.direction = payload.direction || 'N'; 
      state.obstacles = [];
      state.error = null; 
      state.commandHistory = [];
      state.trail = [{ x: state.position.x, y: state.position.y }];
    },
  },
});

export const { 
  moveRover, 
  setObstacles, 
  resetError, 
  resetRover 
} = roverSlice.actions;

// Export the reducer to be used in the store
export default roverSlice.reducer;
