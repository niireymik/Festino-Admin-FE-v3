import React from 'react';
import IconOrderDetail from '@/components/icons/IconOrderDetail';
import IconOrderCheck from '@/components/icons/IconOrderCheck';
import { useTableDetail } from '@/stores/booths/tableDetail';
import { getHourandMinute } from '@/utils/utils';
import { useOrderPopup } from '@/stores/orders/orderPopup';
import { useBaseOrder } from '@/stores/orders/tableStatusOrder';
import { api } from '@/utils/api';

interface TableOrder {
  tableNum: number;
  createAt?: string;
  servedCount: number;
  totalCount: number;
  orderId: string;
  orderType: string;
}

interface Props {
  tableOrder: TableOrder;
}

const TableOrderItem: React.FC<Props> = ({ tableOrder }) => {
  const { getCustomTableNum } = useTableDetail();
  const { openPopup } = useOrderPopup();
  const { boothId } = useBaseOrder();

  const isFinish = (order: TableOrder): boolean => {
    return order.servedCount === order.totalCount;
  };

  const getDetailOrder = async (orderId: string) => {
    try {
      const response = await api.get(`/admin/booth/${boothId}/order/${orderId}`);
      const data = response.data;
      return data.success ? data.orderInfo : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleClickOrderDetail = async (orderId: string, orderType: string) => {
    const orderInfo = await getDetailOrder(orderId);
    if (orderInfo) {
      openPopup({
        type: 'detail',
        selectOrderInfo: { ...orderInfo, orderType },
        selectMenuInfoList: orderInfo.menuList,
      });
    }
  };

  const handleClickOrderFinish = async () => {
    if (!isFinish(tableOrder)) return;
    const orderInfo = await getDetailOrder(tableOrder.orderId);
    if (orderInfo) {
      openPopup({
        type: 'complete',
        selectOrderInfo: { ...orderInfo, orderType: tableOrder.orderType },
        selectMenuInfoList: orderInfo.menuList,
      });
    }
  };

  return (
    <div className="w-full min-w-[238px] h-[124px] bg-white rounded-2xl p-[18px] flex justify-between font-bold">
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-2xs text-primary-800-light-50">테이블</div>
          <div className="text-xl text-primary-800-light-70 -translate-y-1 max-w-[130px] truncate">
            {getCustomTableNum(tableOrder.tableNum)}번
          </div>
        </div>
        <div>
          <div className="text-2xs text-primary-800-light-50 translate-y-1">주문시간</div>
          <div className="text-xl text-primary-800-light-70">
            {getHourandMinute(tableOrder?.createAt)}
          </div>
        </div>
      </div>

      <div className="grid grid-rows-3 text-secondary-700-light text-sm w-[100px]">
        <div className="flex items-start justify-between">
          <div>서빙현황</div>
          <div className="font-normal">{tableOrder.servedCount}/{tableOrder.totalCount}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>주문내역</div>
          <IconOrderDetail
            className="justify-self-end -translate-x-[3px] cursor-pointer"
            onClick={() => handleClickOrderDetail(tableOrder.orderId, tableOrder.orderType)}
          />
        </div>
        <div className="flex items-end justify-between">
          <div>완료</div>
          <IconOrderCheck
            className={`justify-self-end ${!isFinish(tableOrder) ? 'cursor-not-allowed' : ''}`}
            isActive={isFinish(tableOrder)}
            onClick={handleClickOrderFinish}
          />
        </div>
      </div>
    </div>
  );
};

export default TableOrderItem;