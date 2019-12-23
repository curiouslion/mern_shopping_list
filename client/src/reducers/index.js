import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import erroReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  error: erroReducer,
  auth: authReducer
});
