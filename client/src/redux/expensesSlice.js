import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { token } from '../helper/token';
import { BASE_URL } from '../helper/baseUrl';

const initialState = {
  data: [
    // { id: 12, name: 'shopping', cost: 40 },
    // { id: 13, name: 'holiday', cost: 400 },
    // { id: 14, name: 'car service', cost: 50 },
  ],
  status: 'idle',
  error: null,
  msg: null,
};

export const getExpensesAsync = createAsyncThunk(
  'budgets/getExpensesAync',
  async (id, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/expenses/${id}`, config);

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

export const createExpenseAsync = createAsyncThunk(
  'expenses/createExpenseAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/expenses`,
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

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpenseAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${BASE_URL}/expenses/${payload}`,

        config
      );

      console.log(data);
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

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    //
  },
  extraReducers: {
    //
    [getExpensesAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getExpensesAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data = action.payload.data;
    },
    [getExpensesAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
      state.data = [];
    },
    [createExpenseAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [createExpenseAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data.push(action.payload.data);
      state.msg = action.payload.message;
    },
    [createExpenseAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    [deleteExpenseAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteExpenseAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data = state.data.filter(
        (expense) => expense.id != action.payload.id
      );
      state.msg = action.payload.message;
    },
    [deleteExpenseAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.msg = action.payload.message;
    },
  },
});

export default expensesSlice.reducer;
