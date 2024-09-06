import React, { useState } from 'react';
import CustomLineChart from '@/components/CustomLineChart'
import CustomImage from '@/components/CustomImage';
import CountUp from 'react-countup';
import { hexToRgba, formatCount } from '@/util';


const ChargingCard = ({ title, chargeCount, chargeTotalcount, chargePayCount, chargePayTotalcount, dailyStat, dailyStatChange }) => {
  const [activeButton, setActiveButton] = useState('chargeCount');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const data = {
    labels: Array.isArray(dailyStat) && dailyStat.length ? dailyStat.map(i => {
      const date = new Date(i.dateDay);
      const day = date.getDate().toString(); // 获取日期的日部分并转换为字符串
      return day;
    }) : [],
    datasets: [
      {
        label: activeButton === 'income' ? '总充电次数' : activeButton === 'chargeCount' ? '每日广告充电次数' : '每日付费充电次数',
        data: Array.isArray(dailyStat) && dailyStat.length ? dailyStat.map(i => i[activeButton]) : [],
        borderColor: '#1CB362',
        backgroundColor: hexToRgba('#1CB362', 0.1),
        fill: true,
        tension: 0.4,
        url: '/4.png'
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
    <div className="p-6 h-[552px]  bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center">
        <div className="p-2 pl-0">
          <CustomImage src="/charge.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className=" text-white text-xl">{title}</h2>
      </div>


      <div className='flex justify-center items-center'>
        <div className="w-1/2">
          <div className="mt-4">
            <p className="font-normal text-xl text-[#A3A3A3]">今日广告充电</p>
            <p className="font-bold text-[40px] text-[rgb(255,255,255)]  max-w-16">
              <CountUp start={0} end={formatCount(Number(chargeCount))} />
            </p>
          </div>
        </div>

        <div className="mt-4 w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">总充电次数</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16">
            <CountUp start={0} end={formatCount(Number(chargeTotalcount), 'total')} />
          </p>
        </div>
      </div>

      <div className="flex items-center mt-4 ">
        <div className="p-2 pl-0">
          <CustomImage src="/onlineChange.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className=" text-white text-xl">付费充电</h2>
      </div>


      <div className='flex justify-center items-center'>
        <div className="w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">今日充电收益</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16">
            <CountUp start={0} end={formatCount(Number(chargePayCount), 'total')} />
          </p>
        </div>

        <div className="w-1/2">
          <p className="font-normal text-xl text-[#A3A3A3]">总充电收益</p>
          <p className="font-bold text-[40px] text-[#FFFFFF]  max-w-16">
            <CountUp start={0} end={formatCount(Number(chargePayTotalcount), 'total')} />
          </p>
        </div>
      </div>



      <div className='flex'>
        <button
          className={`flex items-center justify-center mt-4 p-3 h-[40px] text-[#fff] ${activeButton === 'chargeCount' ? 'bg-[#1CB362]' : 'bg-[#3C4050]'} rounded-[10px]`}
          onClick={() => handleButtonClick('chargeCount')}
        >
          每日广告充电
        </button>
        <button
          className={`flex items-center justify-center mt-4 ml-4 p-3 h-[40px] text-[#fff] ${activeButton === 'incomeCount' ? 'bg-[#1CB362]' : 'bg-[#3C4050]'} rounded-[10px]`}
          onClick={() => handleButtonClick('incomeCount')}
        >
          每日付费充电
        </button>
        <button
          className={`flex items-center justify-center mt-4 ml-4 p-3 h-[40px] text-[#fff] ${activeButton === 'income' ? 'bg-[#1CB362]' : 'bg-[#3C4050]'} rounded-[10px]`}
          onClick={() => handleButtonClick('income')}
        >
          总充电
        </button>
      </div>



      <div className='flex w-[400px] mt-[20px]'>
        <CustomLineChart parentHeight={140} data={data} todayCount={dailyStat?.length && dailyStat.map(i => i[activeButton])[0]} options={options} />
      </div>

    </div>
  );
};

export default ChargingCard;