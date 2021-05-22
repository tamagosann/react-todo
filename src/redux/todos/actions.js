export const ADD_TODO = "ADD_TODO";

export const addTodoAction = (todos) => {
    console.log(todos)
    return {
        type: ADD_TODO,
        payload: todos,
    }
}

export const DELETE_TODO = "DELETE_TODO";

export const deleteTodoAction = (todos) => {
    return {
        type: DELETE_TODO,
        payload: todos,
    }
}

export const CHANGE_TODO_PROGRESS_ACTION = 'CHANGE_TODO_PROGRESS_ACTION'

export const changeTodoProgressAction = (todos) => {
    return {
        type: CHANGE_TODO_PROGRESS_ACTION,
        payload: todos,
    }
}