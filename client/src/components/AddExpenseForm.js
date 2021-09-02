import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExpenseAsync } from '../redux/expensesSlice';

const AddExpenseForm = ({ budget }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const expense = {
      name,
      cost: parseInt(cost),
      budgetId: budget.id,
    };

    dispatch(createExpenseAsync(expense));
    setName('');
    setCost('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm col-lg-4">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm col-lg-4">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
