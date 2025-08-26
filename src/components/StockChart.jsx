"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No price data available for charting.
      </div>
    );
  }

  const data = {
    labels: prices.map((p) => new Date(p.date).toLocaleDateString()),
    datasets: [
      {
        label: "Stock Price",
        data: prices.map((p) => p.close),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Price Movement",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += 'Rs. ' + context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          callback: function(value, index, ticks) {
            return 'Rs. ' + value;
          }
        }
      },
    },
  };

  return (
    <div className="relative h-64 sm:h-80 md:h-96 w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;
