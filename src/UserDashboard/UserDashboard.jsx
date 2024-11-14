import React, {useCallback, useState} from "react";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker.jsx";
import Transaction from "../Transactions/Transaction.jsx";
import TopExpense from "../TopExpenses/TopExpense.jsx";
import Styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  const [updateKey, setUpdateKey] = useState(0);

  const triggerUpdate = useCallback(() => {
    setUpdateKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        padding: "20px",
        backgroundColor: "#3d3c3c",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className={Styles.HeroSection}>
        <ExpenseTracker onExpenseChange={triggerUpdate} />
      </div>
      <div className={Styles.ContentArea}>
        <Transaction updateTrigger={updateKey}/>
        <TopExpense updateTrigger={updateKey}/>
      </div>
    </div>
  );
};

export default UserDashboard;
