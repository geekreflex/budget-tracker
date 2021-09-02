import React from 'react';
import { useSelector } from 'react-redux';
import ExpensesList from './ExpensesList';

const Expenses = () => {
  const { data } = useSelector((state) => state.expenses);

  return (
    <>
      {data.length ? (
        <>
          <h3 className="mt-3">Expenses</h3>
          <div className="row mt-3">
            <div className="col-sm">
              <ExpensesList />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-3 alert alert-info">No Expenses</div>
      )}
    </>
  );
};

export default Expenses;
