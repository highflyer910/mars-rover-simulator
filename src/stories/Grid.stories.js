import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Grid from '../components/Grid';
import roverReducer from '../redux/roverSlice';


const mockStore = (initialState) =>
  configureStore({
    reducer: {
      rover: roverReducer,
    },
    preloadedState: initialState,
  });

export default {
  title: 'Components/Grid',
  component: Grid,
};

const Template = (args) => (
  <Provider store={mockStore(args.initialState)}>
    <Grid />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  initialState: {
    rover: {
      gridSize: { width: 5, height: 5 },
      position: { x: 2, y: 2 },
      direction: 'N',
      obstacles: [{ x: 1, y: 1 }, { x: 3, y: 3 }],
      trail: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    },
  },
};

export const LargeGrid = Template.bind({});
LargeGrid.args = {
  initialState: {
    rover: {
      gridSize: { width: 10, height: 10 },
      position: { x: 5, y: 5 },
      direction: 'E',
      obstacles: [{ x: 2, y: 3 }, { x: 7, y: 8 }],
      trail: [{ x: 4, y: 5 }, { x: 6, y: 5 }],
    },
  },
};
