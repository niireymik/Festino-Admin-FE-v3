import IconDropDown from '@/components/icons/IconDropDown';
import IconScroll from '@/components/icons/IconScroll';
import { DATES, STATISTICS_TYPE } from '@/constants/constant';
import React, { useEffect, useMemo, useState } from 'react';

type MenuStat = {
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuSale: number;
};

const MOCK_MENU_STATS: MenuStat[] = [
  { menuName: '핫도그', menuPrice: 3000, menuCount: 24, menuSale: 72000 },
  { menuName: '떡볶이', menuPrice: 4000, menuCount: 10, menuSale: 40000 },
  { menuName: '튀김세트', menuPrice: 5000, menuCount: 8, menuSale: 40000 },
];

const MOCK_BOOTH = { adminName: '컴퓨터공학부' };

const prettyPrice = (value: number) => `${value.toLocaleString()}원`;

const OrderStatisticsPage: React.FC = () => {
  const [month] = useState<number>(9);
  const [day, setDay] = useState<number>(1);
  const [type, setType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeDate, setActiveDate] = useState<number>(1);
  const [menuStats, setMenuStats] = useState<MenuStat[]>(MOCK_MENU_STATS);

  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();

  const activeDateMap: Record<number, number> = {
    26: 1,
    27: 2,
    28: 3,
  };

  const determineActiveDate = (): number => {
    if (currentMonth < 25) return 1;
    if (currentMonth > 28) return 3;
    if (activeDateMap[today]) return activeDateMap[today];
    return today < 11 ? 1 : 3;
  };

  const formattedDateList = useMemo(() => {
    return (Object.keys(DATES) as Array<keyof typeof DATES>).map((key) => ({
      day: key.padStart(2, '0'),
      dateName: DATES[key],
    }));
  }, []);

  const fetchStatistics = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleButtonClick = async (key: number) => {
    if (key !== activeDate) {
      setActiveDate(key);
      setDay(activeDateMap[key]);
    }
    await fetchStatistics();
  };

  const sortStrategies: Record<string, (a: MenuStat, b: MenuStat) => number> = {
    nameAsc: (a, b) => a.menuName.localeCompare(b.menuName),
    nameDesc: (a, b) => b.menuName.localeCompare(a.menuName),
    priceAsc: (a, b) => a.menuPrice - b.menuPrice,
    priceDesc: (a, b) => b.menuPrice - a.menuPrice,
    countAsc: (a, b) => a.menuCount - b.menuCount,
    countDesc: (a, b) => b.menuCount - a.menuCount,
    saleAsc: (a, b) => a.menuSale - b.menuSale,
    saleDesc: (a, b) => b.menuSale - a.menuSale,
  };

  const handleStatisticsSort = (sortKey: keyof typeof sortStrategies) => {
    const sortFn = sortStrategies[sortKey];
    if (sortFn) {
      const sorted = [...menuStats].sort(sortFn);
      setMenuStats(sorted);
    }
  };

  useEffect(() => {
    setActiveDate(determineActiveDate());
    fetchStatistics();
  }, []);

  return (
    <div className="flex flex-col">
      {/* 정렬 기준 선택 */}
      <div className="flex justify-end gap-4 mb-4 mr-4">
      {Object.entries(STATISTICS_TYPE).map(([key, toggle]) => (
        <div key={key} className="flex">
          <input
            id={`toggle-${key}`}
            type="radio"
            value={toggle.type}
            name="toggle"
            checked={type === toggle.type}
            onChange={() => setType(toggle.type)}
            className="w-4 h-4 text-primary-800 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor={`toggle-${key}`}
            className="ms-2 text-sm font-medium text-gray-900 select-none"
          >
            {toggle.value}
          </label>
        </div>
      ))}
      </div>

      <div className="w-full h-[530px] flex overflow-x-scroll scrollbar-hide">
        {/* 왼쪽: 그래프 자리 */}
        <div className="w-1/2 min-w-[300px] pt-20 pl-10 h-full border border-primary-800 rounded-l-[20px]">
          {isLoading ? (
            <div className="text-primary-800 font-semibold h-[500px] flex justify-center items-center">Loading...</div>
          ) : (
            <div className="text-center text-gray-400 mt-[100px]">📊 그래프 자리 (StatisticsGraph)</div>
          )}
          <div className="flex justify-end items-center pr-4">
            <IconScroll className="w-5 h-5 mr-1" />
            <p className="text-xs text-gray-500 font-semibold">스크롤</p>
          </div>
        </div>

        {/* 오른쪽: 통계 표 */}
        <div className="w-1/2 min-w-[490px] h-full overflow-hidden p-[40px] border-r border-y border-primary-800 rounded-r-[20px] flex flex-col justify-between items-center">
          <div>
            <div className="min-w-[432px] font-semibold text-primary-800 text-xl flex justify-center select-none pb-5">
              {MOCK_BOOTH.adminName} 야간부스 매출 통계
            </div>

            <div className="w-full flex justify-center gap-3">
              {formattedDateList.map((dateInfo, key) => (
                <button
                  key={key}
                  type="button"
                  className={`min-w-[110px] h-[35px] is-button rounded-[16px] text-sm ${
                    activeDateMap[Number(dateInfo.day)] !== day ? 'is-outlined' : ''
                  }`}
                  onClick={() => handleButtonClick(Number(dateInfo.day))}
                >
                  {String(month).padStart(2, '0')}/{dateInfo.day} ({dateInfo.dateName})
                </button>
              ))}
            </div>
          </div>

          {/* 표 본문 */}
          <div className="max-w-[712px] w-full h-[330px] rounded-3xl flex flex-col text-secondary-500 outline outline-2 bg-white outline-[rgba(0,115,240,0.16)] relative">
            <div className="h-[50px] flex justify-between bg-primary-200 rounded-t-3xl font-semibold pl-7 border-b-1 border-primary-300 items-center text-[13px]">
              <p className="basis-2/3 flex items-center">
                메뉴
                <div>
                  <IconDropDown className="-scale-y-100 w-2 h-2" onClick={() => handleStatisticsSort('nameAsc')} />
                  <IconDropDown onClick={() => handleStatisticsSort('nameDesc')} />
                </div>
              </p>
              <p className="basis-1/4 text-center flex">
                가격
                <div>
                  <IconDropDown className="-scale-y-100 w-2 h-2" onClick={() => handleStatisticsSort('priceAsc')} />
                  <IconDropDown onClick={() => handleStatisticsSort('priceDesc')} />
                </div>
              </p>
              <p className="basis-1/6 text-center flex">
                수량
                <div>
                  <IconDropDown className="-scale-y-100 w-2 h-2" onClick={() => handleStatisticsSort('countAsc')} />
                  <IconDropDown onClick={() => handleStatisticsSort('countDesc')} />
                </div>
              </p>
              <p className="basis-1/4 text-right pr-8 flex">
                판매액
                <div>
                  <IconDropDown className="-scale-y-100 w-2 h-2" onClick={() => handleStatisticsSort('saleAsc')} />
                  <IconDropDown onClick={() => handleStatisticsSort('saleDesc')} />
                </div>
              </p>
            </div>

            <div className="h-full overflow-y-scroll scrollbar-hide">
              {menuStats.map((menu, index) => (
                <div
                  key={index}
                  className="flex justify-between pl-7 min-h-8 items-center border-b-1 border-primary-300 hover:bg-gray-200 text-[13px]"
                >
                  <p className="basis-2/3 truncate text-secondary-700-light">{menu.menuName}</p>
                  <p className="basis-1/4 text-center text-secondary-700-light">{prettyPrice(menu.menuPrice)}</p>
                  <p className="basis-1/6 text-center text-secondary-700-light">{menu.menuCount}개</p>
                  <p className="basis-1/4 text-right pr-8 text-secondary-700-light">
                    {prettyPrice(menu.menuSale)}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid place-items-center text-primary-800 font-medium text-lg h-14 rounded-b-3xl bg-white border-secondary-600 shadow-[0px_-5px_6px_0px_rgba(0,0,0,0.1)]">
              총액 : {prettyPrice(menuStats.reduce((sum, m) => sum + m.menuSale, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatisticsPage;