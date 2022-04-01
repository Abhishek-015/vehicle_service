import {LOGGED_IN_USER,LOGOUT } from "./actionTypes";

let initialState = {
  allData:[],
  userDetails:{}
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGGED_IN_USER:
      return {...state,userDetails:payload};
    case LOGOUT:
      return {...state,userDetails:payload};
    // case EDIT_TODO:
    //   return {...state,allData:payload};
    // case TOGGLE_STATUS:
    //   return {...state,allData:payload};
    default:
      return state
  }
};


