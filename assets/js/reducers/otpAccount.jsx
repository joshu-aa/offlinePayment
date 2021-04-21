import {
  OTP_ACCOUNT_SUCCESS,
  OTP_ACCOUNT_RESET,
  LOGOUT
} from "../actions/types";

const initialState = {
  loading: true,
  isSent: false,
  otp: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OTP_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSent: true,
        otp: payload
      };

    case LOGOUT:
    case OTP_ACCOUNT_RESET:
      return {
        ...state,
        loading: true,
        isSent: false,
        otp: null
      };

    default:
      return state;
  }
}
