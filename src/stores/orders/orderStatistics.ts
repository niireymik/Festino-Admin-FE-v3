import { create } from 'zustand';
import { api } from '@/utils/api';
import { OrderStatisticsStore } from '@/types/orders/statistics.types';

export const useOrderStatistics = create<OrderStatisticsStore>((set) => ({
  type: "all",
  allOrderStatistics: {
    menuSaleList: [],
    totalSale: 0,
  },
  boothInfo: {},

  setType: (type) => {
    set({ type: type })
  },
  
  setBoothInfo: (booth) => {
    set({ boothInfo: booth });
  },

  getStatistics: async ({ boothId, date, type }) => {
    if (!boothId) return;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/statistic/${date}/${type}`);
      const data = response.data;

      if (data.success) {
        set({ allOrderStatistics: data.statistic });
      } else {
        set({ allOrderStatistics: { menuSaleList: [], totalSale: 0 } });
      }
    } catch (error) {
      console.error(error);
      set({ allOrderStatistics: { menuSaleList: [], totalSale: 0 } });
    }
  },
}));