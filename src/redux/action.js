import { LOGGED_IN_USER, LOGOUT, SERVICE_DATA,GET_CART } from "./actionTypes";

export const login = (payload) => ({
  type: LOGGED_IN_USER,
  payload,
});
export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});
export const addServiceData = (payload) => ({
  type: SERVICE_DATA,
  payload,
});
export const getCart = (payload) => ({
  type: GET_CART,
  payload,
});
