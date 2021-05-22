import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GreyButton, PrimaryButton, Selector } from '../components/UIKit';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper } from '@material-ui/core';
import { getTodos } from '../redux/todos/selectors';
import TodoDetailListItem from '../components/TodoDetailListItem';
import { changeTodoProgress } from '../redux/todos/operations';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "block",
      "& > *": {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        padding: theme.spacing(4),
        width: theme.spacing(50),
      },
    },
    mr20: {
      marginRight: 20,
    },
    mt20: {
      marginTop: 20,
    },
    center: {
        textAlign: 'center',
    }
  }));

const TodoDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { num } = useParams();
    const selector = useSelector(state => state);
    const todos = getTodos(selector);

    const index = todos.findIndex(todo => {
        return todo.num === num
    })
    const todo = todos[index];
    const [progress, setProgress] = useState(todo.progress);

    const selectorOnChange = useCallback((event) => {
        setProgress(event.target.value);
    },[setProgress]);

    const changeTodoProgressOnClicked = (num, previousProgress, progress) => {
        dispatch(changeTodoProgress(num, progress));
        alert(`進捗度を、${previousProgress}%から${progress}%へ変更しました。`)
    }

    return (
        <div className={classes.root}>
          <Paper elevation={3}>
            <h2 className={classes.center}>チケット詳細</h2>

            <List>
                <TodoDetailListItem text={todo.todoName} label={'チケット名'}/>
                <TodoDetailListItem text={todo.detail} label={'詳細'}/>
                <TodoDetailListItem text={todo.chargedBy} label={'担当者'}/>
                <TodoDetailListItem text={todo.deadline} label={'締め切り'}/>
                <TodoDetailListItem text={todo.startDate} label={'開始日'}/>
                <TodoDetailListItem text={todo.progress} label={'進捗'}/>
                <Selector progress={progress} label={'進捗変更'} onChange={(event) =>  selectorOnChange(event)}/>
            </List>
            
            <div className={classes.center + ' ' + classes.mt20}>
                <PrimaryButton className={classes.mr20} label={'更新'} onClick={() => changeTodoProgressOnClicked(todo.num, todo.progress, progress)}/>
                <Link to={'/'}>
                    <GreyButton label={'一覧へ戻る'} />
                </Link >
            </div>
          </Paper>
        </div>
      );
};

export default TodoDetail;