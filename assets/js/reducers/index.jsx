import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import otpAccount from "./otpAccount";
import otp from "./otp";

export default combineReducers({
  alert,
  auth,
  otpAccount,
  otp
});
