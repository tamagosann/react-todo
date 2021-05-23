import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { listenAuthState, signIn } from "../redux/todos/operations";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getIsSignedIn } from "../redux/todos/selectors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);
  console.log(isSignedIn);
  console.log(history);

  useEffect(() => {
    if(!isSignedIn) {
        console.log(isSignedIn)
        dispatch(listenAuthState(history))
        console.log(isSignedIn)
    }
}, [isSignedIn, history])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => dispatch(signIn())}
          >
            ログイン（何も入力しなくて大丈夫です）
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
