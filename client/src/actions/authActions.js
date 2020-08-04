import axios from "axios";
import { returnErrors } from "../actions/errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCESS,
  REGISTER_FAIL,
  LOGOUT_SUCESS,
  LOGIN_FAIL,
  LOGIN_SUCESS
} from "../actions/types";


export const loadUser = () => (dispatch, getState) => {
  //USER LOADING
  dispatch({ type: USER_LOADING });

  axios
    .get('/auth', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const register = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post('/', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    })
};

export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    })
};


export const logout = () => {
  return {
    type: LOGOUT_SUCESS
  };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
};
