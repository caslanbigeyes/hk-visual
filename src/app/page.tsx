'use client';
import React, { useEffect } from 'react';
import UserCard from '@/components/UserCard';
import EquipmentCard from '@/components/EquipmentCard';
import OrderList from '@/components/OrderList';
import NetworkCard from '@/components/NetworkCard';
import ChargingCard from '@/components/ChargingCard';
import AppUsageCard from '@/components/AppUsageCard';
import CustomImage from '@/components/CustomImage';

const Home = () => {


  useEffect(() => {
    // 1分钟调用一次接口 fetch
    const intervalId = setInterval(() => {
      fetch('/api/screen/detaile', {
        'x-client': '1'
      }
      ).then(res => res.json()).then(data => {
        console.log(data)
      })
    }, 60000);
  }, [])

  const mockData = {
    user: {
      title: '用户',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '16K',
      dailyStatChange: '11.94%',
    },
    equipment: {
      title: '设备',
      onlineCount: '1,600',
      offlineCount: '0',
      chargingCount: '1,600',
      idleCount: '160',
      dailyStat: '1,600',
      dailyStatChange: '11.94%',
    },
    orders: [
      { user: '123****1234', userImage: '/user1.png', location: '湖南省长沙市', startTime: '2034/03/27 17:57', endTime: '2034/03/27 17:57' },
      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },
      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

      { user: '123****1234', userImage: '/user2.png', location: '山东省济南市', startTime: '2035/05/14 07:16', endTime: '2035/05/14 07:16' },

    ],
    network: {
      title: '网点',
      dailyState: '1600',
      dailyStatChange: '18%',
      dailyData: [
        { name: '湖南省长沙市', value: 1600 },
        { name: '山东省济南市', value: 1500 },
        { name: '云南省昆明市', value: 1400 },
        { name: '湖北省武汉市', value: 1300 },
        { name: '山西省太原市', value: 1200 },
        { name: '福建省福州市', value: 1100 },
        { name: '浙江省杭州市', value: 1000 },
        { name: '江苏省南京市', value: 900 },
        { name: '广东省广州市', value: 800 },
        { name: '北京市', value: 700 },
      ],
      yesterdayData: [
        { name: '湖南省长沙市', value: 1400 },
        { name: '山东省济南市', value: 1300 },
        { name: '云南省昆明市', value: 1200 },
        { name: '湖北省武汉市', value: 1100 },
        { name: '山西省太原市', value: 1000 },
        { name: '福建省福州市', value: 900 },
        { name: '浙江省杭州市', value: 800 },
        { name: '江苏省南京市', value: 700 },
        { name: '广东省广州市', value: 600 },
        { name: '北京市', value: 500 },
      ],
    },
    charging: {
      title: '充电',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '1,600',
      dailyStatChange: '11.94%',
    },
    appUsage: {
      title: 'App 使用情况',
      todayCount: '1,600',
      totalCount: '160K',
      dailyStat: '16K',
      dailyStatChange: '11.94%',
    },
  };

  return (
    <div className="bg-gray-900 min-h-screen min-w-screen w-full p-8 bg-custom-bg">
      <div className="grid grid-cols-1 lg:grid-cols-[463px_841px_463px] gap-6">
        <div className="flex flex-col gap-6">
          <UserCard {...mockData.user} />
          <ChargingCard {...mockData.charging} />
        </div>

        <div className="flex flex-col gap-6">
          <div className=' p-6 w-full h-[84px] bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]  flex items-center'>
            <div className='flex-1 flex justify-start'>
              <CustomImage src="/hello.png" width={83} height={16} alt="App Icon" />
            </div>
            <div className='flex-1 flex justify-center'>
              <CustomImage src="/title.png" width={90} height={45} alt="App Icon" />
            </div>
            <div className='flex-1 flex justify-center'>
              <div className='font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-xl text-[#B5B9DD]'>2024/08/20</div>
            </div>
          </div>
          <NetworkCard {...mockData.network} />
          <OrderList orders={mockData.orders} />
        </div>

        <div className="flex flex-col gap-6">
          <EquipmentCard {...mockData.equipment} />
          <AppUsageCard {...mockData.appUsage} />
        </div>
      </div>
    </div>
  );
};

export default Home;