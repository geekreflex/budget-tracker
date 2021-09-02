import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  return (
    <div className="links">
      <Link className="btn btn-primary" to="/register">
        Register
      </Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default AuthLinks;
