import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  http,
  getStoreJson,
  setCookie,
  setStoreJson,
  TOKEN,
  USER_LOGIN,
} from '../../utils/config';

const initialState = {
  newUser: {},
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  profile: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.newUser = action.payload;
    },
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { registerAction, loginAction, getProfileAction } =
  userReducer.actions;

export default userReducer.reducer;

export const registerApi = (newUserData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        'https://shop.cyberlearn.vn/api/Users/signup',
        newUserData
      );
      console.log(result);

      if (result?.status === 200) {
        const action = registerAction(result.data.content);
        dispatch(action);
        window.confirm('Successful register!');
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        window.confirm('Email is already existed!');
      }
    }
  };
};

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post(`/api/Users/signin`, userLogin);
      const action = loginAction(result.data.content);
      console.log(result);
      dispatch(action);

      setStoreJson(USER_LOGIN, result.data.content);
      setCookie(TOKEN, result.data.content.accessToken);

      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post(`/api/Users/getProfile`);
      console.log(result);
      const action = getProfileAction(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileApi = (updatedData) => {
  return async () => {
    try {
      await http.post(`/api/Users/updateProfile`, updatedData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginFacebookApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `https://shop.cyberlearn.vn/api/Users/facebooklogin`,
        userLogin,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(result);
      if (result?.data?.statusCode === 200) {
        const action = registerAction(result.data.content);
        dispatch(action);
        setStoreJson(USER_LOGIN, result.data.content);
        setCookie(TOKEN, result.data.content.accessToken);
        window.location.href = '/';
      }
      // const action = loginAction(result.data.content);
      // dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
