import React, { useState } from 'react';

const NetworkCard = ({ title, dailyData, dailyState, dailyStatChange, yesterdayData }) => {
  const [activeData, setActiveData] = useState('daily');

  const data = activeData === 'daily' ? dailyData : yesterdayData;

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
        {data.map((loc, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div className="flex items-center w-1/3">
              <span className="text-white mr-2">{index + 1}</span>
              <span className="text-white">{loc.name}</span>
            </div>
            <div className="w-2/3 bg-teal-600 h-4 rounded-lg overflow-hidden">
              <div className="bg-teal-400 h-4" style={{ width: `${(loc.value / 1600) * 100}%` }}></div>
            </div>
            <span className="text-teal-200 ml-2">{loc.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-blue-800 p-2 rounded-lg">
        <p className="text-white text-xl">{dailyState}</p>
        <p className="text-green-400">{dailyStatChange}</p>
      </div>
    </div>
  );
};

export default NetworkCard;