import { Button, Dialog, Grid, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "redux/hooks";
import "./LoginPopup.scss";

import { login, signup } from "redux/actions/user";

interface LoginPopupProps {
  open: boolean;
  onClose(): void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupUsername, setSignupUsername] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");

  const clearAll = React.useCallback(() => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupEmail("");
    setSignupUsername("");
    setSignupPassword("");
  }, []);

  const onLogin = React.useCallback(() => {
    dispatch(login(loginEmail, loginPassword));
    clearAll();
    onClose();
  }, [dispatch, loginEmail, loginPassword, clearAll, onClose]);

  const onSignup = React.useCallback(() => {
    dispatch(signup(signupEmail, signupUsername, signupPassword));
    clearAll();
    onClose();
  }, [dispatch, signupEmail, signupUsername, signupPassword, clearAll, onClose]);

  return (
    <Dialog open={open} onClose={onClose} className="login-popup">
      <Grid container direction="column" wrap="nowrap" className="login-container">
        <Grid item container spacing={4} direction="row" wrap="nowrap">
          <Grid item xs={6} container direction="column" className="login-box">
            <Grid item className="login-title">
              Log In
            </Grid>
            <Grid item container spacing={2} direction="column" className="login-form">
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Email"
                  value={loginEmail}
                  onChange={evt => setLoginEmail(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={evt => setLoginPassword(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <Button onClick={onLogin} fullWidth variant="outlined">
                  Log In
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} container direction="column" className="signup-box">
            <Grid item className="signup-title">
              Sign Up
            </Grid>
            <Grid item container spacing={2} direction="column" className="signup-form">
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Email"
                  value={signupEmail}
                  onChange={evt => setSignupEmail(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Username"
                  value={signupUsername}
                  onChange={evt => setSignupUsername(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={signupPassword}
                  onChange={evt => setSignupPassword(evt.target.value)}
                />
              </Grid>
              <Grid item>
                <Button onClick={onSignup} fullWidth variant="outlined">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default React.memo(LoginPopup);
