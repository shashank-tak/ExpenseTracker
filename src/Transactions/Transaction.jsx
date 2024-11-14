import React, { useState, useEffect } from "react";
import Styles from './Transaction.module.css';
import { MdOutlineEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaArrowRight, FaLongArrowAltLeft  } from "react-icons/fa";

const ITEMS_PER_PAGE = 3;

const Transaction = ({ updateTrigger }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const expenses = JSON.parse(localStorage.getItem("Expenses")) || [];
      setData(
        expenses.map(item => ({
          name: item.title,
          date: new Date(item.date).toLocaleDateString(),
          amount: parseFloat(item.price),
          category: item.category,
        }))
      );
    };
    fetchData();
  }, [updateTrigger]);
  

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const deleteExpense = (key) => {
    // Step 1: Retrieve the current expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem("Expenses")) || [];
  
    // Step 2: Filter out the expense with the given key
    const updatedExpenses = expenses.filter(expense => expense.key !== key);
  
    // Step 3: Update localStorage with the new expenses list
    localStorage.setItem("Expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className={Styles.Content}>
      <h2 style={{ textAlign: "left" }}>Recent Transactions</h2>
      <div className={Styles.Transaction}>
        {currentData.map((item, index) => (
          <div key={index} className={Styles.TransactionItem}>
            <div className={Styles.TransactionIcon}>
              {item.category.charAt(0).toUpperCase()}
            </div>
            <div className={Styles.TransactionDetails}>
              <div className={Styles.TransactionTitle}>{item.name}</div>
              <div className={Styles.TransactionDate}>{item.date}</div>
            </div>
            <div className={Styles.TransactionAmount}>
              ₹{item.amount.toFixed(2)}
            </div>
            <div className={Styles.TransactionActions}>
              <button className={Styles.DeleteButton} onClick={() => deleteExpense(item.id)}>
                <TiDeleteOutline />
              </button>
              <button className={Styles.EditButton}>
                <MdOutlineEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={Styles.Pagination}>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FaLongArrowAltLeft />
          </button>
          <div className={Styles.CurrentPage}>{currentPage}</div>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FaArrowRight />
          </button>
        </div>
    </div>
  );
};

export default Transaction;
