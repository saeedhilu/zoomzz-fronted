import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import instance from '../../../utils/Axiox';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

        setChartData({
          labels: data.map(reservation => reservation.check_in),
          datasets: [
            {
              label: `${data.length} Bookings `,
              data: data.map(reservation => reservation.total_guest),
              fill: false,
              backgroundColor: '#3e3e3e',
              borderColor: '#3e3e3e',
              borderWidth: 3, 
              pointRadius: 5,
              roomNames: data.map(reservation => reservation.room_name),
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
            const roomName = dataset.roomNames[dataIndex]; // Access room name
            return `Room: ${roomName} `;
          }
        }
      }
    },
    scales: {
      y: {
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
      <div className="mb-4">
        <label>
          Month:
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            min="1"
            max="12"
          />
        </label>
        <label className="ml-4">
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="2000"
            max={new Date().getFullYear()}
          />
        </label>
      </div>
      <div className="w-full md:w-1/2 h-64"> {/* Adjust the width and height here */}
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default TestChart;
