import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetsAsync, clearBudgetData } from '../redux/budgetsSlice';
import { getUserData } from '../redux/userSlice';

import BudgetList from '../components/BudgetList';
import Message from '../components/Message';
import ConfirmDelete from '../components/ConfirmDelete';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { msg, status } = useSelector((state) => state.budgets);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(clearBudgetData());
    dispatch(getBudgetsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-5">Dashboard.</h1>
      <ConfirmDelete />
      <BudgetList />
      {status === 'loading' ? '' : msg && <Message msg={msg} />}
    </div>
  );
};

export default Dashboard;
