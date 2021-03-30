import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getUser } from "./actions/user";

import user from "./reducers/user";

const reducer = combineReducers({ user });
const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(getUser() as any);

export default store;
