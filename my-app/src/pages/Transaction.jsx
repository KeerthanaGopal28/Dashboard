import React from 'react'
import TransactionTable from '../components/TransactionTable.jsx';
import { useOutletContext } from "react-router-dom";

const Transaction = () => {
    const { role } = useOutletContext();
  return (
    <div>
      <TransactionTable role={role}/>
    </div>
  )
}

export default Transaction
