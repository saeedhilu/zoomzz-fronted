import React, { useState } from 'react';
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

const BookingChartWithControls = ({ apiEndpoint }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [noData, setNoData] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const fetchData = async () => {
    try {
      const response = await instance.get(apiEndpoint, {
        params: { month, year }
      });
      const data = response.data;

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

      const hasData = confirmedData.some(d => d > 0) || 
                      upcomingData.some(d => d > 0) || 
                      canceledData.some(d => d > 0);

      if (hasData) {
        setNoData(false);
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
      } else {
        setNoData(true);
      }

      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      setNoData(true);
      setIsDataFetched(true);
    }
  };

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
      <div className="mb-4 flex flex-col sm:flex-row pl-4 mt-10 ">
        <label className="mb-2 sm:mb-0">
          Month:
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            min="1"
            max="12"
            className="ml-2 mt-1 p-1 border rounded"
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
            className="ml-2 mt-1 p-1 border rounded"
          />
        </label>
        <button
          onClick={fetchData}
          className="ml-0 sm:ml-4 p-2 w-20 rounded-full border  bg-gray-500 text-white">
          Apply
        </button>
      </div>
      <div className="relative w-full max-w-full md:max-w-4xl mx-auto p-2">
        {!isDataFetched ? (
          <div className="absolute inset-0 flex items-center justify-center mt-6">
            <p className="text-xl text-red-500">Please select a month and year, then click "Apply".</p>
          </div>
        ) : noData ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl text-gray-500">No Data Available</p>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </>
  );
};

export default BookingChartWithControls;
