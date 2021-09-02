import React from 'react';
import { useSelector } from 'react-redux';

const ExpenseTotalBox = () => {
  const { data } = useSelector((state) => state.expenses);
  const totalExpenses = data.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  return (
    <div>
      <div className="alert alert-primary p-4">
        <span>Spent so far: ${totalExpenses.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ExpenseTotalBox;
