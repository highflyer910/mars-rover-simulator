import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import roverReducer from '../redux/roverSlice';
import Grid from '../components/Grid';

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      rover: roverReducer
    },
    preloadedState: {
      rover: initialState
    }
  });
};

export default {
  title: 'Components/Grid',
  component: Grid,
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-100">
        <Story />
      </div>
    )
  ]
};

// story to show the grid with the rover in the initial position
export const InitialPosition = () => {
  const store = createMockStore({
    position: { x: 0, y: 0 },
    direction: 'N',
    gridSize: { width: 15, height: 15 },
    obstacles: [],
    trail: [{ x: 0, y: 0 }]
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

// story to show the grid with obstacles
export const WithObstacles = () => {
  const store = createMockStore({
    position: { x: 5, y: 5 },
    direction: 'E',
    gridSize: { width: 15, height: 15 },
    obstacles: [
      { x: 7, y: 5 },
      { x: 3, y: 8 } 
    ],
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

// story to show the rover's forward movement
export const RoverMovedForward = () => {
  const store = createMockStore({
    position: { x: 0, y: 14 }, 
    direction: 'N',
    gridSize: { width: 15, height: 15 },
    obstacles: [],
    trail: [{ x: 0, y: 0 }]
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

// story to show the rover's backward movement
export const RoverMovedBackward = () => {
  const store = createMockStore({
    position: { x: 0, y: 1 },
    direction: 'N',
    gridSize: { width: 15, height: 15 },
    obstacles: [],
    trail: [{ x: 0, y: 0 }]
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

// story to show the rover turning right
export const RoverTurnedRight = () => {
  const store = createMockStore({
    position: { x: 0, y: 0 },
    direction: 'E',
    gridSize: { width: 15, height: 15 },
    obstacles: [],
    trail: [{ x: 0, y: 0 }]
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

// story to show the rover turning left
export const RoverTurnedLeft = () => {
  const store = createMockStore({
    position: { x: 0, y: 0 },
    direction: 'W',
    gridSize: { width: 15, height: 15 },
    obstacles: [],
    trail: [{ x: 0, y: 0 }]
  });

  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};
