import {GET_ALL_TEMPERAMENTS} from "../actions/actionTypes"
const initialState = {
  temperaments: [],
};

export default function temperaments (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEMPERAMENTS: 
      return {
        ...state,
        temperaments: action.payload
      };
    default:
      return {...state};
  }
}