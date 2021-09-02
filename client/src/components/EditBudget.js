import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unsetEditBudgetId } from '../redux/appSlice';
import { updateBudgetAsync } from '../redux/budgetsSlice';

const EditBudget = ({ budget }) => {
  const [name, setName] = useState(budget.name);
  const [total, setTotal] = useState(budget.total);

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.budgets);

  const handleCancelEdit = (e) => {
    e.preventDefault();

    dispatch(unsetEditBudgetId());
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const payload = {
      data: {
        name,
        total,
      },
      id: budget.id,
    };

    dispatch(updateBudgetAsync(payload));
    if (status === 'idle') {
      dispatch(unsetEditBudgetId());
    }
  };

  return (
    <div className="col-sm-6 mb-4">
      <div className="card p-3">
        <form onSubmit={handleUpdateSubmit}>
          <div className="form-group">
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
            <input
              type="number"
              className="form-control"
              id="budget-total"
              placeholder="e.g. $40,000"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleCancelEdit}
            className="btn btn-light btn-sm mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;
