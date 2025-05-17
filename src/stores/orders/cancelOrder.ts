import { create } from 'zustand';
import { api } from '@/utils/api';
import { CancelOrderStore } from '@/types/orders/order.types';

export const useCancelOrder = create<CancelOrderStore>((set) => ({
  cancelList: [],

  getCancelOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/cancel/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ cancelList: data.data });
        return true;
      } else {
        set({ cancelList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ cancelList: [] });
      return false;
    }
  },

  initCancelOrderList: () => {
    set({ cancelList: [] });
  },
}));