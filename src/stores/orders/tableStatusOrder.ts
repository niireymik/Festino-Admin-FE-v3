import { create } from 'zustand';
import { api } from '@/utils/api';
import { TableStatusOrderStore } from '@/types/orders/order.types';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const initialBoothId = cookies.get('boothId') ?? '';

export const useTableStatusOrder = create<TableStatusOrderStore>((set) => ({
  orderCategories: ['realTime', 'ready', 'cooking', 'finish', 'cancel', 'statistics'],
  orderStatus: 'realTime',
  boothId: initialBoothId,
  orderList: [],

  setOrderStatus: (status) => set({ orderStatus: status }),

  setBoothId: (id) => set({ boothId: id }),

  initBaseOrder: () => set({ orderStatus: 'realTime' }),

  getAllTableOrders: async ({ boothId, date }) => {
    try {
      const response = await api.get(`/admin/booth/${boothId}/order/table/${date}`);
      const data = response.data;

      if (data.success) {
        set({ orderList: data.data });
      } else {
        set({ orderList: [] });
      }
    } catch (error) {
      console.error(error);
      set({ orderList: [] });
    }
  }
}));