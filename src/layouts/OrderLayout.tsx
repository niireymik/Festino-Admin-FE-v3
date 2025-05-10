import { ORDER_CATEGORY } from "@/constants/constant";
import { useBaseOrder } from "@/stores/orders/baseOrdrer";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const OrderLayout : React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isStatistics = useRef<boolean>(false);
  const { currentCategory, setCurrentCategory } = useBaseOrder();

  useEffect(() => {
    if (currentCategory === "statistics") {
      isStatistics.current = true;
    } else {
      isStatistics.current = false;
    }
  }, [pathname]);

  return (
    <div className="flex flex-col px-4 gap-[40px] min-w-[630px] pb-20">
      {/* Header */}
      <div className="flex justify-between pt-[50px] lg:pt-[100px] min-w-[670px] gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-cover bg-order-icon" />
          <div className="text-primary-800 text-xl md:text-2xl font-semibold">주문 조회</div>
        </div>
      </div>

      {/* 주문 카테고리 버튼 */}
      <div className="flex gap-[10px] overflow-x-auto pb-[20px]">
        {Object.entries(ORDER_CATEGORY).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setCurrentCategory(key);
              console.log(currentCategory)
              navigate(`/order/${currentCategory}`);
            }}
            className={`is-button w-[120px] h-[40px] text-sm rounded-[16px] select-none ${
              !pathname.includes(key) ? "is-outlined" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      {!isStatistics && (
        <>
          {/* 필터 + 리프레시 */}
          <div className="flex justify-between items-center pb-[10px]">
            <div className="flex gap-[14px]">
              {["최신순", "과거순"].map((filter, idx) => (
                <div key={idx} className="cursor-pointer text-secondary-700-light hover:text-secondary-700 font-medium">
                  {filter}
                </div>
              ))}
            </div>
            <div className="flex gap-[14px] items-center">
              <button className="is-button w-[100px] h-[40px] rounded-[16px] text-sm">주문 추가</button>
              <div className="w-6 h-6 bg-refresh-icon cursor-pointer" />
            </div>
          </div>
    
          {/* 주문 카드 목록 */}
          <div className="bg-primary-700-light rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="xl:w-[207px] w-[160px]"></div>
              <div className="font-bold text-primary-800 xl:text-2xl text-xl">테이블 주문 현황</div>
              <div className="xl:w-[207px] w-[160px] h-[54px] bg-white rounded-2xl flex justify-center items-center gap-3">
                <div className="text-secondary-700-lighter font-bold">현재 주문 수</div>
                <div className="text-[22px] font-bold text-primary-800">3개</div>
              </div>
            </div>
    
            <div className="py-7 grid gap-x-[22px] gap-y-4 grid-rows-2" style={{ gridTemplateColumns: `repeat(3, 1fr)` }}>
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div key={i} className="w-full min-w-[240px] h-[124px] bg-white rounded-2xl p-[18px] flex justify-between font-bold">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-2xs text-secondary-700-lighter">테이블</div>
                      <div className="text-xl text-primary-900-lighter">3번</div>
                    </div>
                    <div>
                      <div className="text-2xs text-secondary-700-lighter">주문시간</div>
                      <div className="text-xl text-primary-900-lighter">14:30</div>
                    </div>
                  </div>
                  <div className="grid grid-rows-3 text-secondary-700-light text-sm w-[100px]">
                    <div className="flex justify-between">
                      <div>서빙현황</div>
                      <div className="font-normal">2/2</div>
                    </div>
                    <div className="flex justify-between">
                      <div>주문내역</div>
                      <div className="w-4 h-4 bg-detail-icon" />
                    </div>
                    <div className="flex justify-between">
                      <div>완료</div>
                      <div className="w-4 h-4 bg-check-icon" />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center text-xl font-medium text-secondary-900 mt-4">
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                className="w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
              >
                {page}
              </div>
            ))}
          </div>
          </div>
        </>
      )}
        
      <Outlet />
    </div>
  );
};

export default OrderLayout;