// src/components/layout/admin/BookingStatusChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axios from 'axios';
import instance from '../../../utils/Axiox';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const BookingStatusChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/booking-status-chart/');
        const data = response.data;

        setChartData({
          labels: ['Pending', 'Confirmed', 'Canceled'],
          datasets: [
            {
              data: [
                data['Pending'],
                data['Confirmed'],
                data['Canceled'],
              ],
              backgroundColor: ['#f39c12', '#27ae60', '#e74c3c'],
              borderColor: ['#f39c12', '#27ae60', '#e74c3c'],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching booking status data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full md:w-1/3 h-64">
      <Pie data={chartData} />
    </div>
  );
};

export default BookingStatusChart;
