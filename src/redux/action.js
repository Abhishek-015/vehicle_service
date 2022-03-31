import {LOGGED_IN_USER,LOGOUT} from "./actionTypes"

export const login = (payload) => ({
    type:LOGGED_IN_USER,
    payload
})
export const logout = (payload) => ({
    type:LOGOUT,
    payload
})
