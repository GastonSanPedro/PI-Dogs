import { filterDogsByTemperament, orderDogsByName, orderDogsByWeight, filterDogsByFrom, clearOrder } from "../helpers/dogs";
import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  GET_DOGS_BY_NAME,
  CREATE_DOG,
  GET_ALL_TEMPERAMENTS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_FROM,
  CLEAR_ALL_FILTERS
} from "./actionTypes";
const axios = require("axios");

export const createDog = (dog)=> async (dispatch)=>{
  try {
    console.log(dog)
    await axios.post(`/dogs`, dog)
    dispatch({
      type: CREATE_DOG
    })
  } catch (error) {
    return alert(error)
  }
}

export const getAllDogs = () => async (dispatch) => {
  try {
    const allDogs = await axios.get("/dogs");
    dispatch({ 
      type: GET_ALL_DOGS, 
      payload: allDogs.data 
    });
  } catch (error) {
    return alert(error)
  }
};

export const getDogsByName = (name) => async (dispatch) => {
  try {
    const allDogsByName = await axios.get(`/dogs?name=${name}`);
    dispatch({
      type: GET_DOGS_BY_NAME,
      payload: allDogsByName.data,
    });
  } catch (error) {
    return alert(error)
  }
};

export const getDogById = (id) => async (dispatch) => {
  try {
    const dogById = await axios.get(`/dogs/${id}`);
    dispatch({ 
      type: GET_DOG_BY_ID, 
      payload: dogById.data 
    });
  } catch (error) {
    return alert(error);
  }
};

export const getAllTemperaments = ()=> async (dispatch)=>{
  try {
    const allTemperaments = await axios.get(`/temperaments`)
    dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: allTemperaments.data
    })
  } catch (error) {
    return alert(error)
  }
}

export const filterByTemperament = (temperament)=> async (dispatch,getState)=>{
  try {
    const {dogs} = getState().dogs
    const payload= filterDogsByTemperament(dogs, temperament)
    dispatch({
      type: FILTER_BY_TEMPERAMENT,
      payload
    })
  } catch (error) {
    return alert(error)
  }
}

export const filterByFrom= (from) => async (dispatch, getState)=>{
  try {
    const {dogs, allDogs} = getState().dogs
    const payload= filterDogsByFrom(dogs, allDogs, from)
    dispatch({
      type: FILTER_BY_FROM,
      payload
    })
  } catch (error) {
    return alert(error)
  }
}

export const orderByName = (order)=> async (dispatch, getState)=>{
  try {
    const {dogs} = getState().dogs
    const payload= orderDogsByName(dogs, order)
    dispatch({
      type: ORDER_BY_NAME,
      payload
    })
  } catch (error) {
    return alert(error)
  }
}

export const orderByWeight = (order)=> async (dispatch, getState)=>{
  try {
    const {dogs} = getState().dogs
    const payload= orderDogsByWeight(dogs, order)
    dispatch({
      type: ORDER_BY_WEIGHT,
      payload
    })
  } catch (error) {
    return alert(error)
  }
}

export const clearAllFilters = ()=>async (dispatch,getState)=>{
  const {allDogs} = getState().dogs
  const payload= clearOrder(allDogs)
  try {
    dispatch({
      type: CLEAR_ALL_FILTERS,
      payload
    })
  } catch (error) {
    return alert(error)
  }
}



