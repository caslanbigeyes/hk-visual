import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NetworkCard = ({ title, dailyData, yesterdayData }) => {
  const [activeData, setActiveData] = useState('daily');

  const data = {
    labels: activeData === 'daily' ? dailyData.map(loc => loc.name) : yesterdayData.map(loc => loc.name),
    datasets: [
      {
        label: '活跃度',
        data: activeData === 'daily' ? dailyData.map(loc => loc.value) : yesterdayData.map(loc => loc.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '网点活跃度排名（前10）',
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="bg-teal-700 p-2 rounded-full">
          <img src="/network-icon.svg" alt="Network Icon" className="w-6 h-6" />
        </div>
        <h2 className="ml-4 text-white text-xl">{title}</h2>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className={`px-4 py-2 rounded-lg ${activeData === 'daily' ? 'bg-teal-800 text-white' : 'bg-teal-600 text-teal-200'}`}
          onClick={() => setActiveData('daily')}
        >
          每日新增设备
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeData === 'yesterday' ? 'bg-teal-800 text-white' : 'bg-teal-600 text-teal-200'}`}
          onClick={() => setActiveData('yesterday')}
        >
          昨日新增设备
        </button>
      </div>
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default NetworkCard;