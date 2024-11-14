import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const ExpenseChart = () => {
    const data = (JSON.parse(localStorage.getItem("Expenses")) || []).map(item => ({
        name: item.category, 
        value: parseFloat(item.price)
      }));

  if (data.length === 0) {
    return <p>No data available for expenses.</p>;
  }

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{width: '100%', height: '100%'}}>
      <PieChart width={321} height={173}>
        <Pie
          data={data}
          cx={150}
          cy={80}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ExpenseChart;
