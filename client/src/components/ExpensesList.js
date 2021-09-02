import React, { useEffect, useState } from 'react';
import ExpenseItem from './ExpenseItem';
import { useSelector } from 'react-redux';

const ExpenseList = () => {
  const { data } = useSelector((state) => state.expenses);
  const [filteredExpenses, setFilteredExpenses] = useState(data || []);

  useEffect(() => {
    setFilteredExpenses(data);
  }, [data]);

  const handleSearch = (e) => {
    const searchResults = data.filter((filteredExpenses) =>
      filteredExpenses.name.toLowerCase().includes(e.target.value)
    );
    setFilteredExpenses(searchResults);
  };

  return (
    <>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleSearch}
      />
      <ul className="list-group">
        {filteredExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
