import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

function* fetchPlants() {
  try {
      const plantsResponse = yield axios.get('/api/plants');
      yield put({ type: 'SET_PLANTS', payload: plantsResponse.data });
  } catch (error) {
      console.log('error fetching plants', error);
  }
}

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};
const sagaMiddleware = createSagaMiddleware();

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ 
    plantList,
    fetchPlants
   }),
  applyMiddleware(sagaMiddleware, logger),
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export default store;
