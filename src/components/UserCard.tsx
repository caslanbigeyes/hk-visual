import React from 'react';
import CustomImage from '@/components/CustomImage';
import CustomLineChart from '@/components/CustomLineChart';
import CountUp from 'react-countup';
import { hexToRgba, formatCount } from '@/util';


const UserCard = ({ title, todayCount, totalCount, dailyStat, dailyStatChange }) => {
  const totalData = Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => i.count) || [];
  const data = {
    labels: Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => {
      const date = new Date(i.dateDay);
      const day = date.getDate().toString(); // 获取日期的日部分并转换为字符串
      return day
    }) || [],
    datasets: [
      {
        label: '每日新增用户数',
        data: totalData,
        borderColor: '#F19CFF',
        backgroundColor: hexToRgba('#F19CFF', 0.1),
        fill: true,
        tension: 0.4,
        url: '/arrowTop.png'
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

  return (
    <div className="p-6 h-[456px] bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center">
        <div className="p-2 pl-0">
          <CustomImage src="/userIcon.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className="bold text-white text-xl">{title}</h2>
      </div>
      <div className="mt-4 flex">
        <div className='flex flex-col w-1/2'>
          <p className="font-normal text-xl text-[#A3A3A3] whitespace-nowrap">今日新增用户数</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(todayCount)} /> {todayCount > 1000 ? <span>{'K'}</span> : null}
          </p>
        </div>

        <div className='w-1/2'>
          <p className="font-normal text-xl text-[#A3A3A3]">总用户数</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16 inline">
            <CountUp start={0} end={formatCount(totalCount, 'total')} /> {totalCount > 10000000 ? <span>{'K'}</span> : null}
          </p>
        </div>
      </div>
      <div className="mt-2"></div>
      <div className="flex align-center mt-4 bg-purple-800 p-2 rounded-lg w-[200px] justify-center rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] font-normal text-xl text-[#FFFFFF]">
        每日新增用户统计
      </div>

      <div className='flex w-[400px] mt-[20px]'>
        <CustomLineChart todayCount={totalData[totalData?.length - 1]} data={data} options={options} />
      </div>
    </div>
  );
};

export default UserCard;