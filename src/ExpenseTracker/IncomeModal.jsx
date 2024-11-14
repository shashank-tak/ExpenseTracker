import React, { useState } from "react";
import Styles from "./IncomeModal.module.css";

const IncomeModal = ({ onClose, onAddIncome }) => {
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleAddIncome = () => {
    const amount = parseFloat(incomeAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddIncome(amount);
      setIncomeAmount(""); // Reset input field
    }
  };

  return (
    <div className="modal">
      <h2 style={{color:'black'}}>Add Balance</h2>
      <div className={Styles.BalanceItems}>
        <input
          className={Styles.InputBox}
          type="number"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
          placeholder="Income Amount"
        />
        <button className={Styles.Addbtn} onClick={handleAddIncome}>Add Balance</button>
        <button className={Styles.Cancelbtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default IncomeModal;
