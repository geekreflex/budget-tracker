import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setEditBudgetId, setDeleteBudget } from '../redux/appSlice';

const ActionButton = ({ budget }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditBudgetId(budget.id));
  };

  const handleDelete = () => {
    const data = {
      name: budget.name,
      id: budget.id,
    };
    dispatch(setDeleteBudget(data));
  };

  return (
    <div className="d-flex justify-content-end">
      <Link to={`/budget/${budget.id}`} className="btn btn-info btn-sm mr-2">
        View
      </Link>
      <button onClick={handleEdit} className="btn btn-warning btn-sm mr-2">
        Edit
      </button>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

export default ActionButton;
