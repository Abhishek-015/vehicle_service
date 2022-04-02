import { LOGGED_IN_USER, LOGOUT, SERVICE_DATA } from "./actionTypes";

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
