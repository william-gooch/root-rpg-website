import { User } from "model/user";
import { types } from "redux/actions/user";

export interface UserState {
  user: User | null;
}

const defaultUserState: UserState = {
  user: null,
};

export default (state = defaultUserState, action: any): UserState => {
  switch (action.type) {
    case types.LOGGED_IN:
      return { user: action.user };
    case types.LOGGED_OUT:
      return { user: null };
    default:
      return state;
  }
};
