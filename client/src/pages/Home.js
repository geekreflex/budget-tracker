import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user, isAuth } = useSelector((state) => state.user);

  return (
    <div>
      <h2>Welcome, {isAuth ? user?.name : 'Guest'}</h2>
    </div>
  );
};

export default Home;
