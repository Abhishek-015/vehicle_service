import { ADD_TODO,DELETE_TODO,EDIT_TODO,TOGGLE_STATUS} from "./actionTypes"

export const addTodo = (payload) => ({
    type:ADD_TODO,
    payload
})
export const deleteTodo = (payload) => ({
    type:DELETE_TODO,
    payload
})
export const editTodos = (payload) => ({
    type:EDIT_TODO,
    payload
})
export const toggleStatus = (payload) => ({
    type:TOGGLE_STATUS,
    payload
})