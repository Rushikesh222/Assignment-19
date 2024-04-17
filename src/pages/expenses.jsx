import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  sortDataByAmount,
  filterDataByCategory,
  applyFilters,
  addEntry
} from "../actions/action";
import { ExpenseCard, IncomeExpenseForm } from "../components";
import { CATEGORY } from "../utils/constant";
import { createSelector } from "reselect";

const selectExpenseFilters = (state) => state.expensesFilters;
const selectFilteredIncome = (state) => state.filteredExpenses;
const selectLoading = (state) => state.loading;
const selectError = (state) => state.error;

export const getExpenseFilters = createSelector(
  selectExpenseFilters,
  (expenseFilters) => expenseFilters
);
export const getFilteredExpense = createSelector(
  selectFilteredIncome,
  (filteredExpense) => filteredExpense
);
export const getLoading = createSelector(selectLoading, (loading) => loading);
export const getError = createSelector(selectError, (error) => error);

const Expense = () => {
    const dispatch = useDispatch();
    const expenseFilters = useSelector(getExpenseFilters);
    const filteredExpense = useSelector(getFilteredExpense);
    const loading = useSelector(getLoading);
    const fetchError = useSelector(getError);
  
    useEffect(() => {
      dispatch(getExpenses());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(applyFilters("EXPENSE"));
    }, [expenseFilters]);
  
    const handleSortByAmount = (isChecked) => {
      dispatch(sortDataByAmount("EXPENSE", isChecked));
    };
  
    const handleFilterByCategory = (category) => {
      dispatch(filterDataByCategory("EXPENSE", category));
    };
  
    const handleAddExpense = (expenseData) => {
      dispatch(addEntry("expense", expenseData));
    };
  
    return (
      <div className="page">
        <h2 className="heading">Expense</h2>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div className="form-container">
              <h3>Add New Expense</h3>
              <IncomeExpenseForm onSubmit={handleAddExpense} />
            </div>
            <div className="filter_body">
              <h3>Filters:</h3>
              <div className="filter_container">
                <div>
                  <input
                    type="checkbox"
                    checked={expenseFilters.sort}
                    onChange={(e) => handleSortByAmount(e.target.checked)}
                  />
                  <label> Sort by Amount</label>
                </div>
                <div>
                  <label>Category: </label>
                  <select
                    value={expenseFilters.category}
                    onChange={(e) => handleFilterByCategory(e.target.value)}
                  >
                    {["All", ...CATEGORY.EXPENSES].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
  
            {fetchError ? (
              <h3>Error: {fetchError}</h3>
            ) : filteredExpense.length ? (
              <table className="item-table">
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                  {filteredExpense.map((expense) => (
                    <ExpenseCard expense={expense} key={expense._id} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No expense to display!</h3>
            )}
          </>
        )}
      </div>
    );
  };
  
  export { Expense };
  