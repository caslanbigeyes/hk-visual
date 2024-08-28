import React from 'react';

const AppUsageCard = ({ title, todayCount, totalCount, dailyStat, dailyStatChange }) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="bg-orange-700 p-2 rounded-full">
          <img src="/app-icon.svg" alt="App Icon" className="w-6 h-6" />
        </div>
        <h2 className="ml-4 text-white text-xl">{title}</h2>
      </div>
      <div className="mt-4">
        <p className="text-white text-3xl">{todayCount}</p>
        <p className="text-orange-200">今日新增打开次数</p>
      </div>
      <div className="mt-2">
        <p className="text-white text-3xl">{totalCount}</p>
        <p className="text-orange-200">总打开次数</p>
      </div>
      <div className="mt-4 bg-orange-800 p-2 rounded-lg">
        <p className="text-white text-xl">{dailyStat}</p>
        <p className="text-green-400">{dailyStatChange}</p>
      </div>
    </div>
  );
};

export default AppUsageCard;