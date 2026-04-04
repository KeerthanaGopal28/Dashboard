import Header from './components/Header.jsx';
import Cards from './components/Cards.jsx';
import TimeChart from './components/Timechart.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import TransactionTable from './components/TransactionTable.jsx';

function App() {
  return (
    <>
      <Header/>
      <div className='first-row'>
        <Cards/>
        <TimeChart/>
        <CategoryChart/>
      </div>
      <TransactionTable/>         
    </>
  )
}

export default App
