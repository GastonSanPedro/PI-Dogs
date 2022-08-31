import { filterDogsByTemperament, orderDogsByName, orderDogsByWeight, filterDogsByFrom } from "../helpers/dogs";
import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  GET_DOGS_BY_NAME,
  CREATE_DOG,
  GET_ALL_TEMPERAMENTS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_FROM
} from "./actionTypes";
const axios = require("axios");

export const createDog = (dog)=> async (dispatch)=>{
  try {
    await axios.post(`http://localhost:3001/dogs`, dog)
    dispatch({
      type: CREATE_DOG
    })
  } catch (error) {
    return alert(error)
  }
}

export const getAllDogs = () => async (dispatch) => {
  try {
    await fetch("http://localhost:3001/dogs")
      .then((res) => res.json())
      .then((json) => dispatch({ type: GET_ALL_DOGS, payload: json }));
  } catch (error) {
    return alert(error)
  }
};

export const getDogsByName = (name) => async (dispatch) => {
  try {
    const allDogsByName = await axios.get(
      `http://localhost:3001/dogs?name=${name}`
    );
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
    await fetch(`http://localhost:3001/dogs/${id}`)
      .then((res) => res.json())
      .then((json) => dispatch({ type: GET_DOG_BY_ID, payload: json }));
  } catch (error) {
    return alert(error);
  }
};

export const getAllTemperaments = ()=> async (dispatch)=>{
  try {
    const allTemperaments = await axios.get(`http://localhost:3001/temperaments`)
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
    const {dogs} = getState().dogs
    console.log(dogs)
    const payload= filterDogsByFrom(dogs, from)
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




