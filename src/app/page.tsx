'use client';
import React from 'react';
import UserCard from '@/components/UserCard';
import EquipmentCard from '@/components/EquipmentCard';
import OrderList from '@/components/OrderList';
import NetworkCard from '@/components/NetworkCard';
import ChargingCard from '@/components/ChargingCard';
import AppUsageCard from '@/components/AppUsageCard';

const Home = () => {
  const mockData = {
    user: {
      title: '用户',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '16K',
      dailyStatChange: '↑ 11.94%',
    },
    equipment: {
      title: '设备',
      onlineCount: '1,600',
      offlineCount: '0',
      chargingCount: '1,600',
      idleCount: '160',
      dailyStat: '1,600',
      dailyStatChange: '↑ 11.94%',
    },
    orders: [
      { user: '123****1234', userImage: '/user1.png', location: '湖南省长沙市', startTime: '2034/03/27 17:57', endTime: '2034/03/27 17:57' },
      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },
      // 更多订单数据...
    ],
    network: {
      title: '网点',
      dailyData: [
        { name: '湖南省长沙市', value: 1600 },
        { name: '山东省济南市', value: 1500 },
        // 更多网点数据...
      ],
      yesterdayData: [
        { name: '湖南省长沙市', value: 1400 },
        { name: '山东省济南市', value: 1300 },
        // 更多网点数据...
      ],
    },
    charging: {
      title: '充电',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '1,600',
      dailyStatChange: '↑ 11.94%',
    },
    appUsage: {
      title: 'App 使用情况',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '16K',
      dailyStatChange: '↑ 11.94%',
    },
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="grid grid-cols-3 gap-4">
        <UserCard {...mockData.user} />

        <NetworkCard {...mockData.network} />
        <EquipmentCard {...mockData.equipment} />
        <ChargingCard {...mockData.charging} />
        <OrderList orders={mockData.orders} />
        <AppUsageCard {...mockData.appUsage} />
      </div>
    </div>
  );
};

export default Home;