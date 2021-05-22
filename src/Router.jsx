import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { TodoList, TodoAdd, TodoDetail } from './templates';


const Router = () => {
    return (
        <Switch>
            <Route exact path={'/add'} component={TodoAdd} />
            <Route path={'/detail/:num'} component={TodoDetail} />
            <Route exact path={'/'} component={TodoList} />
            {/* <Route path={"/product/edit(/:id)?"} component={ProductEdit} /> */}
        </Switch>
    )
}

export default Router;