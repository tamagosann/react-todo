import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Header from "./components/Header";
import { db } from "./firebase";
import { fetchTodos, resetData, updateTodos } from "./redux/todos/operations";
import { getTodos, getUid } from "./redux/todos/selectors";
import Router from "./Router";

function App() {
  const selector = useSelector((state) => state);
  const uid = getUid(selector);
  const dispatch = useDispatch();
  const history = useHistory();
  let todos = getTodos(selector)

  useEffect(() => {
    if (uid) {
      dispatch(fetchTodos(uid));
      if (history.location.pathname === "/login") {
        history.push("/");
      }
    } else {
      dispatch(resetData());
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      const unsubscribe = db.collection(`users/${uid}/todos`)
        .onSnapshot((snapshots) => {
          snapshots.docChanges().forEach((change) => {
            const data = change.doc.data();
            const todo = {
              ...data,
              todoId: change.doc.id
            }
            const changeType = change.type;
  
            switch (changeType) {
              case "added":
                todos.push(todo);
                break;
              case "modified":
                const index = todos.findIndex((todo) => {
                  return todo.todoId === change.doc.id;
                });
                todos[index] = todo;
                break;
              case "removed":
                todos = todos.filter((todo) => {
                  return todo.todoId !== change.doc.id;
                });
                break;
              default:
                break;
            }
          });
          console.log(todos)
          todos.sort((a,b) => {
            return a.num - b.num
          });
          dispatch(updateTodos(todos));
        });
  
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;
