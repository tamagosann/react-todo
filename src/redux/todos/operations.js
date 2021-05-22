import { addTodoAction, changeTodoProgressAction, deleteTodoAction } from "./actions"

export const addTodo = (todoName, detail, chargedBy, deadline) => {
    return async (dispatch, getState) => {
        console.log('きたよ')
        if(todoName === '' || detail === '' || chargedBy === '' || deadline === '' ) {
            alert('入力項目に空欄があります。ご確認の上、もう一度入力してください。');
            return false;
        }
        const todos = getState().todos.todos
        console.log(todos)

        let num;

        if(todos.length > 0) {
            num = todos.length.toString();
        } else {
            num = '0';
        }

        const newTodo = {
            num: num,
            todoName,
            detail,
            chargedBy,
            deadline,
            startDate: '4月1日',
            progress: 0,
        }
        todos.push(newTodo);
        dispatch(addTodoAction(todos))
    }
}

export const deleteTodo = (num) => {
    return async (dispatch, getState) => {
        if(!window.confirm('本当に消してもいいですか')) {
            return false;
        }
        const todos = getState().todos.todos;

        const newTodos = todos.filter(todo => {
            return todo.num !== num;
        })

        dispatch(deleteTodoAction(newTodos))

    }
}

export const changeTodoProgress = (num, progress) => {
    return async (dispatch, getState) => {
        const todos = getState().todos.todos;
        const index = todos.findIndex(todo => {
            return todo.num === num
        });

        todos[index].progress = progress;
        dispatch(changeTodoProgressAction(todos))
    }
}