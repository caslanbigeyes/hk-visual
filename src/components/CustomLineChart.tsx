import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import CustomImage from '@/components/CustomImage';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomLineChart = ({ data, options }) => {
    const [currentValue, setCurrentValue] = useState(data.datasets[0].data.slice(-1)[0]);
    const [currentLabel, setCurrentLabel] = useState(data.labels.slice(-1)[0]);

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
    };

    return (
        <div className="bg-[#24263A] flex">
            <div>
                <div className="text-white text-5xl font-bold">16K</div>

                <div className="text-[#F19CFF]  text-lg font-semibold mt-2 flex justify-center items-center">
                    <CustomImage src='/arrowTop.png' width={6} height={10} />
                    <div className='ml-[5px] text-[16px] font-bold'> 11.94%</div>
                </div>
            </div>
            <div>
                <Line data={data} options={customOptions} />
            </div>
        </div>
    );
};

export default CustomLineChart;