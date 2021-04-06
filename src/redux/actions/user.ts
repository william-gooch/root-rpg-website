import user from "api/user";
import { User } from "model/user";
import { Dispatch } from "redux";
import { AppThunk } from "redux/store";

export const login = (email: string, password: string): AppThunk => async (dispatch: Dispatch): Promise<void> => {
  await user.login(email, password);
  dispatch(getUser() as any);
};

export const signup = (email: string, username: string, password: string): AppThunk => async (
  dispatch: Dispatch
): Promise<void> => {
  await user.signup(email, username, password);
  dispatch(getUser() as any);
};

export const getUser = (): AppThunk => async (dispatch: Dispatch): Promise<void> => {
  try {
    const loggedInUser = await user.me();
    dispatch(loggedIn(loggedInUser));
  } catch (e) {
    dispatch(loggedOut());
  }
};

const LOGGED_IN = "LOGGED_IN";
export interface LoggedInAction {
  type: typeof LOGGED_IN;
  user: User;
}
const loggedIn = (user: User): LoggedInAction => ({
  type: LOGGED_IN,
  user,
});

export const logout = (): AppThunk => async (dispatch: Dispatch): Promise<void> => {
  await user.logout();
  dispatch(loggedOut());
};

const LOGGED_OUT = "LOGGED_OUT";
export interface LoggedOutAction {
  type: typeof LOGGED_OUT;
}
const loggedOut = (): LoggedOutAction => ({
  type: LOGGED_OUT,
});

export const types = { LOGGED_IN, LOGGED_OUT };
