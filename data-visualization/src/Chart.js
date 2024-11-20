import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  if (!data) return <p>Loading chart...</p>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Sales Trend",
        data: data.values,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
