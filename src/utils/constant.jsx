const BASE_URL ="https://d28a50c3-586c-4d3f-ac7b-f6a1f47bca7b-00-2jmtogmtjg59p.pike.replit.dev/"
const CATEGORY={
    INCOME:["Other","Salary","Freelancer","Investments"],
    EXPENSES:["Other","Rent","Groceries","Dining","Utilities","Transportation","Entertainment"],
    SAVING:["Other","Emergency Fund","Retirement","Vacation","Eduction"],
}
const GET_STATUS = {
    LOADING: "GET_DATA_LOADING"
  };
  
  const GET_RESULTS = {
    INCOME: {
      SUCCESS: "GET_INCOME_SUCCESS",
      FAILURE: "GET_INCOME_FAILURE"
    },
    EXPENSES: {
      SUCCESS: "GET_EXPENSE_SUCCESS",
      FAILURE: "GET_EXPENSE_FAILURE"
    },
    SAVING: {
      SUCCESS: "GET_SAVING_SUCCESS",
      FAILURE: "GET_SAVING_FAILURE"
    }
  };
  const SORT_ACTIONS = {
    INCOME: "SET_SORT_INCOME",
    EXPENSE: "SET_SORT_EXPENSE",
    SAVING: "SET_SORT_SAVING"
  };
  
  const FILTER_ACTIONS = {
    INCOME: "SET_FILTER_INCOME",
    EXPENSE: "SET_FILTER_EXPENSE",
    SAVING: "SET_FILTER_SAVING"
  };
  
  const SORT_FILTER_ACTIONS = {
    INCOME: "SORT_FILTER_INCOME",
    EXPENSE: "SORT_FILTER_EXPENSE",
    SAVING: "SORT_FILTER_SAVING"
  };
  
  const ADD_ACTIONS = {
    INCOME: "ADD_INCOME_SUCCESS",
    EXPENSE: "ADD_EXPENSE_SUCCESS",
    SAVING: "ADD_SAVING_SUCCESS",
    FAILURE: "ADD_ENTRY_FAILURE"
  };
  
  export {
    BASE_URL,
    CATEGORY,
    GET_STATUS,
    GET_RESULTS,
    SORT_ACTIONS,
    FILTER_ACTIONS,
    SORT_FILTER_ACTIONS,
    ADD_ACTIONS
  };
  