import React from 'react';
import EmptyState from './EmptyState.jsx';
import ExPieChart from './ExPieChart.jsx';
import IncomeDonut from './IncomeDonut.jsx';
import { transactions_data } from '../data/data.js';

const CategoryChart = () => {
  const hasData = transactions_data.length > 0;

  return (
    <div className='category-chart-container'>
      <h2>Spending & Income Breakdown</h2>
      
      {transactions_data.length === 0 ? (
        <EmptyState message="No transactions yet." />
      ) : (
        <div className='charts-grid'>
          <ExPieChart />
          <IncomeDonut />
        </div>
      )}
    </div>
  );
};

export default CategoryChart;