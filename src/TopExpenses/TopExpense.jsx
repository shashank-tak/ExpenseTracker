import React from "react";
import Styles from "./TopExpense.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TopExpense = () => {
  const data = (JSON.parse(localStorage.getItem("Expenses")) || []).map(
    (item) => ({
      name: item.category,
      uv: parseFloat(item.price),
    })
  );
  var isEmptyData = false;
  if (data.length === 0) {
    isEmptyData = true;
  }

  const maxBars = 10;
  const barSize = data.length > maxBars ? 10 : 20;

  return (
    <div className={Styles.chartMain}>
      <h2 style={{ textAlign: "left" }}>Top Expenses</h2>
      {!isEmptyData ? <div className={Styles.chartContainer}>
        <BarChart
          width={244}
          height={500}
          data={data}
          className={Styles.rotatedChart}
        >
          <XAxis dataKey="name" />
          <Bar dataKey="uv" fill="#8884d8" barSize={barSize} />
        </BarChart>
      </div> :<p style={{color:'black'}}>No data available for expenses.</p>}
    </div>
  );
};

export default TopExpense;
