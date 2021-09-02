import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetBox from '../components/BudgetBox';
import Expenses from '../components/Expenses';
import ExpenseTotalBox from '../components/ExpenseTotalBox';
import RemainingBox from '../components/RemainingBox';
import { getBudgetAsync } from '../redux/budgetsSlice';
import { getExpensesAsync } from '../redux/expensesSlice';
import Message from '../components/Message';
import ConfirmDelete from '../components/ConfirmDelete';
import Loading from '../components/Loading';

const Budget = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const { budget, status } = useSelector((state) => state.budgets);
  const { msg } = useSelector((state) => state.expenses);
  const EStatus = useSelector((state) => state.expenses.status);

  useEffect(() => {
    dispatch(getExpensesAsync(id));
    dispatch(getBudgetAsync(id));
  }, [id, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="mt-4">
      <ConfirmDelete history={history} />
      <div className="">
        <BudgetBox budget={budget} />
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <RemainingBox budget={budget} />
        </div>
        <div className="col-sm">
          <ExpenseTotalBox budget={budget} />
        </div>
      </div>
      <h3 className="mt-3">Add Expense</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <AddExpenseForm budget={budget} />
        </div>
      </div>
      <Expenses />
      {EStatus === 'loading' ? '' : msg && <Message msg={msg} />}
    </div>
  );
};

export default Budget;
