import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { token } from '../helper/token';
import { BASE_URL } from '../helper/baseUrl';

const initialState = {
  data: [],
  budget: {},
  status: 'idle',
  error: null,
  msg: null,
};

export const getBudgetsAsync = createAsyncThunk(
  'budgets/getBudgetsAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/budgets`, config);

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

export const getBudgetAsync = createAsyncThunk(
  'budgets/getBudgetAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/budgets/${payload}`,
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

export const createBudgetAsync = createAsyncThunk(
  'budgets/createBudgetAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`${BASE_URL}/budgets`, payload, config);
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

export const updateBudgetAsync = createAsyncThunk(
  'budgets/updateBudgetAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/budgets/${payload.id}`,
        payload.data,
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

export const deleteBudgetAsync = createAsyncThunk(
  'budget/deleteBudgetAsync',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${BASE_URL}/budgets/${payload}`,
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

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    //
    clearBudgetData(state) {
      state.budget = {};
    },
    clearMessage(state) {
      state.msg = null;
    },
  },
  extraReducers: {
    [getBudgetsAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getBudgetsAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data = action.payload.budgets;
      state.msg = action.payload.message;
    },
    [getBudgetsAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    [createBudgetAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [createBudgetAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data.push(action.payload.data);
      state.msg = action.payload.message;
    },
    [createBudgetAsync.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    [updateBudgetAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [updateBudgetAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      const exitingPost = state.data.find(
        (budget) => budget.id === action.payload.data.id
      );
      if (exitingPost) {
        exitingPost.name = action.payload.data.name;
        exitingPost.total = action.payload.data.total;
      }
      state.msg = action.payload.message;
    },
    [deleteBudgetAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteBudgetAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.data = state.data.filter(
        (budget) => budget.id != action.payload.id
      );
      state.msg = action.payload.message;
    },
    [getBudgetAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getBudgetAsync.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.budget = action.payload.budget;
    },
    [getBudgetAsync.rejected]: (state, action) => {
      state.status = 'idle';
      // state.error = action.payload;
    },
  },
});

export const { clearBudgetData, clearMessage } = budgetsSlice.actions;
export default budgetsSlice.reducer;
