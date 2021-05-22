import * as Actions from './actions'
import initialState from '../store/initialState'

export const TodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.ADD_TODO:
            return {
                ...state,
                todos: [...action.payload],
            };
        case Actions.DELETE_TODO:
            return {
                ...state,
                todos: [...action.payload],
            };
        case Actions.CHANGE_TODO_PROGRESS_ACTION:
            return {
                ...state,
                todos: [...action.payload],
            };
        default:
            return state
    }
}