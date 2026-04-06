import React from 'react';
import {transactions_data} from '../data/data.js';
import money from '../assets/money.png';


const Cards = () => {
    const income = transactions_data    
                .filter(t => t.type === 'income')
                .reduce((total,t) => total + t.amount, 0)
    const expense = transactions_data
                .filter(t => t.type === 'expense')
                .reduce((total,t) => total + t.amount, 0)
    const balance = income-expense

  return (
    <div>
       {transactions_data.length === 0 ? (
          <div className="cards">
        <div className='balance'>
            <h3>Total Balance</h3>
            <p> -- </p>
        </div>
        <div className='income'>
            <h3>Income</h3>
            <p> -- </p>
        </div>
        <div className='expenses'>
            <h3>Expense</h3>
            <p> -- </p>
        </div>
       </div>
       ) : (
       <div className="cards">
        <div className='balance'>
            <h3>Total Balance</h3>
            <p>₹{balance} 💵</p>
        </div>
        <div className='income'>
            <h3>Income</h3>
            <p>₹{income} 📈</p>
        </div>
        <div className='expenses'>
            <h3>Expense</h3>
            <p>₹{expense} 📉</p>
        </div>
       </div>
       )};
    </div>
)
};

export default Cards
