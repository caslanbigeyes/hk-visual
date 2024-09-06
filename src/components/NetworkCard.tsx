import React, { useState, useEffect, useRef } from 'react';
import CustomImage from '@/components/CustomImage';
import CustomLineChart from '@/components/CustomLineChart';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { hexToRgba, formatCount } from '@/util';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const NetworkCard = ({ title, dailyData, dailyStat, dailyStatChange, yesterdayData }) => {
  const [activeData, setActiveData] = useState('daily');
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateContainerDimensions = () => {
    if (containerRef.current) {
      console.log(containerRef.current.offsetWidth,3333)
      setContainerWidth(containerRef.current.offsetWidth);
      const otherElementsHeight = Array.from(containerRef.current.children)
        .reduce((total, child) => total + child.offsetHeight, 0);
      setContainerHeight(containerRef.current.offsetHeight - otherElementsHeight);
    }
  };

  useEffect(() => {
    updateContainerDimensions();
    window.addEventListener('resize', updateContainerDimensions);

    return () => {
      window.removeEventListener('resize', updateContainerDimensions);
    };
  }, []);

  let dataTemp = activeData === 'daily' ? dailyData : yesterdayData;
  let data = {
    labels: Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => {
      const date = new Date(i.dateDay);
      const day = date.getDate().toString(); // 获取日期的日部分并转换为字符串
      return day;
    }) || [],
    datasets: [
      {
        label: '每日新增网点数',
        data: Array.isArray(dailyStat) && dailyStat.length && dailyStat.map(i => i.count) || [],
        borderColor: '#10D3F1',
        backgroundColor: hexToRgba('#10D3F1', 0.1),
        fill: true,
        tension: 0.4,
        url: '/2.png'
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

  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return '/1N.png';
      case 1:
        return '/2N.png';
      case 2:
        return '/3N.png';
      case 3:
        return '/4N.png';
      default:
        return '/5N.png';
    }
  };

  const getBackgroundColorColTwo = (index) => {
    switch (index) {
      case 0:
        return '/6N.png';
      case 1:
        return '/7N.png';
      case 2:
        return '/8N.png';
      case 3:
        return '/9N.png';
      default:
        return '/10N.png';
    }
  };

  return (
    <div ref={containerRef} className="p-6 h-[479px] bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center">
        <div className="p-2 pl-0">
          <CustomImage src="/net.png" width={32} height={32} alt="App Icon" />
        </div>
        <div className='flex justify-between w-full'>
          <h2 className=" text-white text-xl">{title}</h2>
          <h2 className="text-xl text-[#A3A3A3]">网点活跃度排名（前10）</h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          {dataTemp?.slice(0, 5).map((loc, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center w-1/2">
                <CustomImage src={getBackgroundColor(index) || "/1N.png"} width={24} height={24} alt="App Icon" />
                <span className="text-white truncate ml-[8px]">{loc.name}</span>
              </div>
              <div className="w-1/2 bg-[#1D1E2C] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4"
                  style={{ width: `${loc.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {dataTemp?.slice(5, 10).map((loc, index) => (
            <div key={index + 5} className="flex items-center justify-between mb-2">
              <div className="flex items-center w-1/2">
                <CustomImage src={getBackgroundColorColTwo(index) || "/1N.png"} width={24} height={24} alt="App Icon" />
                <span className="text-white truncate ml-[8px]">{loc.name}</span>
              </div>
              <div className="w-1/2 bg-[#1D1E2C] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4"
                  style={{ width: `${loc.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center w-[160px] h-[40px] bg-[#10D3F1] rounded-lg text-[#fff]">
        每日新增网点数
      </div>

      <div className='flex w-full mt-[20px]'>
        <CustomLineChart todayCount={dailyStat?.length && dailyStat[0].count} data={data} options={options} parentWidth={650} parentHeight={150} />
      </div>
    </div>
  );
};

export default NetworkCard;