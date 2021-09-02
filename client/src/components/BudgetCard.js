import React from 'react';
import Badge from './Badge';
import { Link } from 'react-router-dom';
import ActionButton from './ActionButton';

const BudgetCard = ({ budget }) => {
  return (
    <div className="col-sm-6 mb-4">
      <div className="card p-3">
        <div className="budget-data">
          <div>
            <Link to={`/budget/${budget.id}`}>
              <h4>{budget.name}</h4>
            </Link>
          </div>
          <span className="budget-total">${budget.total.toLocaleString()}</span>
        </div>
        <Badge budget={budget} />
        <ActionButton budget={budget} />
      </div>
    </div>
  );
};

export default BudgetCard;
