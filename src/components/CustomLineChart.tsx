import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import CustomImage from '@/components/CustomImage';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomLineChart = ({ data, options, parentWidth = 244, parentHeight }) => {
    const [currentValue, setCurrentValue] = useState(data.datasets[0].data.slice(-1)[0]);
    const [currentLabel, setCurrentLabel] = useState(data.labels.slice(-1)[0]);
    console.log(data.datasets[0].data.slice(-1)[0], data.labels.slice(-1)[0], 33334444, currentValue, currentLabel)

    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(123, 67, 151, 0.8)'); // #7B4397 with 0.8 opacity
            gradient.addColorStop(1, 'rgba(123, 67, 151, 0)'); // #7B4397 with 0 opacity

            data.datasets[0].backgroundColor = gradient;
        }
    }, [data]);

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
                radius: 0, // 移除交点的小圆点
            },
            line: {
                tension: 0, // 设置为折线图
                borderWidth: 1, // 设置线条的宽度
            },
        },
    };

    return (
        <div className="bg-[#24263A] flex w-full">
            <div>
                <div className="text-white text-5xl font-bold">{currentValue}K</div>
                <div className="text-[#F19CFF] text-lg font-semibold mt-2 flex justify-start items-center">
                    <CustomImage src='/arrowTop.png' width={6} height={10} />
                    <div className='ml-[5px] text-[16px] font-bold'> 11.94%</div>
                </div>
            </div>
            <div className='ml-[24px]' style={{ width: parentWidth, maxHeight: parentHeight }}>
                <Line ref={chartRef} data={data} options={customOptions} width={parentWidth} height={parentHeight} />
            </div>
        </div>
    );
};

export default CustomLineChart;