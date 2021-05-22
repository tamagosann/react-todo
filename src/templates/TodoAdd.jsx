import React, { useCallback, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { DateInput, GreyButton, PrimaryButton, TextInput } from "../components/UIKit";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/operations";


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

const TodoAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [todoName,   setTodoName] = useState(''),
        [detail,       setDetail] = useState(''),
        [chargedBy, setChargedBy] = useState(''),
        [deadline,   setDeadline] = useState('');

    const todoNameOnChange = useCallback((e) => {
        setTodoName(e.target.value);
    },[setTodoName])

    const detailOnChange = useCallback((e) => {
        setDetail(e.target.value);
    },[setDetail])

    const chargedByOnChange = useCallback((e) => {
        setChargedBy(e.target.value);
    },[setChargedBy])

    const deadlineOnChange = useCallback((e) => {
        setDeadline(e.target.value);
    },[setDeadline]);

    const addTodoClicked = (todoName, detail, chargedBy, deadline) => {
        dispatch(addTodo(todoName, detail, chargedBy, deadline))
        history.push('/')
    }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h2 className={classes.center}>チケット発行</h2>
        <TextInput
          fullWidth={true} label={'チケット名'} multiline={false} required={true}
          rows={1} value={todoName} type={'text'} onChange={todoNameOnChange}
        />
        <TextInput
          fullWidth={true} label={'詳細'} multiline={true} required={true}
          rows={4} value={detail} type={'textarea'} onChange={detailOnChange}
        />
        <TextInput
          fullWidth={true} label={'担当者'} multiline={false} required={true}
          rows={1} value={chargedBy} type={'text'} onChange={chargedByOnChange}
        />
        <DateInput
            fullWidth={true} label={'締め切り'} required={true}
            value={deadline} onChange={deadlineOnChange}
        />
        <div className={classes.center + ' ' + classes.mt20}>
            <PrimaryButton className={classes.mr20} label={'追加'} onClick={() => addTodoClicked(todoName, detail, chargedBy, deadline)}/>
            <Link to={'/'}>
                <GreyButton label={'一覧へ戻る'} />
            </Link>
        </div>
      </Paper>
    </div>
  );
};

export default TodoAdd;
