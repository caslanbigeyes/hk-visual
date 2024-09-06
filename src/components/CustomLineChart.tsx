import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { hexToRgba, formatCount } from '@/util';
import CustomImage from '@/components/CustomImage';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomLineChart = ({ data, options, todayCount, parentWidth = 320, parentHeight = 240 }) => {
    const [currentValue, setCurrentValue] = useState(data.datasets[0].data.slice(-1)[0]);
    const [currentLabel, setCurrentLabel] = useState(data.labels.slice(-1)[0]);

    const chartRef = useRef(null);

    const customOptions = {
        ...options,
        plugins: {
            ...options.plugins,
            tooltip: {
                ...options.plugins.tooltip,
                callbacks: {
                    ...options.plugins.tooltip.callbacks,
                    label: function (context) {
                        setCurrentValue(context.raw);
                        setCurrentLabel(context.label);
                        // return `X: ${context.label}, Y: ${context.raw}`;
                    },
                },
                displayColors: false,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                    size: 12,
                },
                bodyFont: {
                    size: 14,
                },
                padding: 10,
                cornerRadius: 4,
                caretSize: 6,
            },
        },
        scales: {
            x: {
                grid: {
                    borderDash: [5, 5], // 设置虚线
                    color: function (context) {
                        if (context.tick && context.tick.label === '10') {
                            return 'transparent'; // 去掉第一个 x 轴的竖线
                        }
                    },
                },
                ticks: {
                    color: '#474C55',
                    font: {
                        size: 12,
                    },
                    maxRotation: 0, // 禁止倾斜
                    minRotation: 0, // 禁止倾斜
                },
            },
            y: {
                ticks: {
                    color: '#474C55',
                    font: {
                        size: 12,
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 2, // 移除交点的小圆点
            },
            line: {
                tension: 0, // 设置为折线图
                borderWidth: 1, // 设置线条的宽度
                borderColor: '#10D3F1', // 设置连接线的颜色
            },
        },
    };
    const calculatePercentageChange = (data) => {
        if (data.datasets[0].data.length > 1) {
            const firstValue = data.datasets[0].data[data.datasets[0].data.length - 1];
            const secondValue = data.datasets[0].data[data.datasets[0].data.length - 2];
            const percentageChange = ((firstValue - secondValue) / secondValue) * 100;
            return percentageChange.toFixed(2);
        }
        return 0;

    };

    const percentageChange = calculatePercentageChange(data);

    return (
        <div className="bg-[#24263A] flex w-full">
            <div>
                <div className="text-white text-5xl font-bold">{formatCount(todayCount)}</div>
                <div className="text-[#F19CFF] text-lg font-semibold mt-2 flex justify-start items-center">
                    <CustomImage alt={'logo'} src={data.datasets[0].url || '/arrowTop.png'} width={6} height={10} />
                    <div className='ml-[5px] text-[16px] font-bold'
                        style={{ color: data.datasets[0].borderColor }}
                    > {percentageChange}%</div>
                </div>
            </div>
            <div className='ml-[24px]' style={{ width: parentWidth, maxHeight: parentHeight }}>
                <Line data={data} options={customOptions} width={parentWidth} ref={chartRef} />
            </div>
        </div >
    );
};

export default CustomLineChart;