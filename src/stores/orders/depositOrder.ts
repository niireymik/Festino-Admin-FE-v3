import { create } from 'zustand';
import { api } from '@/utils/api';
import { DepositOrderStore } from '@/types/orders/order.types';

export const useDepositOrder = create<DepositOrderStore>((set) => ({
  waitDepositList: [],

  getWaitDepositOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/deposit/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ waitDepositList: data.data });
        return true;
      } else {
        set({ waitDepositList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ waitDepositList: [] });
      return false;
    }
  },

  initWaitDepositOrderList: () => {
    set({ waitDepositList: [] });
  },
}));