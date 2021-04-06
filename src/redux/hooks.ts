import * as ReactRedux from "react-redux";
import { AppDispatch, AppState } from "./store";

export const useDispatch = () => ReactRedux.useDispatch<AppDispatch>();
export const useSelector: ReactRedux.TypedUseSelectorHook<AppState> = ReactRedux.useSelector;
