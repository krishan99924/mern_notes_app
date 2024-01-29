import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_FAILED,
  SIGN_UP_REQUEST_SUCCESS,
} from "../constant/constant";

export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/user/loginuser",
      { email, password },
      config
    );
    console.log("data", data);
    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const signupAction =
  (name, phone, email, password) => async (dispatch) => {
    try {
      dispatch({ type: SIGN_UP_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("getiing userSignUP values", name, phone, email, password);
      const { data } = await axios.post(
        "http://localhost:5000/user/createuser",
        {
          name,
          email,
          phone,
          password,
        },
        config
      );
      console.log("data", data);
      dispatch({ type: SIGN_UP_REQUEST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SIGN_UP_REQUEST_FAILED,
        payload: error.response.data.message,
      });
    }
  };
export const Logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("userInfo");
};
