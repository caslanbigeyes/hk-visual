import React from 'react';
import CustomImage from '@/components/CustomImage';
import CustomLineChart from '@/components/CustomLineChart'
import CountUp from 'react-countup';

const AppUsageCard = ({ title, todayCount, totalCount, dailyStat, dailyStatChange }) => {
  console.log(dailyStat, 'dailyStat')
  const convertTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10) * 1000); // 将秒转换为毫秒
    return date.toLocaleString(); // 使用本地时间格式
  };
  const data = {
    labels: dailyStat.length ? dailyStat.map(i => i.dateDay) : [],
    datasets: [
      {
        label: '每日新增用户数',
        data: dailyStat.length ? dailyStat.map(i => i.count) : [],
        borderColor: '#106AF1',
        backgroundColor: 'rgba(155, 93, 229, 0.2)',
        fill: true,
        tension: 0.4,
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
    <div className="p-6  h-[456px] bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center justify-items-start">
        <div className="p-2 pl-0">
          <CustomImage src="/AppUser.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className=" text-white text-xl">{title}</h2>
      </div>


      <div className='flex justify-center items-center'>
        <div className="mt-4 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">今日新增打开次数</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16">
            <CountUp start={0} end={Number(todayCount)} />
          </p>
        </div>
        <div className="mt-4 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">总打开次数</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16">
            <CountUp start={0} end={Number(totalCount)} />
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center w-[160px] h-[40px] bg-[#F19A18] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] ">
        <button
        >
          每日打开次数
        </button>
      </div>

      <div className='flex w-[400px] mt-[20px]'>
        <CustomLineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default AppUsageCard;