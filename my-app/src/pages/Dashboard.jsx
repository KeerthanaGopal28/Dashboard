// Dashboard.jsx
import Cards from '../components/Cards.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
import TimeChart from '../components/Timechart.jsx';
import '../styles/Charts.css';
import '../styles/Cards.css';

function Dashboard() {
  return (
    <div>
      <Cards />
      <div className="charts-grid">
        <div className="chart-container">
          <CategoryChart />
        </div>
        <div className="chart-container time-chart">
          <TimeChart />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;