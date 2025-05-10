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
import { useOrderStatistics } from '@/stores/orders/orderStatistics';
import { prettyPrice } from '@/utils/utils';
import { Statistic } from '@/types/orders/statistics.types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const StatisticsGraph: React.FC = () => {
  const { allOrderStatistics } = useOrderStatistics();
  const containerRef = useRef<HTMLDivElement>(null);   // 그래프 컨테이너 DOM 참조
  const [menuData, setMenuData] = useState<Statistic[]>([]); // 차트에 사용할 메뉴 데이터
  const [isDataReady, setIsDataReady] = useState(false);
  const [containerWidth, setContainerWidth] = useState(700); // 컨테이너 가로폭 상태
  const [chartKey, setChartKey] = useState(0); // 차트 리렌더링을 위한 key 값

  // 레이블 수에 따라 차트 컨테이너의 너비를 계산하는 함수
  const calculateContainerWidth = (labels: string[]) => {
    const baseWidth = 700;
    const labelWidth = 60;
    return labels.length <= 7 ? baseWidth : baseWidth + (labels.length - 7) * labelWidth;
  };

  // Y축 최대값을 계산하여 10 단위로 반올림
  // 모든 메뉴의 판매량 중 최대값을 기준으로 설정
  const getYMax = () => {
    const maxValue = Math.max(...menuData.map(menu => menu.menuCount), 0);
    return Math.ceil(maxValue / 10) * 10 || 10; // 최소 10 보장
  };

  // 차트 데이터 구성
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
        barThickness: 60,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
      }
    ]
  };

  // 차트 옵션
  const options: ChartOptions<'bar'> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `총 판매 금액 : ${prettyPrice(menuData[tooltipItem.dataIndex]?.menuSale || 0)}`,
        }
      }
    },
    scales: {
      x: {
        grid: { display: true },
        title: { display: true, text: '[ 메뉴 ]', font: { size: 12 } },
        ticks: { maxRotation: 30, minRotation: 0, autoSkip: false, font: { size: 10 } },
      },
      y: {
        grid: { display: true },
        title: { display: true, text: '[ 판매량 ]', font: { size: 12 } },
        ticks: { stepSize: 10 },
        beginAtZero: true,
        min: 0,
        max: getYMax(), // Y축 최대값 동적으로 반영
      },
    },
  };

  // 데이터 변경 시 실행되는 훅
  useEffect(() => {
    if (!allOrderStatistics) return;

    const list = allOrderStatistics.menuSaleList || [];
    const newWidth = calculateContainerWidth(list.map((m) => m.menuName));

    setMenuData(list); // 메뉴 데이터 업데이트
    setContainerWidth(newWidth); // 차트 폭 계산
    setIsDataReady(list.length > 0);
    setChartKey(prev => prev + 1); // 리렌더 트리거: 강제 차트 재생성
  }, [allOrderStatistics]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full overflow-x-auto scrollbar-hide">
        {isDataReady ? (
          <div
            ref={containerRef}
            style={{ width: `${containerWidth}px`, height: 400 }}
            className="containerBody"
          >
            <Bar
              key={chartKey}
              data={chartData}
              options={options}
              width={containerWidth}
              height={400}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">통계 데이터가 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
};

export default StatisticsGraph;
