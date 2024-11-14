import React, { useEffect, useState } from "react";
import Styles from "./ExpenseTracker.module.css";
import { BiRupee } from "react-icons/bi";
import IncomeModal from "./IncomeModal";
import ExpenseModal from "./ExpenseModal";
import ExpenseChart from "./ExpenseChart";

const ExpenseTracker = ({ onExpenseChange }) => {
  const [currBalance, setBalance] = useState(5000);
  const [currExpense, setExpense] = useState(0);
  const [incomeModal, setIncomeModalToggle] = useState(false);
  const [expenseModal, setExpenseModalToggle] = useState(false);

  useEffect(() => {
    localStorage.setItem("Balance", currBalance);
    localStorage.setItem("Expense", currExpense);
    onExpenseChange();
  }, [currBalance, currExpense]);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const handleIncomeAdd = () => {
    setIncomeModalToggle(true);
  };

  const handleExpenseAdd = () => {
    setExpenseModalToggle(true);
  };

  const addIncome = (amount) => {
    console.log(currBalance);
    setBalance(currBalance + amount);
    setIncomeModalToggle(false);
  };

  console.log(localStorage.getItem("Expenses"));

  return (
    <>
      <div className={incomeModal ? Styles.blurredBackground : Styles.ExpenseClass}>
        <h2 style={{ textAlign: "left" }}>Expense Tracker</h2>
        <div className={Styles.ExpenseTracker}>
          <div className={Styles.Wallet}>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "white" }}>Wallet Balance: </span>
              <span
                style={{ color: "#15fd00", display: "flex", alignItems: "center" }}
              >
                <BiRupee />
                {currBalance}
              </span>
            </h2>
            <button className={Styles.Incomebtn} onClick={handleIncomeAdd}>
              +Add Income
            </button>
          </div>
          <div className={Styles.Expense}>
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "white" }}>Expenses: </span>
              <span
                style={{ color: "orange", display: "flex", alignItems: "center" }}
              >
                <BiRupee />
                {currExpense}
              </span>
            </h2>
            <button className={Styles.Expensebtn}onClick={handleExpenseAdd}>+Add Expense</button>
          </div>
          <div className={Styles.Chart}><ExpenseChart/></div>
        </div>
      </div>

      {/* Modal overlay */}
      {incomeModal && (
        <div className={Styles.modalOverlay}>
          <div className={Styles.modalContent}>
            <IncomeModal
              onClose={() => setIncomeModalToggle(false)}
              onAddIncome={addIncome}
            />
          </div>
        </div>
      )}
      {expenseModal && (
        <div className={Styles.modalOverlay}>
        <div className={Styles.modalContent}>
          <ExpenseModal
            onClose={() => setExpenseModalToggle(false)}
            onAddExpense={setExpense}
            onDeductIncome={setBalance}
          />
        </div>
      </div>
      )}
    </>
  );
};

export default ExpenseTracker;
