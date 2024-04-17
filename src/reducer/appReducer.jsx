import{
    GET_STATUS,
    GET_RESULTS,
    SORT_ACTIONS,
    FILTER_ACTIONS,
    SORT_FILTER_ACTIONS,
    ADD_ACTIONS
}from "../utils/constant"
const initialAppState = {
    income: [],
    incomeFilters: { sort: false, category: "All" },
    filteredIncome: [],
    expenses: [],
    expensesFilters: { sort: false, category: "All" },
    filteredExpenses: [],
    saving: [],
    savingFilters: { sort: false, category: "All" },
    filteredSaving: [],
    loading: false,
    error: null
  };
  const appReducer=(state=initialAppState,{type,payload})=>{
    switch (type) {
        case GET_STATUS.LOADING:
            return{...state,loading:true}
        case GET_RESULTS.INCOME.SUCCESS:
            return{...state,
                income: payload,
                filteredIncome: payload,
                loading:true,
            error:null}
        case GET_RESULTS.EXPENSES.SUCCESS:
            return{...state,
                expenses: payload,
                filteredExpenses: payload,
                loading:true,
            error:null}
        case GET_RESULTS.SAVING.SUCCESS:
            return{...state,
                saving: payload,
                filteredSaving: payload,
                loading:true,
            error:null}

        case GET_RESULTS.INCOME.FAILURE:
        return{
            ...state,
            loading:false,
            error:"Error in getting Income data!"
        }
        case GET_RESULTS.EXPENSES.FAILURE:
        return{
            ...state,
            loading:false,
            error:"Error in getting expenses data!"
        }
        case GET_RESULTS.SAVING.FAILURE:
        return{
            ...state,
            loading:false,
            error:"Error in getting saving data!"
        }
        case SORT_ACTIONS.INCOME:
        return{
            ...state,
            incomeFilters:{...state.incomeFilters,sort:payload}
        }
        case SORT_ACTIONS.EXPENSES:
        return{
            ...state,
            expensesFilters:{...state.expensesFilters,sort:payload}
        }
        case SORT_ACTIONS.SAVING:
        return{
            ...state,
            savingFilters:{...state.savingFilters,sort:payload}
        }
        case FILTER_ACTIONS.INCOME:
            return{
                    ...state,
                    incomeFilters:{...state.incomeFilters,category:payload}
            }
        case FILTER_ACTIONS.EXPENSES:
            return{
                    ...state,
                    expensesFilters:{...state.expensesFilters,category:payload}
            }
        case FILTER_ACTIONS.SAVING:
            return{
                    ...state,
                    savingFilters:{...state.savingFilters,category:payload}
            }
    case SORT_FILTER_ACTIONS.INCOME:
        {
            const {sort,category}= state.incomeFilters
            let filteredIncomes
            if (sort&& category!=="All") {
                filteredIncomes =[...state.income].sort((a,b)=>a.amount-b.amount).filter((data)=>data.category===category)
                
            } else if(!sort&& category!=="All"){
                filteredIncomes =[...state.income].filter((data)=>data.category===category)
            }else if (sort&& category!=="All") {
                filteredIncomes =[...state.income].sort((a,b)=>a.amount-b.amount)
                
            }else{
                filteredIncomes=state.income
            }
            return{...state,filteredIncome:filteredIncomes}

        }
    case SORT_FILTER_ACTIONS.EXPENSES:
        {
            const {sort,category}= state.expensesFilters
            let filteredAllExpenses
            if (sort&& category!=="All") {
                filteredAllExpenses =[...state.expenses].sort((a,b)=>a.amount-b.amount).filter((data)=>data.category===category)
                
            } else if(!sort&& category!=="All"){
                filteredAllExpenses =[...state.expenses].filter((data)=>data.category===category)
            }else if (sort&& category!=="All") {
                filteredAllExpenses =[...state.expenses].sort((a,b)=>a.amount-b.amount)
                
            }else{
                filteredAllExpenses=state.expenses
            }
            return{...state,filteredExpenses:filteredAllExpenses}

        }
    case SORT_FILTER_ACTIONS.SAVING:
        {
            const {sort,category}= state.savingFilters
            let filteredAllSaving
            if (sort&& category!=="All") {
                filteredAllSaving =[...state.saving].sort((a,b)=>a.amount-b.amount).filter((data)=>data.category===category)
                
            } else if(!sort&& category!=="All"){
                filteredAllSaving =[...state.saving].filter((data)=>data.category===category)
            }else if (sort&& category!=="All") {
                filteredAllSaving =[...state.saving].sort((a,b)=>a.amount-b.amount)
                
            }else{
                filteredAllSaving=state.saving
            }
            return{...state,filteredSaving:filteredAllSaving}

        }
        case ADD_ACTIONS.INCOME:
            return {
              ...state,
              income: [...state.income, payload],
              filteredIncome: [...state.income, payload],
              loading: false,
              error: null
            };
          case ADD_ACTIONS.EXPENSES:
            return {
              ...state,
              expenses: [...state.expenses, payload],
              filteredExpenses: [...state.expenses, payload],
              loading: false,
              error: null
            };
          case ADD_ACTIONS.SAVING:
            return {
              ...state,
              saving: [...state.saving, payload],
              filteredSaving: [...state.saving, payload],
              loading: false,
              error: null
            };
          case ADD_ACTIONS.FAILURE:
            return { ...state, loading: false, error: "Error while adding data!" };

        default:
            return state;
    }
  }
  export { appReducer }