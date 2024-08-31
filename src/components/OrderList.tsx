import React, { useEffect, useRef } from 'react';
import CustomImage from '@/components/CustomImage';

const OrderList = ({ orders }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const listElement = listRef.current;
    let scrollInterval;

    if (listElement) {
      // 每 2 秒自动滚动一次
      scrollInterval = setInterval(() => {
        const scrollHeight = listElement.scrollHeight;
        const clientHeight = listElement.clientHeight;
        const scrollTop = listElement.scrollTop;
        const itemHeight = listElement.firstChild ? listElement.firstChild.clientHeight : 0;

        if (scrollTop + clientHeight >= scrollHeight) {
          listElement.scrollTop = 0; // 滚动到顶部
        } else {
          listElement.scrollTop += itemHeight; // 向下滚动一条数据的高度
        }
      }, 2000);
    }

    // 清理滚动定时器
    return () => clearInterval(scrollInterval);
  }, [orders]);

  return (
    <div className="p-6 h-[421px] bg-[#24263A] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
      <div className="flex items-center">
        <div className="p-2 pl-0">
          <CustomImage src="/onlineOrder.png" width={32} height={32} alt="App Icon" />
        </div>
        <h2 className="text-white text-xl">实时充电订单</h2>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2 p-2
         w-[779px] h-[38px] bg-[#EFEFEF] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
          <div className="flex items-end justify-end">
            <span className="ml-[55px]
            font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">用户</span>
          </div>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">网点</span>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">开始时间</span>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A] mr-[38px]">结束时间</span>
        </div>
      </div>
      <div className="overflow-y-auto max-h-64 scrollbar-hide" ref={listRef}>
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between mb-2 p-2
          font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-sm text-[#FFFFFF]
          rounded-lg">
            <div className="flex items-center">
              <img src={'/userIcon.png'} alt="User" className="w-8 h-8 rounded-full mr-2" />
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