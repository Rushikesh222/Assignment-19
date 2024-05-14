import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncome,
  sortDataByAmount,
  filterDataByCategory,
  applyFilters,
  addEntry,
} from "../actions/action";
import { IncomeCard, IncomeExpenseForm } from "../components";
import { CATEGORY } from "../utils/constant";
import { createSelector } from "reselect";
const selectIncomeFilters = (state) => state.incomeFilters;
const selectFilteredIncome = (state) => state.filteredIncome;
const selectLoading = (state) => state.loading;
const selectError = (state) => state.error;

export const getIncomeFilters = createSelector(
  selectIncomeFilters,
  (incomeFilters) => incomeFilters,
);
export const getFilteredIncome = createSelector(
  selectFilteredIncome,
  (filteredIncome) => filteredIncome,
);
export const getLoading = createSelector(selectLoading, (loading) => loading);
export const getError = createSelector(selectError, (error) => error);
const Income = () => {
  const dispatch = useDispatch();
  const incomeFilters = useSelector(getIncomeFilters);
  const filteredIncome = useSelector(getFilteredIncome);
  const loading = useSelector(getLoading);
  const fetchError = useSelector(getError);
  useEffect(() => {
    dispatch(getIncome());
  }, [dispatch]);
  useEffect(() => {
    dispatch(applyFilters("INCOME"));
  }, [incomeFilters]);
  const handleSortByAmount = (isChecked) => {
    dispatch(sortDataByAmount("INCOME", isChecked));
  };

  const handleFilterByCategory = (category) => {
    dispatch(filterDataByCategory("INCOME", category));
  };

  const handleAddIncome = (incomeData) => {
    dispatch(addEntry("income", incomeData));
  };

  return (
    <div>
      <h2>Income</h2>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <>
          <div>
            <h3>Add New Income</h3>
            <IncomeExpenseForm onSubmit={handleAddIncome} />
          </div>
          <div className="filter_body">
            <h3>Filters:</h3>
            <div className="filter_container">
              <div>
                <input
                  type="checkbox"
                  checked={incomeFilters.sort}
                  onChange={(e) => handleSortByAmount(e.target.checked)}
                />
                <label> Sort by Amount</label>
              </div>
              <div>
                <label>Category: </label>
                <select
                  value={incomeFilters.category}
                  onChange={(e) => handleFilterByCategory(e.target.value)}
                >
                  {["All", ...CATEGORY.INCOME].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {fetchError ? (
            <p className="message">
              {" "}
              Repl isn't wakeup yet
              <a
                href="https://replit.com/@RushikeshShirsa/FinancialManagementBackEnd#index.js"
                target="_blank"
              >
                {" "}
                Click here to navigate
              </a>
            </p>
          ) : filteredIncome.length ? (
            <table className="item-table">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {filteredIncome.map((income) => (
                  <IncomeCard income={income} key={income._id} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No income to display!</h3>
          )}
        </>
      )}
    </div>
  );
};
export { Income };
