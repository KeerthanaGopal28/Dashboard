import React, { useMemo, useEffect, useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { transactions_data } from '../data/data.js';
import EmptyState from './EmptyState.jsx';
import '../styles/Insights.css';

const Insights = () => {
  const [bestMonth, setBestMonth] = useState(null);

  // ✅ FIXED: useMemo prevents re-computation on every render
  const summary = useMemo(() => {
    let income = 0, expense = 0;
    transactions_data.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  }, []);

  const { maxCategory, maxAmount } = useMemo(() => {
    const expenseTransactions = transactions_data.filter(t => t.type === "expense");
    const categoryTotals = {};
    expenseTransactions.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    let maxCat = "", maxAmt = 0;
    for (let cat in categoryTotals) {
      if (categoryTotals[cat] > maxAmt) {
        maxAmt = categoryTotals[cat];
        maxCat = cat;
      }
    }
    return { maxCategory: maxCat, maxAmount: maxAmt };
  }, []);

  const monthlyData = useMemo(() => {
    const monthly = {};
    transactions_data.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!monthly[month]) monthly[month] = { income: 0, expense: 0, balance: 0 };
      monthly[month][t.type] += t.amount;
      monthly[month].balance = monthly[month].income - monthly[month].expense;
    });
    return monthly;
  }, []);

  // ✅ FIXED: Proper dependency array
  const trendData = useMemo(() => {
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: month.slice(-2),
        balance: data.balance,
        savingsRate: data.income > 0 ? ((data.balance / data.income) * 100).toFixed(1) : 0
      }));
  }, [monthlyData]);

  // ✅ FIXED: Stable dependency
  useEffect(() => {
    const best = Object.entries(monthlyData).reduce((best, [month, data]) => 
      data.balance > (best?.[1]?.balance || -Infinity) ? [month, data] : best, null
    );
    setBestMonth(best);
  }, [monthlyData]);

  const pieData = useMemo(() => {
    const categoryTotals = {};
    transactions_data.filter(t => t.type === "expense").forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    return Object.entries(categoryTotals).map(([name, value], i) => ({
      name,
      value: Math.round(value),
      fill: `hsl(${i * 60}, 70%, 60%)`
    }));
  }, []);

  const pattern = useMemo(() => {
    const recent = transactions_data.slice(-10);
    const avgAmount = recent.length > 0 ? recent.reduce((sum, t) => sum + t.amount, 0) / recent.length : 0;
    const impulseCount = recent.filter(t => t.amount > avgAmount * 1.5).length;
    return { avgAmount: Math.round(avgAmount), impulseCount };
  }, []);

  const savingsGoal = 50000;
  const goalProgress = Math.min((summary.balance / savingsGoal) * 100, 100);

  if (transactions_data.length === 0) {
    return (
      <div className="insights-container">
        <div className="insights-card">
          <EmptyState message="No transactions yet. Add one to see insights." />
        </div>
      </div>
    );
  }

  return (
    <div className="insights-container">
      {/* Balance Card */}
      <div className="insights-card balance-card">
        <div className="card-header">
          <div className="card-icon">💰</div>
          <h3 className="card-title">Total Balance</h3>
        </div>
        <div className="insight-number balance-number">₹{summary.balance.toLocaleString()}</div>
        <p className="insight-label">
          Income: ₹{summary.income.toLocaleString()} | Expense: ₹{summary.expense.toLocaleString()}
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{'--progress-width': `${goalProgress}%`}} />
        </div>
      </div>

      {/* Top Spending */}
      <div className="insights-card spending-card">
        <div className="card-header">
          <div className="card-icon">🔥</div>
          <h3 className="card-title">Top Spending</h3>
        </div>
        <div className="insight-number spending-number">₹{maxAmount.toLocaleString()}</div>
        <p className="insight-label">{maxCategory}</p>
      </div>

      {/* Best Month */}
      <div className="insights-card monthly-card">
        <div className="card-header">
          <div className="card-icon">🏆</div>
          <h3 className="card-title">Best Month</h3>
        </div>
        {bestMonth ? (
          <>
            <div className="insight-number" style={{color: '#10b981'}}>{bestMonth[0]}</div>
            <p className="insight-label">+₹{bestMonth[1].balance.toLocaleString()}</p>
          </>
        ) : (
          <p className="insight-label">No profitable months</p>
        )}
      </div>

      {/* NEW: Pie Chart */}
      <div className="insights-card">
        <div className="card-header">
          <div className="card-icon">🧀</div>
          <h3 className="card-title">Expense Breakdown</h3>
        </div>
        <div style={{width: '100%', height: 250}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW: Bar Chart */}
      <div className="insights-card">
        <div className="card-header">
          <div className="card-icon">📈</div>
          <h3 className="card-title">Savings Trend</h3>
        </div>
        <div style={{width: '100%', height: 250}}>
          <ResponsiveContainer>
            <BarChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="balance" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NEW: Goal Tracker */}
      <div className="insights-card">
        <div className="card-header">
          <div className="card-icon">🎯</div>
          <h3 className="card-title">₹50K Goal</h3>
        </div>
        <div className="insight-number" style={{color: '#f59e0b'}}>
          {goalProgress.toFixed(0)}%
        </div>
        <p className="insight-label">₹{summary.balance.toLocaleString()}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{'--progress-width': `${goalProgress}%`}} />
        </div>
      </div>

      {/* NEW: Spending IQ */}
      <div className="insights-card">
        <div className="card-header">
          <div className="card-icon">🧠</div>
          <h3 className="card-title">Spending IQ</h3>
        </div>
        <div className="insight-number" style={{color: pattern.impulseCount > 3 ? '#ef4444' : '#10b981'}}>
          {pattern.impulseCount}
        </div>
        <p className="insight-label">Impulse buys (last 10)</p>
        <p className="insight-label">Avg: ₹{pattern.avgAmount.toLocaleString()}</p>
      </div>

      {/* Monthly List */}
      <div className="insights-card" style={{gridColumn: '1 / -1'}}>
        <div className="card-header">
          <div className="card-icon">📊</div>
          <h3 className="card-title">Monthly Performance</h3>
        </div>
        <div className="monthly-list">
          {Object.entries(monthlyData)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([month, data]) => (
              <div key={month} className={`monthly-item ${bestMonth?.[0] === month ? 'best' : ''}`}>
                <span className="monthly-label">{month}</span>
                <div className="monthly-numbers">
                  <span className="monthly-income">+₹{data.income.toLocaleString()}</span>
                  <span className="monthly-expense">-₹{data.expense.toLocaleString()}</span>
                  <span>₹{data.balance.toLocaleString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;