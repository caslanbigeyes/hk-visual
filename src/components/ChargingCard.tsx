import React from 'react';

const ChargingCard = ({ title, todayCount, totalCount, dailyStat, dailyStatChange }) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="bg-green-700 p-2 rounded-full">
          <img src="/charging-icon.svg" alt="Charging Icon" className="w-6 h-6" />
        </div>
        <h2 className="ml-4 text-white text-xl">{title}</h2>
      </div>
      <div className="mt-4">
        <p className="text-white text-3xl">{todayCount}</p>
        <p className="text-green-200">今日广告充电</p>
      </div>
      <div className="mt-2">
        <p className="text-white text-3xl">{totalCount}</p>
        <p className="text-green-200">总充电次数</p>
      </div>
      <div className="mt-4 bg-green-800 p-2 rounded-lg">
        <p className="text-white text-xl">{dailyStat}</p>
        <p className="text-green-400">{dailyStatChange}</p>
      </div>
    </div>
  );
};

export default ChargingCard;