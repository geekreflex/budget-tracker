import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../redux/budgetsSlice';

const Message = ({ msg, type }) => {
  const msgRef = useRef('msg');
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        if (document.querySelector('.msg')) {
          document.querySelector('.msg').style.visibility = 'hidden';
          dispatch(clearMessage());
        }
        isMounted = false;
      }, 2000);
    } else {
      document.querySelector('.msg').style.visibility = 'visible';
    }
  }, []);

  return (
    <div
      className={`msg alert ${
        type === 'error' ? 'alert-danger top' : 'alert-info'
      }`}
      ref={msgRef}
    >
      <div className="toast-body">{msg}</div>
    </div>
  );
};

export default Message;
