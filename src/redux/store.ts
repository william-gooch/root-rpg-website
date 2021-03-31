import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getUser } from "./actions/user";

import user from "./reducers/user";
import campaign from "./reducers/campaign";

const reducer = combineReducers({ user, campaign });
const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(getUser() as any);

export default store;
