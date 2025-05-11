import { create } from 'zustand';
import { api } from '@/utils/api';
import { CookingOrderStore } from '@/types/orders/order.types';

export const useCookingOrder = create<CookingOrderStore>((set) => ({
  cookingList: [],

  getCookingOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/cooking/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ cookingList: data.cookingList });
        return true;
      } else {
        set({ cookingList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ cookingList: [] });
      return false;
    }
  },

  initCookingOrderList: () => {
    set({ cookingList: [] });
  },
}));