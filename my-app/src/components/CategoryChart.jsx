import React from 'react';
import{ PieChart,Pie,Tooltip,Cell} from 'recharts';
import { transactions_data } from '../data/data.js';
import { getCategoryData } from '../data/data.js';

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

const CategoryChart = () => {
  const data = getCategoryData(transactions_data);
  return (
    <div>
       <h2>Spending Breakdown</h2>
       <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label={({name}) => name} labelLine={false}>
            {data.map((entry ,index)=> (
                <Cell key={index} fill={COLORS[index%COLORS.length]}/>
            ))}
        </Pie>
        <Tooltip contentStyle={{backgroundColor: "#333",borderRadius: "8px",color: "#fff"}}/>
       </PieChart>
    </div>
  )
}

export default CategoryChart
