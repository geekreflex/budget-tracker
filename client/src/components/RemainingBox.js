import React from 'react';
import { useSelector } from 'react-redux';

const RemainingBox = ({ budget }) => {
  const { data } = useSelector((state) => state.expenses);
  const totalExpenses = data.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const alertType =
    totalExpenses > budget.total ? 'alert-danger' : 'alert-success';

  const remaining = budget.total - totalExpenses;

  return (
    <div>
      <div className={`alert ${alertType} p-4`}>
        <span>Remaining: ${remaining.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RemainingBox;
