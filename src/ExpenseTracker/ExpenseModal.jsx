import React, { useState } from "react";
import Styles from "./ExpenseModal.module.css";

const ExpenseModal = ({ onClose, onAddExpense, onDeductIncome }) => {
  const [formData, updateField] = useExpenseForm();

  const handleAddExpense = () => {

    const expenseWithId = { ...formData, id: Date.now() };
    // Retrieve current expenses from local storage, or initialize as an empty array
    const existingExpenses = JSON.parse(localStorage.getItem("Expenses")) || [];

    // Add the current formData to the expenses array
    const updatedExpenses = [...existingExpenses, expenseWithId];

    // Save the updated expenses array back to local storage
    onAddExpense(parseInt(localStorage.getItem("Expense")) + parseInt(formData.price));
    onDeductIncome(localStorage.getItem("Balance") - parseInt(formData.price));
    localStorage.setItem("Expenses", JSON.stringify(updatedExpenses));

    // Clear the form fields after adding to local storage
    updateField("title", "");
    updateField("price", "");
    updateField("category", "");
    updateField("date", "");
    onClose();
  };

  return (
    <div className="modal">
      <h2 style={{ color: "black" }}>Add Expenses</h2>
      <div className={Styles.MainDiv}>
        <div className={Styles.ExpenseItems}>
          <input
            className={Styles.InputBox}
            type="text"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Title"
          />
          <input
            className={Styles.InputBox}
            type="text"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="Price"
          />
          <button className={Styles.Addbtn} onClick={handleAddExpense}>
              Add Expense
            </button>
        </div>

        <div className={Styles.ExpenseItems2}>
            <input
              className={Styles.InputBox}
              type="text"
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              placeholder="Select category"
            />
            <input
              className={Styles.InputBox}
              type="date"
              value={formData.date}
              onChange={(e) => updateField("date", e.target.value)}
              placeholder="dd/mm/yyyy"
            />
            <button className={Styles.Cancelbtn} onClick={onClose}>
            Cancel
          </button>
        </div>
       </div>
    </div>
  );
};

const useExpenseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const updateField = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return [formData, updateField];
};

export default ExpenseModal;
