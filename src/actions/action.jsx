import { json } from "react-router";
import {
  BASE_URL,
  GET_STATUS,
  GET_RESULTS,
  SORT_ACTIONS,
  FILTER_ACTIONS,
  SORT_FILTER_ACTIONS,
  ADD_ACTIONS,
} from "../utils/constant";

const getFinancialData = async (endpoint, dispatch) => {
  console.log(endpoint, "Entertainment");
  try {
    dispatch({ type: GET_STATUS.LOADING });
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (response.status === 200) {
      const jsonRes = await response.json();
      console.log(jsonRes);

      dispatch({
        type: GET_RESULTS[endpoint.toUpperCase()].SUCCESS,
        payload: jsonRes.data,
      });
      dispatch({
        type: SORT_FILTER_ACTIONS[endpoint.toUpperCase()],
        payload: jsonRes.data,
      });
    } else {
      dispatch({ type: ADD_ACTIONS.FAILURE });
      console.log(`Error Fetching ${endpoint} data!`);
    }
  } catch (error) {
    dispatch({ type: ADD_ACTIONS.FAILURE });
    console.log(`Error Fetching ${endpoint} data: ${error.message}`);
  }
};
const getIncome = () => async (dispatch) => {
  try {
    getFinancialData("income", dispatch);
  } catch (error) {
    console.log(`Error Fetching Icome data: ${error.message}`);
  }
};
const getExpenses = () => async (dispatch) => {
  try {
    getFinancialData("expenses", dispatch);
  } catch (error) {
    console.log(`Error Fetching Expenses data: ${error.message}`);
  }
};
const getSaving = () => async (dispatch) => {
  try {
    getFinancialData("saving", dispatch);
  } catch (error) {
    console.log(`Error Fetching Saving data: ${error.message}`);
  }
};
const sortDataByAmount = (dataType, isSort) => (dispatch) => {
  dispatch({ type: SORT_ACTIONS[dataType], payload: isSort });
};

const filterDataByCategory = (dataType, category) => (dispatch) => {
  dispatch({ type: FILTER_ACTIONS[dataType], payload: category });
  dispatch({ type: SORT_FILTER_ACTIONS[dataType] });
};

const applyFilters = (dataType) => (dispatch) => {
  dispatch({ type: SORT_FILTER_ACTIONS[dataType] });
};

const addEntry = (entry) => async (dispatch) => {
  const { category, description, amount, date, type } = entry;
  console.log(entry);
  try {
    const response = await fetch(`${BASE_URL}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, description, amount, date }),
    });

    if (response.status === 201) {
      const jsonData = await response.json();
      const successType = ADD_ACTIONS[type.toUpperCase()];
      dispatch({ type: successType, payload: jsonData.data });
      dispatch({ type: SORT_FILTER_ACTIONS[type.toUpperCase()] });
    } else {
      dispatch({ type: ADD_ACTIONS.FAILURE });
      console.log(`Error adding ${type} entry!`);
    }
  } catch (error) {
    dispatch({ type: ADD_ACTIONS.FAILURE });
    console.log(`Error adding ${type} entry: ${error.message}`);
  }
};

export {
  getExpenses,
  getIncome,
  getSaving,
  getFinancialData,
  addEntry,
  filterDataByCategory,
  sortDataByAmount,
  applyFilters,
};
