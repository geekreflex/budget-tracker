import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBudgetModal } from '../redux/appSlice';
import { createBudgetAsync } from '../redux/budgetsSlice';

const AddBudgetForm = () => {
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');

  const dispatch = useDispatch();

  const { budgetModal } = useSelector((state) => state.app);
  const { status } = useSelector((state) => state.budgets);

  const closeBudgetModal = (e) => {
    e.preventDefault();
    dispatch(toggleBudgetModal());
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      total: parseInt(total),
    };

    dispatch(createBudgetAsync(data));
    setName('');
    setTotal('');
    console.log(status);
    if (status === 'idle') {
      closeBudgetModal(e);
    }
  };

  return (
    <div className={`add-budget-form  ${budgetModal ? '' : 'd-none'}`}>
      <div onClick={closeBudgetModal} className="overlay"></div>
      <div className="add-budget-form-wrap">
        <h3 className="mb-3">Add New Budget</h3>
        <form onSubmit={handleBudgetSubmit}>
          <div className="form-group">
            <label htmlFor="budget-name">Budget Name</label>
            <input
              type="text"
              className="form-control"
              id="budget-name"
              placeholder="e.g. Construction"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget-total">Budget Total</label>
            <input
              type="text"
              className="form-control"
              id="budget-total"
              placeholder="e.g. $40,000"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-light mr-3" onClick={closeBudgetModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetForm;
