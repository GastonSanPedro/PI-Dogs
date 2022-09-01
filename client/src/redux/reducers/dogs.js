import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  GET_DOGS_BY_NAME,
  CREATE_DOG,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_FROM,
  CLEAR_ALL_FILTERS
} from "../actions/actionTypes";

const initialState = {
  allDogs:[],
  dogs: [],
  dogsFilter: [],
  dogDetail: {},
};

export default function dogs(state = initialState, action) {
  switch (action.type) {
    case CREATE_DOG:
      return {
        ...state,
      };
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
        dogsFilter:[],
      };
    case GET_DOG_BY_ID:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        dogs:[...action.payload],
      };
    case ORDER_BY_WEIGHT:
      return {
        ...state,
        dogs: [...action.payload],
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        dogsFilter: action.payload,
      };
      case FILTER_BY_FROM:
        return {
          ...state,
          dogsFilter: action.payload,
        };
      case CLEAR_ALL_FILTERS:
        return{
          ...state,
          dogs: action.payload,
          dogsFilter: [],
          dogDetail: {}
        }
    default:
      return { ...state };
  }
}

