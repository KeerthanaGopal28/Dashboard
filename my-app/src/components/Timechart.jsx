import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { transactions_data } from "../data/data.js";
import { getChartData } from "../data/data.js";

const TimeChart = () => {
  const data = getChartData(transactions_data);

  return (
    <div className="time-chart">
      <h2>Income vs Expenses</h2>

      <LineChart width={600} height={300} data={data}>

        <XAxis dataKey="date" tickLine={false} tick={{fontSize:12, fontWeight:'bold'}}/>
        <YAxis tickLine={false} tick={{fontSize:12, fontWeight:'bold'}}/>
        <Tooltip contentStyle={{backgroundColor: "#333",borderRadius: "8px",color: "#fff"
  }}/>

        <Line type="monotone" dataKey="income" stroke="#4CAF50" dot={false} activeDot={{ r: 6 }}/>
        <Line type="monotone" dataKey="expense" stroke="#f44336" dot={false} activeDot={{ r: 6 }} />
      </LineChart>
    </div>
  );
};

export default TimeChart;