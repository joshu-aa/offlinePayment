import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import api from "../components/service/api";

// Load User
export const loadUser = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  console.log(token);
  return api.accounts.userLoad(token).then(
    (res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      return true;
    },
    (error) => {
      dispatch({
        type: AUTH_ERROR,
      });
      return false;
    }
  );
};

//register user
export const register = ({
  firstName,
  lastName,
  contactNumber,
  email,
  companyName,
  password,
}) => async (dispatch) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    contactNumber,
    email,
    companyName,
    password,
  });
  return api.accounts.userRegister(body).then(
    (res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    },
    (error) => {
      if (error.response.status >= 400 && error.response.status < 500) {
        dispatch(setAlert(error.response.data.error, "danger"));
      } else if (error.response.status === 500) {
        dispatch(setAlert("Server Error", "danger"));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
      return false;
    }
  );
};

//login user
export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({ username, password });
  console.log(body);
  return api.accounts.userLogin(body).then(
    (res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    },
    (error) => {
      if (error.response.status >= 400 && error.response.status < 500) {
        dispatch(setAlert(error.response.data.error, "danger"));
      } else if (error.response.status === 500) {
        dispatch(setAlert("Server Error", "danger"));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      return false;
    }
  );
};

//Logout / Clear
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
