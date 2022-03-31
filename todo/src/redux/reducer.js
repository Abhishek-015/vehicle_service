import { ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_STATUS } from "./actionTypes";

let initialState = {
  allData:[]
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return {...state,allData:[...state.allData,payload]};
    case DELETE_TODO:
      return {...state,allData:payload};
    case EDIT_TODO:
      return {...state,allData:payload};
    case TOGGLE_STATUS:
      return {...state,allData:payload};
    default:
      return state
  }
};


