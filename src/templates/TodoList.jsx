import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import TodoListTable from '../components/TodoListTable';
import { PrimaryButton } from '../components/UIKit';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    buttonSpace: {
        marginTop: 30,
        textAlign: 'center',
    }
})

const TodoList = () => {
    const history = useHistory();
    const classes = useStyles();
    const LinkToTodoAdd = path => history.push(path);
    

    return (
        <>
            <TodoListTable />
            <div className={classes.buttonSpace}>
                <PrimaryButton label={'Todoを追加'} onClick={() => LinkToTodoAdd('/add')}/>
            </div>
        </>
    )
}

export default TodoList;