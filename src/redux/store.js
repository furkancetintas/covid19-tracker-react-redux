import { configureStore } from '@reduxjs/toolkit';
import covidReducer from './reducers/covidReducer';
import regionReducer from './reducers/regionReducer';

const store = configureStore({
  reducer: {
    covid: covidReducer,
    region: regionReducer,
  },
});

export default store;
