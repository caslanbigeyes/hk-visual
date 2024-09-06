import React from 'react';
import CustomLineChart from '@/components/CustomLineChart'
import CustomImage from '@/components/CustomImage';
import CountUp from 'react-countup';
import { hexToRgba, formatCount } from '@/util';


const EquipmentCard = ({ title, onlineCount, offlineCount, chargingCount, idleCount, dailyStat, dailyStatChange }) => {
  const data = {
    labels: Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => {
      const date = new Date(i.dateDay);
      const day = date.getDate().toString(); // 获取日期的日部分并转换为字符串
      return day
    }) || [],
    datasets: [
      {
        label: '每日新增设备数',
        data: Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => i.count) || [],
        borderColor: '#106AF1',
        backgroundColor: hexToRgba('#106AF1', 0.1),
        fill: true,
        tension: 0.4,
        url: '/3.png'
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}K`;
          },
          afterLabel: function (context) {
            return `2024.${context.label}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9b5de5',
        },
      },
      y: {
        grid: {
          color: '#555',
        },
        ticks: {
          color: '#9b5de5',
        },
      },
    },
  };

  const onlineCounts = formatCount(onlineCount)
  console.log(onlineCounts, 'onlineCounts')
  return (
    <div className="p-6   h-[552px]    bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center">
        <div className="p-2 pl-0">
          <CustomImage src="/equip.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className=" text-white text-xl">{title}</h2>
      </div>

      <div className='flex justify-center items-center'>
        <div className="mt-4 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">在线设备</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(onlineCount)} />  {onlineCount > 1000 ? <span>{'K'}</span> : null}
          </p>
        </div>
        <div className="mt-4 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">离线设备</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(offlineCount)} /> {offlineCount > 1000 ? <span>{'K'}</span> : null}
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className="mt-2 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">充电中设备</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(chargingCount)} /> {chargingCount > 1000 ? <span>{'K'}</span> : null}
          </p>
        </div>
        <div className="mt-2 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">空闲设备</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(idleCount)} /> {idleCount > 1000 ? <span>{'K'}</span> : null}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center w-[160px] h-[40px] bg-[#106AF1] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] text-[#fff]">
        每日新增设备数
      </div>

      <div className='flex w-[400px] mt-[20px]'>
        <CustomLineChart todayCount={dailyStat?.length && dailyStat[0].count} data={data} options={options} />
      </div>
    </div>
  );
};

export default EquipmentCard;