import {LOGGED_IN_USER,LOGOUT } from "./actionTypes";

let initialState = {
  allData:[],
  userDetails:{}
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGGED_IN_USER:
      return {...state,allData:[...state.allData,payload]};
    case LOGOUT:
      return {...state,allData:payload};
    // case EDIT_TODO:
    //   return {...state,allData:payload};
    // case TOGGLE_STATUS:
    //   return {...state,allData:payload};
    default:
      return state
  }
};


