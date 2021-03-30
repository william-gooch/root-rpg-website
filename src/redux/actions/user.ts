import user from "api/user";
import { User } from "model/user";
import { Dispatch } from "redux";

export const login = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {
  await user.login(email, password);
  dispatch(getUser() as any);
};

export const signup = (email: string, username: string, password: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  await user.signup(email, username, password);
  dispatch(getUser() as any);
};

export const getUser = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    const loggedInUser = await user.me();
    dispatch(loggedIn(loggedInUser));
  } catch (e) {
    dispatch(loggedOut());
  }
};

const LOGGED_IN = "LOGGED_IN";
const loggedIn = (user: User) => ({
  type: LOGGED_IN,
  user,
});

export const logout = () => async (dispatch: Dispatch): Promise<void> => {
  await user.logout();
  dispatch(loggedOut());
};

const LOGGED_OUT = "LOGGED_OUT";
const loggedOut = () => ({
  type: LOGGED_OUT,
});

export const types = { LOGGED_IN, LOGGED_OUT };
