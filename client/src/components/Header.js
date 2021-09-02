import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';
import NavLinks from './NavLinks';

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <header className="header">
      <div className="header-wrap">
        <Link to="/">
          <h3>Budget Tracker</h3>
        </Link>
        {isAuth ? <NavLinks /> : <AuthLinks />}
      </div>
    </header>
  );
};

export default Header;
