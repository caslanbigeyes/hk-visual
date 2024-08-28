import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-xl mb-4">实时充电订单</h2>
      <div className="overflow-y-auto max-h-64">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <img src={order.userImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
              <p className="text-white">{order.user}</p>
            </div>
            <p className="text-gray-400">{order.location}</p>
            <p className="text-gray-400">{order.startTime}</p>
            <p className="text-gray-400">{order.endTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;