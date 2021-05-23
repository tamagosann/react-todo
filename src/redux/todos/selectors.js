import { createSelector } from 'reselect';

const todosSelector = (state) => state.todos;

export const getTodos = createSelector(
    [todosSelector],
    state => state.todos
)

export const getIsSignedIn = createSelector(
    [todosSelector],
    state => state.user.isSignedIn
)

export const getUsername = createSelector(
    [todosSelector],
    state => state.user.username
)

export const getUid = createSelector(
    [todosSelector],
    state => state.user.uid
)