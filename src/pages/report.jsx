import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { getIncome, getExpenses, getSaving } from "../actions/action";
import { createSelector } from "reselect";

const selectLoading = (state) => state.loading;
const selectError = (state) => state.error;

const getLoading = createSelector(selectLoading, (loading) => loading);
const getError = createSelector(selectError, (error) => error);

const Report = () => {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income);
  const expense = useSelector((state) => state.expenses);
  const saving = useSelector((state) => state.saving);
  const loading = useSelector(getLoading);
  const fetchError = useSelector(getError);

  const [reportType, setReportType] = useState("Income vs. Expenses");
  const [reportData, setReportData] = useState([]);
  const [reportOptions, setReportOptions] = useState({});

  const totalIncome = income.reduce((sum, { amount }) => sum + amount, 0);
  const totalExpense = expense.reduce((sum, { amount }) => sum + amount, 0);
  const totalSaving = saving.reduce((sum, { amount }) => sum + amount, 0);

  const expenseByCategory = expense.reduce(
    (fin, { category, amount }) => ({
      ...fin,
      [category]: (fin[category] ?? 0) + amount
    }),
    {}
  );

  const incomeExpensesData = [
    ["Type", "Amount"],
    ["Income", totalIncome],
    ["Expense", totalExpense],
    ["Saving", totalSaving]
  ];

  const expenseBreakdownData = [
    ["Category", "Amount"],
    ...Object.entries(expenseByCategory)
  ];

  const commonChartOptions = {
    responsive: true,
    fontName: "Arial",
    titleTextStyle: {
      fontSize: 18,
      bold: true
    },
    is3D: true,
    backgroundColor: "#f8faec",
    animation: {
      startup: true,
      easing: "inAndOut"
    }
  };

  const incomeExpensesOptions = {
    ...commonChartOptions,
    title: "Income vs. Expenses Report",
    colors: ["#A384E3", "#F6AF8E", "#24AE90"]
  };

  const expenseBreakdownOptions = {
    ...commonChartOptions,
    title: "Expense Breakdown Report",

    colors: ["#A384E3", "#E8D798", "#24AE90", "#EA9DCA", "#F6AF8E"]
  };

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getExpenses());
    dispatch(getSaving());
  }, [dispatch]);

  useEffect(() => {
    generateReport();
  }, [reportType, income, expense]);

  const generateReport = () => {
    if (reportType === "Income vs. Expenses") {
      setReportData(incomeExpensesData);
      setReportOptions(incomeExpensesOptions);
    } else if (reportType === "Expense Breakdown") {
      setReportData(expenseBreakdownData);
      setReportOptions(expenseBreakdownOptions);
    }
  };

  return (
    <div className="page">
      <h2 className="heading">Report</h2>
      <div className="report-input">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="Income vs. Expenses">Income vs. Expenses</option>
          <option value="Expense Breakdown">Expense Breakdown</option>
        </select>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : reportData.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={reportData}
          options={reportOptions}
          style={{ width: "100%", height: "300px" }}
        />
      ) : (
        <h3>No data to show</h3>
      )}
      {fetchError && <h3>Error: {fetchError}</h3>}
    </div>
  );
};

export { Report };
