import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import BudgetCard from './BudgetCard';
import EditBudget from './EditBudget';
import Loading from './Loading';

const BudgetList = () => {
  const budgets = useSelector((state) => state.budgets.data);
  const status = useSelector((state) => state.budgets.status);

  const { editBudgetId } = useSelector((state) => state.app);

  if (status === 'idle') {
    return (
      <div className="row">
        {budgets.map((budget) => (
          <Fragment key={budget.id}>
            {editBudgetId === budget.id ? (
              <EditBudget key={budget.id} budget={budget} />
            ) : (
              <BudgetCard key={budget.id} budget={budget} />
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  return <Loading />;
};

export default BudgetList;
