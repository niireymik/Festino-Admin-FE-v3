import { create } from 'zustand';
import { api, alertError } from '@/utils/api';
import { useTableStatusOrder } from '@/stores/orders/tableStatusOrder';
import { useBaseModal } from '../commons/baseModal';
import { OrderItem, ServiceModalStore } from '@/types/modals/modal.types';

export const useServiceModal = create<ServiceModalStore>((set, get) => {
  const baseModal = useBaseModal.getState();
  const baseOrder = useTableStatusOrder.getState();

  const saveServiceByTableNum = async (
    tableNum: string,
    orders: OrderItem[],
    isService: boolean
  ) => {
    const totalPrice = orders.reduce((acc, cur) => acc + cur.menuPrice * cur.menuCount, 0);
    const menus = orders.map(({ tableNum, isService, ...menuInfo }) => ({ ...menuInfo }));

    const boothId = baseOrder.boothId;

    try {
      const response = await api.post(`/admin/booth/${boothId}/order/service`, {
        tableNum: Number(tableNum),
        menuInfo: menus,
        totalPrice,
        note: get().memo,
        isService,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    menuList: [],
    memo: '',

    openServiceModal: () => {
      baseModal.setModalType('serviceModal');
      baseModal.openModal();
    },

    getMenuList: async () => {
      const boothId = baseOrder.boothId;
      try {
        const response = await api.get(`/admin/menu/all/booth/${boothId}`);
        if (response.data.success) {
          set({ menuList: response.data.menuList });
        } else {
          set({ menuList: [] });
          alertError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alertError(error);
        set({ menuList: [] });
      }
    },

    saveService: async (orderList: Record<string, OrderItem[]>) => {
      const orderListArray = Object.entries(orderList).map(([tableNum, orders]) => ({
        tableNum,
        orders,
      }));

      const serviceOrder = orderListArray
        .map(({ tableNum, orders }) => ({
          tableNum,
          orders: orders.filter((order) => order.isService),
        }))
        .filter(({ orders }) => orders.length > 0);

      const generalOrder = orderListArray
        .map(({ tableNum, orders }) => ({
          tableNum,
          orders: orders.filter((order) => !order.isService),
        }))
        .filter(({ orders }) => orders.length > 0);

      try {
        await Promise.all([
          ...serviceOrder.map(({ tableNum, orders }) => saveServiceByTableNum(tableNum, orders, true)),
          ...generalOrder.map(({ tableNum, orders }) => saveServiceByTableNum(tableNum, orders, false)),
        ]);
        set({ memo: '' });
        alert('주문이 완료되었습니다.');
        baseModal.closeModal();
      } catch (error) {
        console.error(error);
        alertError(error);
        baseModal.closeModal();
      }
    },

    setMemo: (text: string) => set({ memo: text }),
  };
});