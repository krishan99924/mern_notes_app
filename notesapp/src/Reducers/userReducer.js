import { useEffect } from "react";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_FAILED,
  SIGN_UP_REQUEST_SUCCESS,
} from "../constant/constant.js";

const initialState = {
  userInfo: {},
  error: "",
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_REQUEST_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { loading: true };
    case SIGN_UP_REQUEST_SUCCESS:
      return { loading: false, userInfo: { ...action.payload } };
    case SIGN_UP_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
