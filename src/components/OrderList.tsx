import React, { useEffect, useRef, useState } from 'react';
import CustomImage from '@/components/CustomImage';

const OrderList = ({ order }) => {
  const [orders, setOrders] = useState(order);
  const listRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const listElement = listRef.current;
    const scrollElement = scrollRef.current;
    let scrollInterval;

    if (listElement && scrollElement) {
      // 每2秒平滑滚动一条数据的高度
      scrollInterval = setInterval(() => {
        const scrollHeight = listElement.scrollHeight;
        const clientHeight = scrollElement.clientHeight;
        const itemHeight = listElement.firstChild ? listElement.firstChild.clientHeight : 0;

        if (scrollElement.scrollTop >= scrollHeight) {
          scrollElement.scrollTop = 0; // 滚动到顶部
        } else {
          scrollElement.style.transition = 'transform 0.5s ease-in-out';
          scrollElement.style.transform = `translateY(-${itemHeight}px)`;
          setTimeout(() => {
            scrollElement.style.transition = '';
            scrollElement.style.transform = '';
            scrollElement.scrollTop += itemHeight;
          }, 500);
        }
      }, 2000);
    }

    // 清理滚动定时器
    return () => clearInterval(scrollInterval);
  }, [orders]);

  useEffect(() => {
   if(order?.length){
    setOrders(prevOrders => [...prevOrders, ...order]);
   }
  }, [order?.length]);

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
         w-full h-[38px] bg-[#EFEFEF] rounded-tl-[30px] rounded-br-[30px] rounded-tr-[30px] rounded-bl-[30px]">
          <div className="flex items-start justify-end">
            <span className="ml-[22px]
            font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">用户</span>
          </div>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">网点</span>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A]">开始时间</span>
          <span className="font-[Source_Han_Sans,_Source_Han_Sans] font-medium text-base text-[#24263A] mr-[38px]">结束时间</span>
        </div>
      </div>
      <div className="overflow-hidden max-h-64 scrollbar-hide mt-6 relative">
        <div ref={scrollRef} className="overflow-hidden max-h-64 relative">
          <div ref={listRef}>
            {orders?.map((order, index) => (
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
      </div>
    </div>
  );
};

export default OrderList;