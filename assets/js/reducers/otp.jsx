import {
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  OTP_RESET,
  LOGOUT
} from "../actions/types";

const initialState = {
  loading: true,
  isVerified: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isVerified: true
      };

    case LOGOUT:
    case VERIFY_FAIL:
    case OTP_RESET:
      return {
        ...state,
        loading: true,
        isVerified: false
      };

    default:
      return state;
  }
}
