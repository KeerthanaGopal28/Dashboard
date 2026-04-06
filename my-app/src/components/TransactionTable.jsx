import React from 'react'
import {transactions_data} from '../data/data.js';
import search_img from '../assets/search.png';
import EmptyState from './EmptyState.jsx';
import '../styles/TransactionTable.css';

const TransactionTable = ({role}) => {
  const data = transactions_data;
  const [transactions,setTransactions] = React.useState(data);
  const [search,setSearch] = React.useState('');
  const [typeFilter,setTypeFilter] = React.useState('All');
  //const [sortBy,setSortBy] = React.useState('date');
  const [formData,setFormData] = React.useState({date:'',amount:'',category:'',type:'expense'});
  const [editId,setEditId] = React.useState(null);

  const filteredTransactions = transactions.filter((t) => {
       const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
       const matchesType = typeFilter === 'All' || t.type === typeFilter;
       return matchesSearch && matchesType;
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.amount || !formData.category || !formData.type) {
      alert("Please fill all fields");
      return;
    }
    if(editId){
      const updated = transactions.map((t) => t.id === editId ? {...t,...formData} : t);
      setTransactions(updated);
      setEditId(null);
    } else{
      const newTransaction = {
           ...formData,
           id: Date.now(),
           amount: Number(formData.amount)
      };
      setTransactions([...transactions,newTransaction]);
    }
      setFormData({date:'',amount:'',category:'',type:'expense'});
  };
  
  const handleEdit = (t) => {
    setFormData(t);
    setEditId(t.id);
  };

  return (
    <div className='transactions'>
      <div className='search-bar'>
        <img src={search_img} alt='search' className='search-icon'/>
        <input type='text' 
               placeholder='Search transactions...' 
               className='search-input' 
               value={search} 
               onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value='All'>All</option>
          <option value='income'>Income</option>
          <option value='expense'>Expenses</option>
        </select>

        {role === "admin" && (<form onSubmit={handleSubmit} className='transaction-form'>
          <input type="date" name="date" value={formData.date} onChange={handleChange}/>
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange}/>
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange}/>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button type="submit">{editId?"Update":"Add"}</button>
        </form>)}
      </div>
      <div className='transactions-list-div'>
      <table className='transaction-list'>
        <thead>
            <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && (<th>Edit</th>)}
            </tr>
        </thead>
        <tbody>
         {filteredTransactions.length === 0 ? (
          <tr>
            <td colSpan={role === "admin" ? 5 : 4} style={{textAlign:'center'}}><EmptyState message="No transactions yet." /></td>
          </tr>
         ) : (
        filteredTransactions.map((t) => (

           <tr key={t.id}>
              <td>{t.date}</td>
              <td className={`amount-${t.type}`}>{t.amount}</td>
              <td>{t.category}</td>
               <td><span className={`type-badge type-${t.type}`}>{t.type}</span></td>
              {role === "admin" && (
              <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>
              </td>
          )}
          </tr>
        ))
      )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default TransactionTable
