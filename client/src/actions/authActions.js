import axios from "axios";
import { returnErrors } from  '../actions/errorActions';


import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
 } from "../actions/types";

export const loadUser = () => (dispatch, getState) => {
  //USER LOADING
  dispatch({ type: USER_LOADING });
  console.log(loadUser);

  

    axios
    .get("/", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      }))

    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //fetch api + headers

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
}
