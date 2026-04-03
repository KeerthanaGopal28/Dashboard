import React from 'react';
import {transactions} from '../data/data.js';


const Cards = () => {
    const income = transactions
                .filter(t => t.type === 'income')
                .reduce((total,t) => total + t.amount, 0)
    const expense = transactions
                .filter(t => t.type === 'expense')
                .reduce((total,t) => total + t.amount, 0)
    const balance = income-expense

  return (
    <div>
       <div className="cards">
        <div className='balance'>
            <h3>Total Balance</h3>
            <p>{balance}</p>
        </div>
        <div className='income'>
            <h3>Income</h3>
            <p>{income}</p>
        </div>
        <div className='expenses'>
            <h3>Expense</h3>
            <p>{expense}</p>
        </div>
       </div>
    </div>
  )
}

export default Cards
