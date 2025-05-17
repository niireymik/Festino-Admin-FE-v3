import { create } from 'zustand';
import { api } from '@/utils/api';
import { FinishOrderStore } from '@/types/orders/order.types';

export const useFinishOrder = create<FinishOrderStore>((set) => ({
  finishList: [],

  getFinishOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/finish/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ finishList: data.data });
        return true;
      } else {
        set({ finishList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ finishList: [] });
      return false;
    }
  },

  initFinishOrderList: () => {
    set({ finishList: [] });
  },
}));