import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addEntry } from "../actions/action";
import { CATEGORY } from "../utils/constant";

const IncomeExpenseForm = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromPathname(pathname).toUpperCase();
  const initialFromInput = {
    category: "other",
    description: "",
    amount: 0,
  };
  const [formInput, setFromInput] = useState(initialFromInput);
  function getPageFromPathname(pathname) {
    if (pathname === "/") return "income";
    if (pathname === "/expenses") return "expenses";
    return "saving";
  }
  const fromSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addEntry({ ...formInput, date: new Date(), type: page }));
    setFromInput(initialFromInput);
  };

  useEffect(() => {
    setFromInput(initialFromInput);
  }, [pathname]);

  return (
    <form onSubmit={fromSubmitHandler} className="form">
      <div>
        <label>{page} category:</label>
        <select
          value={formInput.category}
          onChange={(e) =>
            setFromInput({ ...formInput, category: e.target.value })
          }
          required
        >
          {CATEGORY[page].map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>{page} description:</label>
        <input
          type="text"
          value={formInput.description}
          onChange={(e) =>
            setFromInput({ ...formInput, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>{page} amount:</label>
        <input
          type="number"
          min="0"
          value={formInput.amount}
          onChange={(e) =>
            setFromInput({
              ...formInput,
              amount: Number(e.target.value),
            })
          }
          required
        />
      </div>
      <button type="submit">Add {page}</button>
    </form>
  );
};
export { IncomeExpenseForm };
