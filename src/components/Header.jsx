import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { GreyButton } from './UIKit';
import { signOut } from '../redux/todos/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUsername } from '../redux/todos/selectors';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  mr20: {
    marginRight: 20,
  }

}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const username = getUsername(selector);
  const todos = getTodos(selector);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Todo List 
          </Typography>
          <div className={classes.grow} />
          { username && (
            <div className={classes.mr20}>ようこそ、{username}様！</div>
          )}
          <div>
            {username && (
              <GreyButton label={'ログアウト'} onClick={() => dispatch(signOut())}/>
            )}
            <IconButton color="inherit">
              <Badge badgeContent={todos.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;