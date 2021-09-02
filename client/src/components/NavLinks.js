import React from 'react';
import { logoutUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBudgetModal } from '../redux/appSlice';

const NavLinks = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const showAddBudgetModal = () => {
    dispatch(toggleBudgetModal());
  };
  return (
    <div className="links">
      <Link to="/dashboard">Dashboard</Link>
      <button className="btn btn-secondary" onClick={showAddBudgetModal}>
        New Budget
      </button>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavLinks;
