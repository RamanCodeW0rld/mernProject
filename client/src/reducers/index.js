import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys:surveyReducer
});
