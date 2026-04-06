import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { transactions_data } from '../data/data.js';

const INCOME_COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#FF5722"];

const IncomeDonut = () => {
  const incomeDataRaw = transactions_data.filter(t => t.type === 'income');
  const incomeData = incomeDataRaw.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  
  const incomePieData = Object.entries(incomeData)
    .map(([name, value]) => ({
      name,
      value: Math.round(value)
    }))
    .sort((a, b) => b.value - a.value);

  const hasIncome = incomePieData.length > 0;

  return (
    <div className='income-donut-wrapper'>
      <div className='income-label'>
        💰 Income
      </div>
      {hasIncome ? (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie 
              data={incomePieData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius="70%"
              innerRadius="45%"
              labelLine={false}
              label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
            >
              {incomePieData.map((entry, index) => (
                <Cell key={`income-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
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
          No income yet
        </div>
      )}
    </div>
  );
};

export default IncomeDonut;