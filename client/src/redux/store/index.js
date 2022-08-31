import {legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import dogs from '../reducers/dogs.js';
import temperaments from '../reducers/temperaments.js'
import thunk from 'redux-thunk';

let allReducers = combineReducers({dogs, temperaments})
const composeEnhancers =(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    allReducers, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;