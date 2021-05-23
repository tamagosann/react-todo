import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import Auth from './Auth';
import { TodoList, TodoAdd, TodoDetail, LogIn } from './templates';


const Router = () => {
    return (
        <Switch>
            <Route exact path={'/login'} component={LogIn} />
            <Auth>
                <Route exact path={'/add'} component={TodoAdd} />
                <Route path={'/detail/:num'} component={TodoDetail} />
                <Route exact path={'/'} component={TodoList} />
                {/* <Route path={"/product/edit(/:id)?"} component={ProductEdit} /> */}
            </Auth>
        </Switch>
    )
}

export default Router;