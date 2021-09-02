import React from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteBudget } from '../redux/appSlice';

const BudgetBox = ({ budget }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const data = {
      name: budget.name,
      id: budget.id,
    };
    dispatch(setDeleteBudget(data));
  };
  return (
    <div className="col alert alert-secondary p-3 d-flex justify-content-between align-items-center">
      <div>
        <h5>{budget.name}</h5>
        <h3 className="">${budget?.total?.toLocaleString()}</h3>
      </div>
      <div>
        <button className="btn btn-warning mr-3">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetBox;
