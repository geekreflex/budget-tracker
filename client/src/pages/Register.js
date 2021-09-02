import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/userSlice';
import Message from '../components/Message';

const Register = () => {
  const dispatch = useDispatch();

  const { error, status } = useSelector((state) => state.user);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    let payload = {
      name: fullName,
      email: email,
      password: password,
    };

    dispatch(registerUserAsync(payload));
  };

  return (
    <div className="form-wrap">
      {status === 'loading'
        ? ''
        : error && <Message type="error" msg={error} />}
      <div className="card p-3 mt-4" style={{ width: '400px' }}>
        <form className="" onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Full name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Enter your name..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
