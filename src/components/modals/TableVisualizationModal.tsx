import { useBaseModal } from "@/stores/commons/baseModal";
import IconClose from "../icons/IconClose";
import { ORDER_TYPE, TABLE_MODAL_FILTER } from "@/constants/constant";
import { useEffect, useRef, useState } from "react";
import { useTableStatusOrder } from "@/stores/orders/tableStatusOrder";
import IconRefreshVector from "../icons/IconRefreshVector";
import IconSearch from "../icons/IconSearch";
import { useServiceModal } from "@/stores/orders/serviceModal";
import { prettyPrice } from "@/utils/utils";
import { useTableVisualizationDetail } from "@/stores/orders/tableVisualization";
import { useTableDetail } from "@/stores/booths/tableDetail";

const ITEMS_PER_PAGE = 6;

const TableVisualizationModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { openServiceModal } = useServiceModal();
  const { boothId } = useTableStatusOrder();
  const { selectedTableNumIndex, tableOrderList, getAllOrderByTableNum } = useTableVisualizationDetail();
  const { getCustomTableNum } = useTableDetail();

  const [selectedFilterMenu, setSelectedFilterMenu] = useState(TABLE_MODAL_FILTER['all']);
  const [isFocus, setIsFocus] = useState(false);
  const searchMenu = useRef('');

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchInput, setSearchInput] = useState('');
  
  const filteredOrders = [...tableOrderList]
  .filter(order => {
    const basicInfo = `${order.tableNum}${order.userName}${order.phoneNum}`;
    const menuNames = Array.isArray(order.menuList)
      ? order.menuList.map(item => item.menuName).join('')
      : '';
    const searchTarget = basicInfo + menuNames;

    return !searchInput || searchTarget.includes(searchInput);
  })
  .sort((a, b) => {
    if (selectedFilterMenu === TABLE_MODAL_FILTER.recent) {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
    } else if (selectedFilterMenu === TABLE_MODAL_FILTER.price) {
      return b.totalPrice - a.totalPrice;
    } else {
      return 0;
    }
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClickRefreshButton = async () => {
    if (selectedTableNumIndex)
      await getAllOrderByTableNum({ boothId, tableNum: selectedTableNumIndex });
  };  

  useEffect(() => {
    if (boothId && selectedTableNumIndex !== null) {
      getAllOrderByTableNum({ boothId, tableNum: selectedTableNumIndex });
    }
  }, [boothId, selectedTableNumIndex]);  

  useEffect(() => {
    const interval = setInterval(() => {
      if (boothId && selectedTableNumIndex) {
        getAllOrderByTableNum({ boothId, tableNum: selectedTableNumIndex });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [boothId, selectedTableNumIndex]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilterMenu, searchMenu.current]);

  return (
    <div className="min-w-[900px] h-fit flex flex-col justify-start items-center bg-white rounded-2xl px-[40px] py-[50px] gap-5 max-h-full overflow-auto">
      <div className="w-full flex justify-between items-center gap-5 shrink-0 font-semibold text-xl text-primary-800 h-9">
        <div className="w-[18px] h-[18px] p-1"></div>
        {selectedTableNumIndex ? (
          <div>테이블 {getCustomTableNum(selectedTableNumIndex)} 주문내역 조회</div>
        ) : (
          <div>테이블 주문내역 조회</div>
        )}
        <IconClose
          onClick={() => closeModal()}
          className="cursor-pointer p-1 hover-bg-gray-100"
        />
      </div>

      {/* 필터링 + 주문추가 + 검색바 */}
      <div className="w-full flex justify-between">
        <div className="min-w-[320px] flex items-center gap-2"> 
          <div className="flex gap-[13px]">
            {Object.values(TABLE_MODAL_FILTER).map((orderMenu, index) => (
              <div
                key={index}
                className={`cursor-pointer text-sm ${selectedFilterMenu === orderMenu ? 'font-bold' : ''}`}
                onClick={() => setSelectedFilterMenu(orderMenu)}
              >
                {orderMenu}
              </div>
            ))}
          </div>
          <button
            className="is-button w-[70px] h-[30px] gap-1 text-xs flex justify-center items-center"
            onClick={() => openServiceModal()}
          >
            주문추가
          </button>
          <button
            className="is-button w-[90px] h-[30px] gap-1 text-xs flex justify-center items-center"
            onClick={() => handleClickRefreshButton()}
          >
            <IconRefreshVector onClick={() => handleClickRefreshButton()} className="w-4 h-4 p-[2px]" />
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="주문 검색"
            className="grow focus:outline-none text-sm"
          />
          <button
            className="w-[75px] h-[30px] rounded-xl text-sm bg-primary-800 text-white"
          >
            Search
          </button>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="w-full">
        <div className="h-12 bg-gray-100 text-secondary-700 px-14 flex items-center border-b text-sm font-semibold">
          <div className="w-2 h-4 bg-gray-100" />
          <div className="w-[100px] text-center">주문번호</div>
          <div className="w-[100px] text-center">주문자</div>
          <div className="w-[120px] text-center">주문금액</div>
          <div className="w-[100px] text-center">주문 시간</div>
          <div className="w-[120px] text-center">조리완료시간</div>
          <div className="w-[100px] text-center">주문 상태</div>
          <div className="flex-1" />
        </div>

        {paginatedOrders.map((order, index) => {
          const isOpen = expandedId === order.orderId;

          return (
            <div key={index}>
              <div
                className="h-12 px-14 flex items-center border-b text-sm cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(isOpen ? null : order.orderId)}
              >
                <div className={`w-2 h-6 ${
                  order.orderType === "FINISH"
                    ? "bg-success-50"
                    : order.orderType === "WAIT_DEPOSIT"
                    ? "bg-danger-50"
                    : order.orderType === "COOKING"
                    ? "bg-primary-800-light-16"
                    : "bg-gray-200"
                }`} />
                <div className="w-[100px] text-center">{order?.orderNum ?? '-'}</div>
                <div className="w-[100px] text-center">{order?.userName ?? '-'}</div>
                <div className="w-[120px] text-center">{prettyPrice(order?.totalPrice ?? 0)}</div>
                <div className="w-[100px] text-center">{order?.createAt?.slice(11, 16) ?? '-'}</div>
                <div className="w-[120px] text-center">{order?.finishAt?.slice(11, 16) ?? '-'}</div>
                <div className="w-[100px] text-center">
                  <div
                    className={`w-[100px] py-2 rounded-lg text-secondary-700 text-xs text-center font-semibold items-center justify-center ${
                      order.orderType === "FINISH"
                        ? "bg-success-50"
                        : order.orderType === "WAIT_DEPOSIT"
                        ? "bg-danger-50"
                        : order.orderType === "COOKING"
                        ? "bg-primary-800-light-16"
                        : "bg-gray-200"
                    }`}
                  >
                    {ORDER_TYPE[order.orderType] ?? '-'}
                  </div>
                </div>
                <div className="flex-1 text-right">▼</div>
              </div>

              {isOpen && order && (
                <div className="bg-gray-50 px-20 py-3 text-sm text-gray-700 border-b">
                  <div className="grid grid-cols-3 gap-2 border-b pb-1 mb-2">
                    <div className="font-semibold">메뉴</div>
                    <div className="font-semibold">수량</div>
                    <div className="font-semibold">가격</div>
                  </div>
                  {order.menuList.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 py-1">
                      <div>{item.menuName}</div>
                      <div>{item.menuCount}개</div>
                      <div>{prettyPrice(item.menuPrice)}</div>
                    </div>
                  ))}
                  <div className="mt-2 font-bold text-right">
                    {prettyPrice(order.menuList.reduce((acc, item) => acc + item.menuPrice * item.menuCount, 0))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

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