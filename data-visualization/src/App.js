import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Chart from "./Chart";
import "./App.css";
import axios from "axios";

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch the data from the Python backend
    axios.get("http://127.0.0.1:5000/data")
      .then(response => {
        setTableData(response.data.table);
        setChartData(response.data.chart);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Superstore Sales Analysis</h1>
      </header>
      <div className="content">
        <div className="table-section">
          <h2>Sales Data</h2>
          <DataTable data={tableData} />
        </div>
        <div className="chart-section">
          <h2>Sales Trends</h2>
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default App;
