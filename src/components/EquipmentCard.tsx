import React from 'react';

const EquipmentCard = ({ title, onlineCount, offlineCount, chargingCount, idleCount, dailyStat, dailyStatChange }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="bg-blue-700 p-2 rounded-full">
          <img src="/equipment-icon.svg" alt="Equipment Icon" className="w-6 h-6" />
        </div>
        <h2 className="ml-4 text-white text-xl">{title}</h2>
      </div>
      <div className="mt-4">
        <p className="text-white text-3xl">{onlineCount}</p>
        <p className="text-blue-200">在线设备</p>
      </div>
      <div className="mt-2">
        <p className="text-white text-3xl">{offlineCount}</p>
        <p className="text-blue-200">离线设备</p>
      </div>
      <div className="mt-2">
        <p className="text-white text-3xl">{chargingCount}</p>
        <p className="text-blue-200">充电中设备</p>
      </div>
      <div className="mt-2">
        <p className="text-white text-3xl">{idleCount}</p>
        <p className="text-blue-200">空闲设备</p>
      </div>
      <div className="mt-4 bg-blue-800 p-2 rounded-lg">
        <p className="text-white text-xl">{dailyStat}</p>
        <p className="text-green-400">{dailyStatChange}</p>
      </div>
    </div>
  );
};

export default EquipmentCard;