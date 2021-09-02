import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { token } from '../helper/token';

const initialState = {
  user: {},
  token: '',
  status: 'idle',
  error: null,
  isAuth: false,
};

const BASE_URL = 'http://localhost:4000';

export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/auth/register`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        payload,
        config
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/auth/user`, config);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserFromStorage(state) {
      const user = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : null;

      if (user) {
        state.user = user.user;
      }
    },
    getTokenFromStorage(state) {
      const authToken = localStorage.getItem('authToken')
        ? JSON.parse(localStorage.getItem('authToken'))
        : null;

      if (authToken) {
        state.isAuth = true;
        state.token = authToken;
      }
    },
    logoutUser() {
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
      window.location.href = '/';
    },
  },
  extraReducers: {
    // Register
    [registerUserAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUserAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.isAuth = true;
      localStorage.setItem('authToken', JSON.stringify(action.payload.token));
      window.location.href = '/dashboard';
    },
    [registerUserAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },

    // Login
    [loginUserAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.isAuth = true;
      localStorage.setItem('authToken', JSON.stringify(action.payload.token));
      window.location.href = '/dashboard';
    },

    // Get user data
    [getUserData.pending]: (state) => {
      state.status = 'loading';
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.user = action.payload.user;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
  },
});

export const { getUserFromStorage, getTokenFromStorage, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
