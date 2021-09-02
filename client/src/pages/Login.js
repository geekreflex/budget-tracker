import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { loginUserAsync } from '../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    let payload = {
      email: email,
      password: password,
    };

    dispatch(loginUserAsync(payload));
  };

  return (
    <div className="form-wrap">
      {status === 'loading'
        ? ''
        : error && <Message type="error" msg={error} />}
      <div className="card p-3 mt-4" style={{ width: '400px' }}>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
