import React, { useEffect } from 'react';
import { listenAuthState } from './redux/todos/operations';
import { getIsSignedIn } from './redux/todos/selectors';
import { useDispatch, useSelector, } from 'react-redux'
import { useHistory } from 'react-router';

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);
    const history = useHistory();

    useEffect(() => {
        if(!isSignedIn ) {
            console.log(isSignedIn)
            dispatch(listenAuthState(history))
            console.log(isSignedIn)
        }
    }, [isSignedIn])

    if(!isSignedIn) {
        return <></>
    } else {
        return children
    }

}


export default Auth;