import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import budgetsReducer from './budgetsSlice';
import expensesReducer from './expensesSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    budgets: budgetsReducer,
    expenses: expensesReducer,
  },
});
