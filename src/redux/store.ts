import { createStore, applyMiddleware, combineReducers, AnyAction } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { getUser } from "./actions/user";

import user from "./reducers/user";
import campaign from "./reducers/campaign";

const reducer = combineReducers({ user, campaign });
export type AppState = ReturnType<typeof reducer>;
export type AppThunk = ThunkAction<void, AppState, unknown, AnyAction>;

const store = createStore(reducer, applyMiddleware(thunk));

export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

store.dispatch(getUser() as any);

export default store;
