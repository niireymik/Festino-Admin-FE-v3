import React, { useEffect, useMemo, useState } from 'react';
import { prettyPrice } from '@/utils/utils';
import { useServiceModal } from '@/stores/orders/serviceModal';
import { useTableDetail } from '@/stores/booths/tableDetail';
import { useBaseModal } from '@/stores/commons/baseModal';
import IconClose from '../icons/IconClose';
import IconRadio from '../icons/IconRadio';
import { useTableStatusOrder } from '@/stores/orders/tableStatusOrder';
import { useCookies } from 'react-cookie';
import IconDropDown from '../icons/IconDropDown';
import IconSearch from '../icons/IconSearch';
import IconDelete from '../icons/IconDelete';
import IconOrderMinus from '../icons/IconOrderMinus';
import IconOrderPlus from '../icons/IconOrderPlus';
import IconTrash from '../icons/IconTrash';
import { MenuItem, OrderItem, TableItem } from '@/types/modals/modal.types';

const ServiceOrderModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { getMenuList, saveService, memo, setMemo, menuList } = useServiceModal();
  const { tableNumList } = useTableDetail();

  const [isService, setIsService] = useState(true);
  const [selectedTables, setSelectedTables] = useState<TableItem[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<MenuItem[]>([]);
  const [searchTable, setSearchTable] = useState('');
  const [searchMenu, setSearchMenu] = useState('');

  const [orderList, setOrderList] = useState<Record<number, OrderItem[]>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState<boolean>(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState<boolean>(false);

  const { boothId, setBoothId } = useTableStatusOrder();
  const [cookies] = useCookies(['boothId']);

  useEffect(() => {
    // Zustand 상태가 비어 있고, 쿠키에 boothId가 있으면 복원
    if (!boothId && cookies.boothId) {
      setBoothId(cookies.boothId);
    }
    getMenuList();
  }, [boothId, cookies.boothId]);

  // 선택한 테이블 번호/메뉴 전체 삭제
  const handleClickTotalDelete = (type: string) => {
    if(type === 'table') setSelectedTables([]);
    else  setSelectedMenus([]);
  };

  // 테이블 선택
  const selectTable = (tableNumIndex: number, customTableNum: string) => {
    const index = selectedTables.findIndex((table) => table.tableNumIndex === tableNumIndex);
    if (index === -1) selectedTables.push({ tableNumIndex, customTableNum });
    else selectedTables.splice(index, 1);
  };

  // 메뉴 선택
  const selectMenus = (menu: MenuItem) => {
    const index = selectedMenus.indexOf(menu);
    if (index === -1) selectedMenus.push(menu);
    else selectedMenus.splice(index, 1);
  };

  // toggle 상태 관리
  const toggleDropdown = (type: string) => {
    if (type === 'table') {
      setIsMenuDropdownOpen(false);
      setIsTableDropdownOpen(!isTableDropdownOpen);
    } else if (type === 'menu') {
      setIsTableDropdownOpen(false);
      setIsMenuDropdownOpen(!isMenuDropdownOpen);
    }
  };

  // 주문 추가
  const addOrderList = () => {
    if (!selectedTables.length || !selectedMenus.length) {
      alert('테이블 번호와 메뉴를 선택해 주세요.');
      return;
    }

    selectedTables.forEach((table) => {
      selectedMenus.forEach((menu) => {
        // 서비스이면 가격 0원으로 적용
        const price = isService ? 0 : menu.menuPrice;

        const currentTableOrders = orderList[table.tableNumIndex] || [];

        const existingOrder = currentTableOrders.find((order) => {
          order.menuId === menu.menuId && order.menuPrice === price;
        });

        if (existingOrder) {
          existingOrder.menuCount += 1;
        } else {
          currentTableOrders.push({
            menuId: menu.menuId,
            menuName: menu.menuName,
            menuCount: 1,
            menuPrice: price,
            isService: isService
          });
        }

        orderList[table.tableNumIndex] = currentTableOrders;

        const total = totalPrice + price;

        setTotalPrice(total);
      });
    });
  };

  // 커스텀된 테이블 정보 가져오기
  const getTableCustomNum = (tableNum: string) => {
    const tableInfo = tableNumList.find((table) => table.tableNumIndex === Number(tableNum));
    return tableInfo?.customTableNum;
  };

  // 테이블 총 금액
  const getTableTotalPrice = (orders: OrderItem[]) => {
    return prettyPrice(orders.reduce((acc, cur) => acc + cur.menuPrice * cur.menuCount, 0));
  };

  // 메뉴 수량 감소
  const handleClickMenuMinus = (tableNum: string, menu: MenuItem) => {
    const findOrder = orderList[Number(tableNum)]?.find(
      (order) => order.menuId && order.menuPrice === menu.menuPrice
    );

    if(!findOrder || findOrder.menuCount === 0) return;

    if(findOrder.menuCount > 0) {
      findOrder.menuCount -= 1;
      
      const total = totalPrice - findOrder.menuPrice;
      setTotalPrice(total);
    }
  };

  // 메뉴 수량 증가
  const handleClickMenuPlus = (tableNum: string, menu: MenuItem) => {
    const findOrder = orderList[Number(tableNum)]?.find(
      (order) => order.menuId && order.menuPrice === menu.menuPrice
    );

    if(!findOrder || findOrder.menuCount === 99) return;

    if(findOrder.menuCount < 99) {
      findOrder.menuCount += 1;
      
      const total = totalPrice + findOrder.menuPrice;
      setTotalPrice(total);
    }
  };

  // 주문 삭제
  const handleClickDeleteOrder = (tableNum: string, menu: MenuItem) => {
    const orders = orderList[Number(tableNum)];
    if (!orders) return;

    const orderIndex = orders.findIndex((order) => order.menuId === menu.menuId && order.menuPrice === menu.menuPrice);
    if (orderIndex === -1) return;

    const total = totalPrice - orders[orderIndex].menuPrice * orders[orderIndex].menuCount;
    setTotalPrice(total);
    orders.splice(orderIndex, 1);

    if (orders.length === 0) {
      delete orderList[Number(tableNum)];
    }
  };

  const handleClickSaveButton = () => {
    if(Object.keys(orderList).length === 0) {
      alert('주문을 추가해주세요.');
      return;
    }
    saveService(orderList);
  };

  const filteredTableList = useMemo(() => {
    if(!searchTable) return tableNumList;
    return tableNumList.filter((table) => {
      String(table.tableNumIndex).includes(searchTable) || table.customTableNum.includes(searchTable);
    });
  }, [tableNumList, searchTable])
  
  const filteredMenuList = useMemo(() => {
    if (!searchMenu) return menuList;
    return menuList.filter((menu) => menu.menuName.includes(searchMenu));
  }, [menuList, searchMenu]);

  return (
    <>
      <div className="min-w-[730px] h-fit flex flex-col justify-start items-center bg-white rounded-2xl px-[60px] py-[50px] gap-5 max-h-full overflow-auto">
        <div className="w-full flex justify-between items-center gap-5 shrink-0 font-semibold text-xl text-primary-800 h-9">
          <div className="w-[18px] h-[18px] p-1"></div>
          주문 추가
          <IconClose
            onClick={() => closeModal()}
            className="cursor-pointer p-1 hover-bg-gray-100"
          />
        </div>

        {/* 주문 타입 + 드롭다운 */}
        <div 
          className="flex flex-col grow overflow-y-auto w-full gap-5"
          id='orderContainer'
        >
          <div className="flex flex-col gap-3 px-1">
            {/* 주문/서비스 */}
            <div className="flex items-center w-full gap-5">
              <div className="flex items-center gap-[28px]">
                <div 
                  className="flex gap-2 cursor-pointer items-center text-sm"
                  onClick={() => setIsService(true)}
                >
                  <IconRadio isActive={isService} />
                  <div>서비스 주문</div>
                </div>
              </div>
              <div className="flex items-center gap-[28px]">
                <div
                  className="flex gap-2 cursor-pointer items-center text-sm"
                  onClick={() => setIsService(false)}
                >
                  <IconRadio isActive={!isService} />
                  <div>일반 주문</div>
                </div>
              </div>
            </div>

            {/* 테이블 선택 드롭다운 */}
            <button
              id="dropdownSearchButton"
              data-dropdown-toggle="dropdownSearch"
              data-dropdown-placement="bottom"
              className={`w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center justify-between ${
                selectedTables.length > 0 ? 'is-button ' : 'is-button is-outlined'
              }`}
              type="button"
              onClick={() => toggleDropdown('table')}
            >
              테이블 번호를 선택해주세요.
              <IconDropDown />
            </button>

            {/* 드롭다운 테이블 아이템 */}
            <div
              id="dropdownSearch"
              className={`z-10 bg-white rounded-lg shadow w-full ${
                isTableDropdownOpen ? '' : 'hidden'
              }`}
            >
              <label form="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IconSearch fillColor="#888888" />
                </div>
                <input 
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="테이블 번호 검색"
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                />
              </div>
              <ul className="py-2 text-xs" aria-labelledby="dropdownSearchButton">
                {filteredTableList.map((table) => (
                  <li
                    key={table.tableNumIndex}
                    onClick={() => selectTable(table.tableNumIndex, table.customTableNum)}
                    className="flex items-center ps-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                      <input
                        type="checkbox"
                        value={table.tableNumIndex}
                        checked={!!selectedTables.find((selectedTable) => selectedTable.tableNumIndex === table.tableNumIndex)}
                        readOnly
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="w-full py-2 ms-2 text-xs font-medium text-gray-900 rounded">
                        {table.tableNumIndex} - {table.customTableNum}번 테이블
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="flex items-center justify-center p-2 text-xs text-danger-800 border-t border-gray-200 rounded-b-lg bg-gray-50 font-bold"
                onClick={() => handleClickTotalDelete('table')}
              >
                전체 삭제
              </a>
            </div>

            {selectedTables.length > 0 && (
              <div className="flex gap-3 w-full items-start flex-wrap">
                {selectedTables.map((table) => 
                  <div
                    key={table.tableNumIndex}
                    className="is-button is-outlined px-[15px] text-base flex items-center place-items-center gap-1 h-[28px] flex-shrink-0"
                  >
                    {table.customTableNum}
                    <IconDelete
                      onClick={() => selectTable(table.tableNumIndex, table.customTableNum)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 메뉴 선택 드롭다운 */}
            <button
              id="dropdownSearchButton"
              data-dropdown-toggle="dropdownSearch"
              data-dropdown-placement="button"
              className={`w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center justify-between ${
                selectedMenus.length > 0 ? 'is-button' : 'is-button is-outlined'
              }`}
              type="button"
              onClick={() => toggleDropdown('menu')}
            >
              메뉴를 선택해주세요.
              <IconDropDown />
            </button>

            {/* 메뉴 드롭다운 아이템 */}
            <div
              id="dropdownSearch"
              className={`z-10 bg-white rounded-lg shadow w-full ${
                isMenuDropdownOpen ? '' : 'hidden'
              }`}
            >
              <label form="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IconSearch fillColor="#888888" />
                </div>
                <input 
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="메뉴 검색"
                  value={searchMenu}
                  onChange={(e) => setSearchMenu(e.target.value)}
                />
              </div>
              <ul className="py-2 text-xs" aria-labelledby="dropdownSearchButton">
                {filteredMenuList.map((menu) => (
                  <li
                    key={menu.menuId}
                    value={menu.menuName}
                    onClick={() => selectMenus(menu)}
                    className="flex items-center ps-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center ps-2 rounded hover:bg-gray-100">
                      <input
                        type="checkbox"
                        value={menu.menuName}
                        checked={selectedMenus.includes(menu)}
                        onChange={() => selectMenus(menu)}
                      />
                      <label className="w-full py-2 ms-2 text-xs font-medium text-gray-900 rounded">{menu.menuName}</label>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="flex items-center justify-center p-2 text-xs text-danger-800 border-t border-gray-200 rounded-b-lg bg-gray-50 font-bold"
                onClick={() => handleClickTotalDelete('menu')}
              >
                전체 삭제
              </a>
            </div>

            {selectedMenus.length > 0 && (
              <div className="flex gap-3 w-full items-start flex-wrap">
                {selectedMenus.map((menu) => (
                  <div
                    key={menu.menuId}
                    className="is-button is-outlined px-[15px] text-base flex items-center place-items-center gap-1 h-[28px] flex-shrink-0"
                  >
                    {menu.menuName}
                    <IconDelete 
                      onClick={() => selectMenus(menu)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="w-full flex justify-end items-center gap-5">
              <button
                className="is-button is-outlined w-[58px] h-[28px] font-semibold rounded-full text-sm"
                type="button"
                onClick={() => addOrderList()}
              >
                추가
              </button>
            </div>
          </div>

          {/* 주문 목록 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-md font-medium">주문 목록</div>

            <div className="w-full bg-primary-800-light border border-primary-700 rounded-xl text-secondary-700-light">
              {Object.entries(orderList).map(([tableNum, orders], index) => (
                <div key={tableNum}>
                  <div
                    className={`flex justify-between border-primary-200 font-semibold px-3 h-10 items-center border-b ${
                      index === 0 ? "" : "border-t"
                    }`}
                  >
                    <div className="text-left">{getTableCustomNum(tableNum)}번 테이블</div>
                    <div className="text-right">총 가격 : {getTableTotalPrice(orders)}</div>
                  </div>

                  <div className="grid grid-cols-2 bg-white">
                    {orders.map((order, orderIndex) => {
                      const isLastRow =
                        Math.ceil((orderIndex + 1) / 2) === Math.ceil(orders.length / 2);
                      return (
                        <div
                          key={orderIndex}
                          className={`flex justify-between border-primary-200 px-3 min-h-16 h-fit items-center font-medium border-b ${
                            orderIndex % 2 === 0 ? "odd:border-r" : ""
                          } ${isLastRow ? "border-b-0" : ""}`}
                        >
                          <div className="flex flex-col">
                            <div>{order.menuName}</div>
                            <div>{prettyPrice(order.menuPrice)}</div>
                          </div>

                          <div className="flex gap-3 justify-center items-center">
                            <div className="w-[100px] h-[30px] bg-primary-800-light flex items-center justify-around rounded-[20px]">
                              <IconOrderMinus
                                className="cursor-pointer"
                                onClick={() => handleClickMenuMinus(tableNum, order)}
                              />
                              <div>{order.menuCount}</div>
                              <IconOrderPlus
                                className="cursor-pointer"
                                onClick={() => handleClickMenuPlus(tableNum, order)}
                              />
                            </div>
                            <IconTrash
                              className="cursor-pointer"
                              onClick={() => handleClickDeleteOrder(tableNum, order)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {/* 총 금액 */}
              <div className="flex justify-between h-[51px] items-center font-semibold px-4">
                <div className="text-left text-primary-800">총 가격</div>
                <div className="text-right text-primary-800">{prettyPrice(totalPrice)}</div>
              </div>
            </div>
          </div>

          {/* 메모 */}
          <div className="w-full flex flex-col gap-1 px-1">
            <div className="w-full text-md">메모</div>
            <textarea
              maxLength={50}
              value={memo}
              placeholder="메모를 작성해주세요"
              className="w-full h-[70px] resize-none text-sm rounded-xl p-[14px] border-secondary-150 border-1"
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          {/* 취소/추가 버튼 */}
          <div className="w-full flex justify-end items-center gap-3">
            <button
              className="is-button is-outlined w-[80px] h-8 text-sm"
              type="button"
              onClick={() => closeModal()}
            >
              취소
            </button>
            <button
              className="is-button w-[100px] h-8 text-sm"
              onClick={() => handleClickSaveButton()}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceOrderModal;