import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import instance from '../../../utils/Axiox';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TestChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/booking-sts/', {
          params: { month, year }
        });
        const data = response.data;

        // Extract and organize data
        const labels = Array.from(new Set([
          ...data.confirmed.map(d => d.check_in),
          ...data.upcoming.map(d => d.check_in),
          ...data.canceled.map(d => d.check_in),
        ])).sort();

        const confirmedData = labels.map(date => {
          const entry = data.confirmed.find(d => d.check_in === date);
          return entry ? entry.total : 0;
        });

        const upcomingData = labels.map(date => {
          const entry = data.upcoming.find(d => d.check_in === date);
          return entry ? entry.total : 0;
        });

        const canceledData = labels.map(date => {
          const entry = data.canceled.find(d => d.check_in === date);
          return entry ? entry.total : 0;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Confirmed',
              data: confirmedData,
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'green',
              borderWidth: 1,
            },
            {
              label: 'Upcoming',
              data: upcomingData,
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              borderColor: 'blue',
              borderWidth: 1,
            },
            {
              label: 'Canceled',
              data: canceledData,
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              borderColor: 'red',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching booking stats:', error);
      }
    };
    fetchData();
  }, [month, year]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookings Per Day',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset;
            const dataIndex = tooltipItem.dataIndex;
            return `${dataset.label}: ${tooltipItem.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Bookings',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row">
        <label className="mb-2 sm:mb-0">
          Month:
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            min="1"
            max="12"
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="ml-0 sm:ml-4">
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="2000"
            max={new Date().getFullYear()}
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div>
      <div className="w-full max-w-full md:max-w-4xl mx-auto p-2">
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default TestChart;
