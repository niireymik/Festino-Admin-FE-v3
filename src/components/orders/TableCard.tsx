import { useTableVisualizationDetail } from "@/stores/orders/tableVisualization";
import { TableCardProps } from "@/types/orders/order.types";
import { prettyPrice } from "@/utils/utils";

const TableCard: React.FC<TableCardProps> = ({ type }) => {
  const { openTableVisualDetail } = useTableVisualizationDetail();

  return (
    <>
      {/* 가장 최근 주문 건이 입금대기인 테이블 */}
      {type === 'ready' && (
        <div 
          className={`cursor-pointer select-none w-36 h-36 xl:w-40 xl:h-40 p-3 bg-danger-50 rounded-xl flex flex-col justify-between text-secondary-700 hover:bg-danger-600-light-40`}
          onClick={() => openTableVisualDetail()}
        >
          {/* 테이블 번호 */}
          <div className="font-semibold text-center">테이블 1</div>
          <div className="flex flex-col items-end">
            {/* 주문상태 */}
            <div className={`text-right w-fit rounded-full text-danger-800 font-medium`}>입금대기</div>
            {/* 총 금액 */}
            <div className="font-semibold text-secondary-700">{prettyPrice(34000)}</div>
          </div>
        </div>
      )}

      {/* 가장 최근 주문 건이 조리중인 테이블 */}
      {type === 'cooking' && (
        <div 
          className={`cursor-pointer select-none w-36 h-36 xl:w-40 xl:h-40 p-3 bg-primary-300 rounded-xl flex flex-col justify-between text-secondary-700 hover:bg-primary-800-light-50`}
          onClick={() => openTableVisualDetail()}
        >
          {/* 테이블 번호 */}
          <div className="font-semibold text-center">테이블 1</div>
          <div className="flex flex-col items-end">
            {/* 주문상태 */}
            <div className={`text-right w-fit rounded-full text-primary-800 font-medium`}>조리중</div>
            {/* 총 금액 */}
            <div className="font-semibold text-secondary-700">{prettyPrice(34000)}</div>
          </div>
        </div>
      )}

      {/* 가장 최근 주문 건이 조리완료인 테이블 */}
      {type === 'finish' && (
        <div 
          className={`cursor-pointer select-none w-36 h-36 xl:w-40 xl:h-40 p-3 bg-success-50 rounded-xl flex flex-col justify-between text-secondary-700 hover:bg-success-800-light-70`}
          onClick={() => openTableVisualDetail()}
        >
          {/* 테이블 번호 */}
          <div className="font-semibold text-center">테이블 1</div>
          <div className="flex flex-col items-end">
            {/* 주문상태 */}
            <div className={`text-right w-fit rounded-full text-success-900 font-medium`}>조리완료</div>
            {/* 총 금액 */}
            <div className="font-semibold text-secondary-700">{prettyPrice(34000)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableCard;