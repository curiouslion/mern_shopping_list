import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import { returnErrors } from "./errorActions";

// Check token & load USER
export const loadUser = () => (dispatch, getState) => {
  // here parameter getState is use for accesing the state from store
  // User Loading
  dispatch({ type: USER_LOADING }); // isLoading: true

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED, // isLoading: false, isAuthenticated: true
        payload: res.data // user object and token
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      //(returnErrors(msg, status, id=null)

      dispatch({
        type: AUTH_ERROR // isAuthenticated: false, isLoading: false
      });
    });
};

// Regiter User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // getState used to access state from store, here it is just a parameter.
  // tokenConfig will use in action function. which has two parameters (dispatch, getState)
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
      // "x-auth-token" : token value
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token; // add in  config object if passed the condition
  }

  return config;
};
