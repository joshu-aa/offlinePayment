import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alert";
import api from "../components/service/api";

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
