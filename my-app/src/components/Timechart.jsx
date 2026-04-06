import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, ResponsiveContainer,Cell
} from "recharts";
import { transactions_data } from "../data/data.js";
import { getChartData } from "../data/data.js";
import EmptyState from "./EmptyState.jsx";
import '../styles/TimeChart.css';

const TimeChart = () => {
  const data = getChartData(transactions_data);

  // NEW: Balance trend data for BarChart
  const balanceData = data.map(item => ({
    date: item.date,
    balance: item.income - item.expense
  }));

  return (
    <div className="time-chart-container balance-trend-container">
      <h2>Income vs Expenses</h2>
      {transactions_data.length === 0 ? (
        <EmptyState message="No transactions yet." />
      ) : (
        <>
          {/* Line Chart - Income vs Expense */}
          <div style={{height: 250, marginBottom: '2rem'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" tickLine={false} tick={{fontSize: 15, fontWeight: '600'}} interval={0}/>
                <YAxis tickLine={false} tick={{fontSize: 15, fontWeight: '600'}}/>
                <Tooltip
                  contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "12px",
                  color: "#fff"
                }}
                />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9"/>
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  dot={false} 
                  strokeWidth={4}
                  stroke="#10b981"
                  activeDot={{ r: 8, strokeWidth: 3 }}
                />
                <Line
                  type="monotone" 
                  dataKey="expense" 
                  strokeWidth={4}
                  stroke="#ef4444"
                  dot={false} 
                  activeDot={{ r: 8, strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* NEW: Balance Trend Bar Chart */}
          <div style={{height: 220,paddingBottom:'20px'}}>
            <h2>Balance Trend</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={balanceData}  margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                <XAxis dataKey="date" tickLine={false} tick={{fontSize: 15, fontWeight: '600'}} interval={0}/>
                <YAxis tickLine={false} tick={{fontSize: 15, fontWeight: '600'}}/>
                <Tooltip
                  contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "12px",
                  color: "#fff"
                }}
                />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9"/>
                <Bar dataKey="balance" radius={[6, 6, 0, 0]} minPointSize={5}>
                  {balanceData.map((entry, index) => (
                  <Cell
                  key={index}
                  fill={entry.balance >= 0 ? "#10b981" : "#ef4444"}
                />
             ))}
            </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeChart;