import React, { useEffect, useMemo, useState } from "react";
import IconRefresh from "@/components/icons/IconRefresh";
import TableOrderItem from "@/components/orders/TableOrderItem";
import { ORDER_CATEGORY, TABLE_FILTER } from "@/constants/constant";
import { useTableStatusOrder } from "@/stores/orders/tableStatusOrder";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDate } from "@/stores/commons/date";

const OrderLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowSize();

  // 통계 또는 테이블 페이지 여부 상태
  const [isStatistics, setIsStatistics] = useState(false);
  const [isTable, setIsTable] = useState(false);

  // 필터 선택 상태
  const [selectedFilterMenu, setSelectedFilterMenu] = useState('timeAsc');

  // 현재 페이지 인덱스 (1부터 시작)
  const [pageIndex, setPageIndex] = useState(1);

  // 주문 관련 상태 및 액션 훅
  const { boothId, orderList, setOrderStatus, getAllTableOrders } = useTableStatusOrder();
  const { nowDate } = useDate();

  // 화면 너비에 따라 한 행에 표시할 카드 수 계산
  const orderPerCol = useMemo(() => {
    if (width < 950) return 2;
    else if (width < 1550) return 3;
    else if (width < 1800) return 4;
    else if (width < 2050) return 5;
    else return 6;
  }, [width]);

  // 한 페이지에 표시할 주문 수 = 열 수 * 2행
  const orderPerPage = orderPerCol * 2;

  // 최대 페이지 수 계산
  const maxPageIndex = Math.ceil(orderList.length / orderPerPage);

  // 현재 페이지에 표시할 주문 목록 슬라이싱
  const pagedOrders = useMemo(() => {
    const start = (pageIndex - 1) * orderPerPage;
    const end = start + orderPerPage;
    return orderList.slice(start, end);
  }, [orderList, pageIndex, orderPerPage]);

  // 동적으로 그리드 열 수 스타일 적용
  const gridColumnStyle = useMemo<React.CSSProperties>(() => {
    return { gridTemplateColumns: `repeat(${orderPerCol}, 1fr)` };
  }, [orderPerCol]);

  useEffect(() => {
    if (!boothId) return;
    getAllTableOrders({ boothId, date: nowDate });
  }, [boothId, nowDate]);

  // 페이지 경로 변경될 때 초기화 및 구분 처리
  useEffect(() => {
    setIsStatistics(pathname.includes("statistics"));
    setIsTable(pathname.includes("table"));
    setPageIndex(1); // 페이지 전환 시 첫 페이지로 초기화
  }, [pathname]);

  // 카테고리 버튼 클릭 시 상태 설정 및 이동
  const handleCategoryClick = (key: string) => {
    setOrderStatus(key);
    navigate(`/order/${key}`);
  };

  return (
    <div className="flex flex-col px-4 gap-[40px] min-w-[630px] pb-20">
      {/* 상단 헤더 */}
      <div className="flex justify-between pt-[50px] lg:pt-[100px] min-w-[670px] gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-cover bg-order-icon" />
          <div className="text-primary-800 text-xl md:text-2xl font-semibold">주문 조회</div>
        </div>
      </div>

      {/* 주문 카테고리 버튼 */}
      <div className="flex gap-[10px] overflow-x-auto">
        {Object.entries(ORDER_CATEGORY).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleCategoryClick(key)}
            className={`is-button w-[120px] h-[40px] text-sm rounded-[16px] select-none ${
              !pathname.includes(key) ? "is-outlined" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 통계 및 테이블 페이지가 아닌 경우에만 표시 */}
      {!isStatistics && !isTable && (
        <div className="flex flex-col relative">
          {/* 필터 및 새로고침 버튼 */}
          <div className="flex justify-between items-center pb-[10px]">
            <div className="flex gap-[14px]">
              {Object.entries(TABLE_FILTER).map(([key, value]) => (
                <div
                  key={key}
                  className={`cursor-pointer hover:text-secondary-800 text-sm ${
                    selectedFilterMenu === key ? "font-bold text-secondary-800" : "text-secondary-600"
                  }`}
                  onClick={() => {
                    setSelectedFilterMenu(key);
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
            <div className="flex gap-[14px] items-center">
              <button className="is-button w-[100px] h-[40px] rounded-[16px] text-sm">
                주문 추가
              </button>
              <IconRefresh />
            </div>
          </div>

          {/* 테이블 주문 카드 그리드 영역 */}
          <div className="bg-primary-500-light-5 rounded-2xl p-6">
            {/* 제목 영역 */}
            <div className="flex justify-between items-center">
              <div className="w-[170px]" />
              <div className="font-bold text-primary-800 text-xl">테이블 주문 현황</div>
              <div className="w-[170px] h-[50px] bg-white rounded-2xl flex justify-center items-center gap-2">
                <div className="text-primary-800-light-50 text-[16px] font-bold">현재 주문 수</div>
                <div className="text-[20px] font-bold text-primary-800">{orderList.length}개</div>
              </div>
            </div>

            {/* 주문 카드 목록 */}
            <div 
              className="py-7 grid gap-x-[22px] gap-y-4 place-items-center grid-rows-2"
              style={gridColumnStyle}
            >
              {pagedOrders.map((tableOrder, index) => (
                <TableOrderItem key={index} tableOrder={tableOrder} />
              ))}
            </div>

            {/* 페이지네이션 영역 */}
            <div className="flex justify-center items-center text-xl font-medium text-secondary-900">
              {Array.from({ length: maxPageIndex }, (_, i) => i + 1).map((page) => (
                <div
                  key={page}
                  onClick={() => setPageIndex(page)}
                  className={`w-10 h-10 flex justify-center items-center cursor-pointer ${
                    pageIndex === page ? "bg-primary-800-light-86 text-white rounded-full" : ""
                  }`}
                >
                  {page}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 라우터에서 연결된 하위 컴포넌트 출력 */}
      <Outlet />
    </div>
  );
};

export default OrderLayout;