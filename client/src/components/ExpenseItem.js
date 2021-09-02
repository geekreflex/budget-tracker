import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { deleteExpenseAsync } from '../redux/expensesSlice';

const ExpenseItem = ({ expense }) => {
  const dispatch = useDispatch();

  const handleDeleteExpense = () => {
    dispatch(deleteExpenseAsync(expense.id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-item-center">
      {expense.name}
      <div>
        <span className="badge badge-primary mr-3">
          ${expense.cost.toLocaleString()}
        </span>
        <TiDelete size="1.5em" onClick={handleDeleteExpense}></TiDelete>
      </div>
    </li>
  );
};

export default ExpenseItem;
