import { auth, db, FirebaseTimestamp } from "../../firebase";
import { addTodoAction, changeTodoProgressAction, deleteTodoAction, setUserAction, deleteUserAction, fetchTodosAction, updateTodosAction, resetDataAction } from "./actions"
import firebase from 'firebase/app';

export const addTodo = (todoName, detail, chargedBy, deadline) => {
    return async (dispatch, getState) => {
        if(todoName === '' || detail === '' || chargedBy === '' || deadline === '' ) {
            alert('入力項目に空欄があります。ご確認の上、もう一度入力してください。');
            return false;
        }
        let todos = getState().todos.todos
        const uid = getState().todos.user.uid;

        let num;

        if(todos.length > 0) {
            num = todos.length.toString();
        } else {
            num = '0';
        }

        const timestamp = FirebaseTimestamp.now();
        
        const dateToString = (date) => {
            return date.getFullYear() + '-'
                + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
                + ('00' + date.getDate()).slice(-2)
        
        };

        const startDate = dateToString(timestamp.toDate())

        const addedTodo = {
            num: num,
            todoName,
            detail,
            chargedBy,
            deadline,
            startDate: startDate,
            progress: 0            
        }
        console.log(uid);
        console.log(addedTodo);

        db.collection('users').doc(uid).collection('todos').add(addedTodo)
            .then(doc => {
                const todoId = doc.id;
                const todoToStore = {
                    ...addedTodo,
                    todoId,
                };
                todos.push(todoToStore)
                dispatch(addTodoAction(todos))
            })

    }
}

export const deleteTodo = (todoId) => {
    return async (dispatch, getState) => {
        if(!window.confirm('本当に消してもいいですか')) {
            return false;
        }
        const uid = getState().todos.user.uid;
        console.log(uid)
        console.log(todoId)
        db.collection(`users/${uid}/todos`).doc(todoId).delete()

        // const todos = getState().todos.todos;

        // const newTodos = todos.filter(todo => {
        //     return todo.num !== num;
        // })

        // dispatch(deleteTodoAction(newTodos))

    }
}

export const changeTodoProgress = (todoId, progress, todo) => {
    return async (dispatch, getState) => {
        const todos = getState().todos.todos;
        const uid = getState().todos.user.uid;

        const newTodo = {
            ...todo,
            progress: progress,
        }

        db.collection(`users/${uid}/todos`).doc(todoId).update(newTodo)
    }
}

export const signIn = () => {
    return async (dispatch, getState) => {
        console.log('きてる');
        const google_auth_provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(google_auth_provider);

    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        console.log('きてる');
        auth.signOut();
        dispatch(deleteUserAction({
            uid: null,
            username: '',
            isSignedIn: false,
        }))
    }
}

export const listenAuthState = (history) => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            console.log(user)
            if(user) {
                const uid = user.uid;
                const username = user.displayName;
                const loginUser = {
                    uid: uid,
                    isSignedIn: true,
                    username: username,
                }
                if(history.location.path === '/login') {
                    history.push('/')
                }
                dispatch(setUserAction(loginUser));
            } else {
                history.push('/login')
            }
        })
    }
}

export const fetchTodos = (uid) => {
    return async (dispatch) => {
        await db.collection(`users/${uid}/todos`).orderBy('num', 'asc').get()
            .then(snapshot => {
                let fetchedTodos = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const todo = {
                        ...data,
                        todoId: doc.id,
                    }
                    fetchedTodos.push(todo);
                })
                console.log(fetchedTodos)
                dispatch(fetchTodosAction(fetchedTodos))
            })
    }
}

export const updateTodos = (todos) => {
    return async (dispatch) => {
        dispatch(updateTodosAction(todos))
    }
}

export const resetData = () => {
    return async (dispatch) => {
        dispatch(resetDataAction([]));
    }
}