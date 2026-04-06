import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, ResponsiveContainer,Cell
} from "recharts";
import { transactions_data } from "../data/data.js";
import { getChartData } from "../data/data.js";
import EmptyState from "./EmptyState.jsx";

const TimeChart = () => {
  const data = getChartData(transactions_data);

  // NEW: Balance trend data for BarChart
  const balanceData = data.map(item => ({
    date: item.date,
    balance: item.income - item.expense
  }));

  const formattedData = data.map(d => ({
  ...d,
  shortDate: new Date(d.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
    })
  }));

  const formattedBalance = balanceData.map(d => ({
  ...d,
   shortDate: new Date(d.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  }) 
  }));

  return (
    <div className="time-chart-container balance-trend-container">
      <h2>Income vs Expenses</h2>
      {transactions_data.length === 0 ? (
        <EmptyState message="No transactions yet." />
      ) : (
        <>
          {/* Line Chart - Income vs Expense */}
          <div style={{height: 250}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                 <XAxis 
                   dataKey="shortDate" 
                   tickLine={false} 
                   interval="preserveStartEnd"
                   tick={{fontSize: 11, fontWeight: '500'}}
                   tickCount={Math.min(data.length, 5)} // Desktop: max 5
                  />

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

          {/* Balance Trend Bar Chart */}
          <div style={{height: 220,marginTop:'20px',marginBottom:'30px'}}>
            <h2>Balance Trend</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedBalance}  margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                <XAxis 
                    dataKey="shortDate" 
                    tickLine={false} 
                    tick={{fontSize: 11, fontWeight: '500'}} 
                    interval="preserveStartEnd" 
                    tickCount={Math.min(balanceData.length, 3)} // Mobile: max 3
                  />

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