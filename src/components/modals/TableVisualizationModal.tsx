import { useBaseModal } from "@/stores/commons/baseModal";
import IconClose from "../icons/IconClose";
import { ORDER_CATEGORY, ORDER_FILTER } from "@/constants/constant";
import { useState } from "react";
import { useDepositOrder } from "@/stores/orders/depositOrder";
import { useTableStatusOrder } from "@/stores/orders/tableStatusOrder";
import { useDate } from "@/stores/commons/date";
import IconRefreshVector from "../icons/IconRefreshVector";
import IconSearch from "../icons/IconSearch";
import { useServiceModal } from "@/stores/orders/serviceModal";
import { prettyPrice } from "@/utils/utils";

const ITEMS_PER_PAGE = 6;

// 임시 데이터
const orderData = [
  {
    id: 1,
    orderNumber: "No.1",
    name: "이승민",
    amount: 124500,
    orderTime: "20:30",
    completeTime: "20:50",
    status: "cooking",
    items: [
      { name: "둘이먹다 치즈닭꼬치", quantity: 4, price: 13400 },
    ],
  },
  {
    id: 2,
    orderNumber: "No.2",
    name: "김지우",
    amount: 84000,
    orderTime: "19:10",
    completeTime: "19:40",
    status: "ready",
    items: [
      { name: "불닭볶음면", quantity: 2, price: 7000 },
      { name: "치즈김밥", quantity: 3, price: 5000 },
    ],
  },
  {
    id: 3,
    orderNumber: "No.3",
    name: "박하늘",
    amount: 150000,
    orderTime: "18:45",
    completeTime: "19:05",
    status: "finish",
    items: [
      { name: "쫄면", quantity: 5, price: 6000 },
    ],
  },
  {
    id: 4,
    orderNumber: "No.4",
    name: "정호연",
    amount: 30000,
    orderTime: "17:00",
    completeTime: "17:30",
    status: "cancel",
    items: [
      { name: "떡볶이", quantity: 3, price: 10000 },
    ],
  },
  {
    id: 5,
    orderNumber: "No.5",
    name: "이승민",
    amount: 99000,
    orderTime: "21:00",
    completeTime: "21:30",
    status: "cooking",
    items: [
      { name: "치즈닭꼬치", quantity: 3, price: 33000 },
    ],
  },
  {
    id: 6,
    orderNumber: "No.6",
    name: "김민수",
    amount: 120000,
    orderTime: "20:00",
    completeTime: "20:40",
    status: "ready",
    items: [
      { name: "치킨마요덮밥", quantity: 4, price: 30000 },
    ],
  },
  {
    id: 7,
    orderNumber: "No.7",
    name: "조은하",
    amount: 45000,
    orderTime: "18:00",
    completeTime: "18:20",
    status: "finish",
    items: [
      { name: "만두국", quantity: 3, price: 15000 },
    ],
  },
  {
    id: 8,
    orderNumber: "No.8",
    name: "윤지훈",
    amount: 75000,
    orderTime: "19:30",
    completeTime: "19:55",
    status: "cooking",
    items: [
      { name: "핫도그", quantity: 5, price: 15000 },
    ],
  },
  {
    id: 9,
    orderNumber: "No.9",
    name: "김하람",
    amount: 134500,
    orderTime: "20:30",
    completeTime: "21:00",
    status: "cancel",
    items: [
      { name: "불족발", quantity: 2, price: 67250 },
    ],
  },
  {
    id: 10,
    orderNumber: "No.10",
    name: "장서윤",
    amount: 100000,
    orderTime: "17:30",
    completeTime: "18:00",
    status: "finish",
    items: [
      { name: "김치볶음밥", quantity: 4, price: 25000 },
    ],
  },
  {
    id: 11,
    orderNumber: "No.11",
    name: "최은결",
    amount: 54000,
    orderTime: "16:00",
    completeTime: "16:20",
    status: "ready",
    items: [
      { name: "핫윙", quantity: 6, price: 9000 },
    ],
  },
  {
    id: 12,
    orderNumber: "No.12",
    name: "오지현",
    amount: 88000,
    orderTime: "15:45",
    completeTime: "16:15",
    status: "cooking",
    items: [
      { name: "치즈떡볶이", quantity: 4, price: 22000 },
    ],
  },
];

const TableVisualizationModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { openServiceModal } = useServiceModal();
  const { boothId } = useTableStatusOrder();
  const { nowDate } = useDate();

  const { getWaitDepositOrderList } = useDepositOrder();
  const [selectedFilterMenu, setSelectedFilterMenu] = useState(ORDER_FILTER['all']);
  const [isFocus, setIsFocus] = useState(false);
  const [searchMenu, setSearchMenu] = useState('');

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orderData.length / ITEMS_PER_PAGE);
  const paginatedOrders = orderData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 새로고침
  const handleClickRefreshButton = async () => {
    await getWaitDepositOrderList({ boothId, date: nowDate });
  };

  return (
    <div className="min-w-[900px] h-fit flex flex-col justify-start items-center bg-white rounded-2xl px-[40px] py-[50px] gap-5 max-h-full overflow-auto">
      <div className="w-full flex justify-between items-center gap-5 shrink-0 font-semibold text-xl text-primary-800 h-9">
        <div className="w-[18px] h-[18px] p-1"></div>
          테이블 1 주문내역 조회
          <IconClose
            onClick={() => closeModal()}
            className="cursor-pointer p-1 hover-bg-gray-100"
          />
      </div>

      {/* 필터링 + 주문추가 + 검색바 */}
      <div className="w-full flex justify-between mb-6">
        <div className="min-w-[320px] flex items-center gap-2"> 
          <div className="flex gap-[13px]">
            {Object.values(ORDER_FILTER).map((orderMenu, index) => (
              <div
                key={index}
                className={`cursor-pointer text-sm ${selectedFilterMenu === orderMenu ? 'font-bold' : ''}`}
                onClick={() => setSelectedFilterMenu(orderMenu)}
              >
                {orderMenu}
              </div>
            ))}
          </div>
          
          {/* 주문추가 버튼 */}
          <button
            className="is-button w-[90px] h-[30px] gap-1 text-xs flex justify-center items-center"
            onClick={() => openServiceModal()}
          >
            주문추가
          </button>

          {/* 새로고침 버튼 */}
          <button
            className="is-button w-[90px] h-[30px] gap-1 text-xs flex justify-center items-center"
            onClick={() => handleClickRefreshButton()}
          >
            <IconRefreshVector className="w-4 h-4 p-[2px]" />
            새로고침
          </button>
        </div>
        <div
          className={`w-[350px] h-[40px] rounded-xl flex items-center px-[11px] bg-white gap-1 outline ${
            isFocus ? 'outline-primary-800-light-70 outline-2' : 'outline-gray-300 outline-1'
          }`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        >
          <IconSearch fillColor='#97C9FF' />
          <input
            value={searchMenu}
            onChange={(e) => setSearchMenu(e.target.value)}
            placeholder="주문 검색"
            className="grow focus:outline-none text-sm"
          />
          <button className="w-[75px] h-[30px] rounded-xl text-sm bg-primary-800 text-white">Search</button>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="w-full">
        {/* Header */}
        <div className="h-12 bg-gray-100 text-secondary-700 px-14 flex items-center border-b text-sm font-semibold">
          <div className="w-1 h-4 bg-gray-100" />
          <div className="w-[100px] text-center">주문번호</div>
          <div className="w-[100px] text-center">주문자</div>
          <div className="w-[120px] text-center">주문금액</div>
          <div className="w-[100px] text-center">주문 시간</div>
          <div className="w-[120px] text-center">조리완료시간</div>
          <div className="w-[100px] text-center">주문 상태</div>
          <div className="flex-1" />
        </div>

        {/* Order List */}
        {paginatedOrders.map((order) => {
          const isOpen = expandedId === order.id;
          return (
            <div key={order.id}>
              <div
                className="h-12 px-14 flex items-center border-b text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(isOpen ? null : order.id)}
              >
                <div className={`w-2 h-6 ${order.status === "finish"
                  ? "bg-success-50"
                  : order.status === "ready"
                  ? "bg-danger-50"
                  : order.status === "cooking"
                  ? "bg-primary-800-light-16"
                  : "bg-gray-200"}`} />
                <div className="w-[100px] text-center">{order.orderNumber}</div>
                <div className="w-[100px] text-center">{order.name}</div>
                <div className="w-[120px] text-center">{prettyPrice(order.amount)}</div>
                <div className="w-[100px] text-center">{order.orderTime}</div>
                <div className="w-[120px] text-center">{order.completeTime}</div>
                <div className="w-[100px] text-center">
                  <div
                    className={`w-[100px] py-2 rounded-lg text-secondary-700 text-xs text-center font-semibold items-center justify-center ${
                      order.status === "finish"
                        ? "bg-success-50"
                        : order.status === "ready"
                        ? "bg-danger-50"
                        : order.status === "cooking"
                        ? "bg-primary-800-light-16"
                        : "bg-gray-200"
                    }`}
                  >
                    {ORDER_CATEGORY[order.status]}
                  </div>
                </div>
                <div className="flex-1 text-right">▼</div>
              </div>

              {isOpen && (
                <div className="bg-gray-50 px-20 py-3 text-sm text-gray-700 border-b">
                  <div className="grid grid-cols-3 gap-2 border-b pb-1 mb-2">
                    <div className="font-semibold">메뉴</div>
                    <div className="font-semibold">수량</div>
                    <div className="font-semibold">가격</div>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 py-1">
                      <div>{item.name}</div>
                      <div>{item.quantity}개</div>
                      <div>{prettyPrice(item.price)}</div>
                    </div>
                  ))}
                  <div className="mt-2 font-bold text-right">
                    {prettyPrice(order.items.reduce((acc, item) => acc + item.price, 0))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 py-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableVisualizationModal;