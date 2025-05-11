import { create } from 'zustand';
import { api } from '@/utils/api';
import { TableStatusOrderStore } from '@/types/orders/order.types';

export const useTableStatusOrder = create<TableStatusOrderStore>((set) => ({
  orderCategories: ['realTime', 'ready', 'cooking', 'finish', 'cancel', 'statistics'],
  orderStatus: 'realTime',
  boothId: '',
  orderList: [],

  setOrderStatus: (status) => set({ orderStatus: status }),

  setBoothId: (id) => set({ boothId: id }),

  initBaseOrder: () => set({ orderStatus: 'realTime' }),

  getAllTableOrders: async ({ boothId, date }) => {
    try {
      const response = await api.get(`/admin/booth/${boothId}/order/table/${date}`);
      const data = response.data;

      if (data.success) {
        set({ orderList: data.orderList });
      } else {
        set({ orderList: [] });
      }
    } catch (error) {
      console.error(error);
      set({ orderList: [] });
    }
  }
}));