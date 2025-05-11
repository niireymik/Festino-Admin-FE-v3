import { create } from 'zustand';
import { api, alertError } from '@/utils/api';
import { useBaseOrder } from '@/stores/orders/tableStatusOrder';
import { useBaseModal } from '../commons/baseModal';

interface MenuItem {
  menuId: string;
  menuName: string;
  menuPrice: number;
  [key: string]: any;
}

interface OrderItem {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuCount: number;
  isService?: boolean;
  tableNum?: number;
  [key: string]: any;
}

interface ServiceModalStore {
  menuList: MenuItem[];
  memo: string;
  openServiceModal: () => void;
  getMenuList: () => Promise<void>;
  saveService: (orderList: Record<string, OrderItem[]>) => Promise<void>;
  setMemo: (text: string) => void;
}

export const useServiceModal = create<ServiceModalStore>((set, get) => {
  const baseModal = useBaseModal.getState();
  const baseOrder = useBaseOrder.getState();

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
        // isCoupon 필드 제거됨
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