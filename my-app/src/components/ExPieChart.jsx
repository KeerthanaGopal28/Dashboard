import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { transactions_data } from '../data/data.js';
import { getCategoryData } from '../data/data.js';

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

const ExPieChart   = () => {
  const expenseData = getCategoryData(transactions_data.filter(t => t.type === 'expense'));
  const hasExpenses = expenseData.length > 0;

  return (
    <div className='expense-pie-wrapper'>
      <div className='expense-label'>
        💸 Expenses
      </div>
      {hasExpenses ? (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie 
              data={expenseData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius="70%"
              labelLine={false}
              label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`expense-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "10px",
                border: "none",
                color: "#fff"
              }}
              formatter={(value, name) => [`₹${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="empty-state">
          No expenses yet
        </div>
      )}
    </div>
  );
};

export default ExPieChart;