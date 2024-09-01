import React, { useState, useEffect, useRef } from 'react';
import CustomImage from '@/components/CustomImage';
import CustomLineChart from '@/components/CustomLineChart';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const NetworkCard = ({ title, dailyData, dailyState, dailyStatChange, yesterdayData }) => {
  const [activeData, setActiveData] = useState('daily');
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      const otherElementsHeight = Array.from(containerRef.current.children)
        .reduce((total, child) => total + child.offsetHeight, 0);
      setContainerHeight(containerRef.current.offsetHeight - otherElementsHeight);
    }
  }, []);

  let dataTemp = activeData === 'daily' ? dailyData : yesterdayData;
  let data = {
    labels: ['10', '11', '12', '13', '14', '15', '16', '17'],
    datasets: [
      {
        label: '每日新增用户数',
        data: [500, 600, 800, 1000, 1200, 1400, 1800, 2000],
        borderColor: '#9b5de5',
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


  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return '#FFA857';
      case 1:
        return '#508790';
      case 2:
        return '#B96245';
      default:
        return '#ABAECC';
    }
  };


  return (
    <div ref={containerRef} className="p-6 bg-[#24263A] w-[841px] h-[479px] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
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
          {dataTemp.slice(0, 5).map((loc, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center w-1/2">
                <div
                  className="mr-2 w-[24px] h-[24px] flex justify-center items-center text-[#000] rounded-[50%]"
                  style={{ backgroundColor: getBackgroundColor(index) }}
                >
                  {index + 1}
                </div>
                <span className="text-white  truncate">{loc.name}</span>
              </div>
              <div className="w-1/2 bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4"
                  style={{ width: `${(loc.value / 1600) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {dataTemp.slice(5, 10).map((loc, index) => (
            <div key={index + 5} className="flex items-center justify-between mb-2">
              <div className="flex items-center w-1/2">
                <div
                  className="mr-2 w-[24px] h-[24px] flex justify-center items-center text-[#000] rounded-[50%]"
                  style={{ backgroundColor: getBackgroundColor(index + 5) }}
                >
                  {index + 6}
                </div>
                <span className="text-white  truncate">{loc.name}</span>
              </div>
              <div className="w-1/2 bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[linear-gradient(360deg,#5C4F8E_0%,#668DE0_30%,#10D3F1_100%)] rounded-full h-4"
                  style={{ width: `${(loc.value / 1600) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center w-[160px] h-[40px] bg-[#10D3F1] rounded-lg">
        <button onClick={() => setActiveData('daily')}>
          每日新增网点数
        </button>
      </div>

      <div className='flex w-full mt-[20px]'>
        <CustomLineChart data={data} options={options} parentWidth={containerWidth} parentHeight={150} />
      </div>
    </div>
  );
};

export default NetworkCard;