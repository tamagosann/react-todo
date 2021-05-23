import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/todos/selectors";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteTodo } from "../redux/todos/operations";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  noTodo: {
      height: 80,
      textAlign: 'center',
  },
  fight: {
    fontWeight: 'bold',
    fontSize: '20px',
    position: 'relative',
  },
  mr20: {
    marginRight: 20,
  },
  fiGit: {
    color: 'red'
  },

});

const TodoListTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const selector = useSelector((state) => state);
  const todos = getTodos(selector);
  console.log(todos);

  const LinkToEachTodo = useCallback(
    (path) => {
      console.log("/detail/" + path);
      history.push("/detail/" + path);
    },
    [history]
  );

  const deleteTodoOnClicked = (event, todoId) => {
    console.log(todoId)
    event.stopPropagation();
    dispatch(deleteTodo(todoId));
  };

  const message = {
    fight: 'いい感じ！',
    last: 'もう少し！',
    complete: '完了！',
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Todo</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">担当者</TableCell>
            <TableCell align="right">進捗度</TableCell>
            <TableCell align="right">消去</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">todoが全て終了しました。</TableCell>
            </TableRow>
          )}
          {todos.length > 0 && (todos.map((todo) => (
              <TableRow
                key={todo.todoId}
                onClick={() => {
                  LinkToEachTodo(todo.num.toString());
                }}
              >
                <TableCell component="th" scope="row">
                  {todo.todoName}
                </TableCell>
                <TableCell align="right">{todo.num}</TableCell>
                <TableCell align="right">{todo.chargedBy}</TableCell>
                <TableCell align="right">
                  <div className={classes.fight}>
                    <span className={classes.mr20}>
                      {todo.progress >= 40 && todo.progress <= 60 && message.fight }
                      {todo.progress >= 70 && todo.progress <= 90 && message.last }
                      {todo.progress === 100 && message.complete }
                    </span>
                  {todo.progress + ' ' + '%'}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    onClick={(event) => deleteTodoOnClicked(event, todo.todoId)}
                  />
                </TableCell>
              </TableRow>
            )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoListTable;
