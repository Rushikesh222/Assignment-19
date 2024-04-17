import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSaving,
  sortDataByAmount,
  filterDataByCategory,
  applyFilters,
  addEntry
} from "../actions/action";
import { SavingCard, IncomeExpenseForm } from "../components";
import { CATEGORY } from "../utils/constant";
import { createSelector } from "reselect";

const selectSavingFilters = (state) => state.savingFilters;
const selectFilteredSavings = (state) => state.filteredSaving;
const selectLoading = (state) => state.loading;
const selectError = (state) => state.error;

export const getSavingFilters = createSelector(
  selectSavingFilters,
  (savingFilters) => savingFilters
);
export const getFilteredSavings = createSelector(
  selectFilteredSavings,
  (filteredSaving) => filteredSaving
);
export const getLoading = createSelector(selectLoading, (loading) => loading);
export const getError = createSelector(selectError, (error) => error);

const Saving = () => {
  const dispatch = useDispatch();
  const savingFilters = useSelector(getSavingFilters);
  const filteredSaving = useSelector(getFilteredSavings);
  const loading = useSelector(getLoading);
  const fetchError = useSelector(getError);

  useEffect(() => {
    dispatch(getSaving());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters("SAVING"));
  }, [savingFilters]);

  const handleSortByAmount = (isChecked) => {
    dispatch(sortDataByAmount("SAVING", isChecked));
  };

  const handleFilterByCategory = (category) => {
    dispatch(filterDataByCategory("SAVING", category));
  };

  const handleAddSaving = (savingData) => {
    dispatch(addEntry("saving", savingData));
  };

  return (
    <div className="page">
      <h2 className="heading">Saving</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="form-container">
            <h3>Add New Saving</h3>
            <IncomeExpenseForm onSubmit={handleAddSaving} />
          </div>
          <div className="filter_body">
            <h3>Filters:</h3>
            <div className="filter_container">
              <div>
                <input
                  type="checkbox"
                  checked={savingFilters.sort}
                  onChange={(e) => handleSortByAmount(e.target.checked)}
                />
                <label> Sort by Amount</label>
              </div>
              <div>
                <label>Category: </label>
                <select
                  value={savingFilters.category}
                  onChange={(e) => handleFilterByCategory(e.target.value)}
                >
                  {["All", ...CATEGORY.SAVING].map((cat) => (
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
          ) : filteredSaving.length ? (
            <table className="item-table">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {filteredSaving.map((saving) => (
                  <SavingCard saving={saving} key={saving._id} />
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No savings to display!</h3>
          )}
        </>
      )}
    </div>
  );
};

export { Saving };
