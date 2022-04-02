import {LOGGED_IN_USER,LOGOUT, SERVICE_DATA } from "./actionTypes";

let initialState = {
  serviceData:[],
  userDetails:{}
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGGED_IN_USER:
      return {...state,userDetails:payload};
    case LOGOUT:
      return {...state,userDetails:payload};
    case SERVICE_DATA:
      return {...state,serviceData:payload};
    // case TOGGLE_STATUS:
    //   return {...state,allData:payload};
    default:
      return state
  }
};


