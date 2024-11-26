import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: { x: 0, y: 0 },
  direction: 'N',
  gridSize: { width: 15, height: 15 },
  obstacles: [],
  error: null,
  commandHistory: [],
};

const directionMap = {
  'N': { left: 'W', right: 'E' },
  'E': { left: 'N', right: 'S' },
  'S': { left: 'E', right: 'W' },
  'W': { left: 'S', right: 'N' }
};

const roverSlice = createSlice({
  name: 'rover',
  initialState,
  reducers: {
    moveRover: (state, action) => {
      const { width, height } = state.gridSize;
      const command = action.payload;
      
      state.error = null;
      
      state.commandHistory.push(command);
      
      if (!['f', 'b', 'l', 'r'].includes(command)) {
        state.error = `Invalid command: ${command}`;
        return;
      }
    
      let newPosition = { ...state.position };
      let newDirection = state.direction;
    
      switch(command) {
        case 'f':
        case 'b': {
          switch(state.direction) {
            case 'N':
              newPosition.y += command === 'f' ? -1 : 1;
              break;
            case 'S':
              newPosition.y += command === 'f' ? 1 : -1;
              break;
            case 'E':
              newPosition.x += command === 'f' ? 1 : -1;
              break;
            case 'W':
              newPosition.x += command === 'f' ? -1 : 1;
              break;
            default:
              state.error = `Unexpected direction: ${state.direction}`;
              return;
          }
    
          // edge wrapping
          newPosition.x = (newPosition.x + width) % width;
          newPosition.y = (newPosition.y + height) % height;
          break;
        }
        case 'l': {
          newDirection = directionMap[state.direction].left;
          break;
        }
        case 'r': {
          newDirection = directionMap[state.direction].right;
          break;
        }
        default: {
          state.error = `Unexpected command: ${command}`;
          return;
        }
      }
    
      if (['f', 'b'].includes(command)) {
        const obstacleAtNewPosition = state.obstacles.some(
          obs => obs.x === newPosition.x && obs.y === newPosition.y
        );
    
        if (obstacleAtNewPosition) {
          state.error = 'Obstacle detected! Movement stopped.';
        } else {
          state.position = newPosition;
        }
      }
    
      state.direction = newDirection;
    },
    setObstacles: (state, action) => {
      state.obstacles = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    
resetRover: (state, action) => {
  const payload = action.payload || {};
  state.position = payload.position || { x: 0, y: 0 };
  state.direction = payload.direction || 'N';
  state.obstacles = [];
  state.error = null;
  state.commandHistory = [];
},
  },
});

export const { 
  moveRover, 
  setObstacles, 
  resetError, 
  resetRover 
} = roverSlice.actions;

export default roverSlice.reducer;