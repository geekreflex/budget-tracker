import React, { useEffect, useState } from 'react';
import { token } from '../helper/token';
import { BASE_URL } from '../helper/baseUrl';

const Badge = ({ budget }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const id = budget.id;

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setExpenses(data.data);
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const remaining = budget.total - totalExpenses;

  return (
    <div className="badget-list mb-3">
      {isLoading ? (
        <div style={{ fontSize: '10px', fontWeight: '600' }}>Loading...</div>
      ) : (
        <div>
          <div className="badge badge-info mr-3">
            <span>Spent so far: </span>${totalExpenses.toLocaleString()}
          </div>

          <div className="badge badge-info">
            <span>Remaining: </span>${remaining.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Badge;
