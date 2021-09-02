import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBudgetAsync } from '../redux/budgetsSlice';
import { closeDeleteBudgetModal } from '../redux/appSlice';

const ConfirmDelete = ({ history }) => {
  const dispatch = useDispatch();
  const { confirmDelModal, delBudgetId, delBudgetName } = useSelector(
    (state) => state.app
  );

  const handleDelete = () => {
    dispatch(deleteBudgetAsync(delBudgetId));
    handleCancelDelete();
    if (history) {
      history.push('/dashboard');
    }
  };

  const handleCancelDelete = () => {
    dispatch(closeDeleteBudgetModal());
  };

  return (
    <div className={`confirm-del ${confirmDelModal ? '' : 'd-none'}`}>
      <div onClick={handleCancelDelete} className="overlay"></div>
      <div
        style={{ width: '300px' }}
        className="card d-flex align-items-center p-3"
      >
        <h4>Are you sure?</h4>
        <p>{delBudgetName}</p>
        <div className="confirm-btns">
          <button
            onClick={handleCancelDelete}
            className="btn btn-sm btn-light mr-3"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
