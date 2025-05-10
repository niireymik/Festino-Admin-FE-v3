import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { prettyPrice } from '@/utils/utils';
import { useOrderStatistics } from '@/stores/orders/orderStatistics';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const StatisticsGraph: React.FC = () => {
  const { allOrderStatistics } = useOrderStatistics();
  const chartRef = useRef<any>(null);

  const [menuData, setMenuData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(700);

  const chartData: ChartData<'bar'> = {
    labels: menuData.map(menu => menu.menuName),
    datasets: [
      {
        label: '야간부스 매출 통계',
        data: menuData.map(menu => menu.menuCount),
        backgroundColor: '#ADC9F5',
        borderColor: '#0073F0',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 115, 240, 0.64)',
        hoverBorderColor: '#0073F0',
        borderRadius: 10,
      }
    ]
  };

  const calculateContainerWidth = (labelCount: number) => {
    const baseWidth = 700;
    const labelWidth = 60;
    return labelCount <= 7 ? baseWidth : baseWidth + (labelCount - 7) * labelWidth;
  };

  const getYMax = () => {
    const max = Math.max(...menuData.map(menu => menu.menuCount), 0);
    return Math.ceil(max / 10) * 10;
  };

  const options: ChartOptions<'bar'> = {
    responsive: false,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            return `총 판매 금액 : ${prettyPrice(menuData[index]?.menuSale || 0)}`;
          },
        }
      },
    },
    scales: {
      x: {
        grid: { display: true },
        title: {
          display: true,
          text: '[ 메뉴 ]',
          font: { size: 12 },
        },
        ticks: {
          maxRotation: 30,
          minRotation: 0,
          autoSkip: false,
          font: { size: 10 },
        },
        // barThickness: 60,
        // categoryPercentage: 1.0,
        // barPercentage: 1.0,
      },
      y: {
        grid: { display: true },
        title: {
          display: true,
          text: '[ 판매량 ]',
          font: { size: 12 },
        },
        ticks: {
          stepSize: 10,
        },
        beginAtZero: true,
        min: 0,
        max: getYMax(),
      },
    },
  };

  useEffect(() => {
    const fetchStatisticsData = async () => {
      setIsLoading(true);

      const list = allOrderStatistics?.menuSaleList || [];
      setMenuData(list);
      setIsDataReady(list.length > 0);
      setContainerWidth(calculateContainerWidth(list.length));

      setIsLoading(false);
    };

    fetchStatisticsData();
  }, [allOrderStatistics]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full overflow-x-auto scrollbar-hide">
        {!isLoading && isDataReady && (
          <div style={{ width: containerWidth, height: 400 }} className="containerBody">
            <Bar ref={chartRef} data={chartData} options={options} />
          </div>
        )}
      </div>

      {isLoading && <div className="flex justify-center items-center h-full">Loading...</div>}
      {!isLoading && !isDataReady && <div className="flex justify-center items-center h-full">No data available</div>}
    </div>
  );
};

export default StatisticsGraph;