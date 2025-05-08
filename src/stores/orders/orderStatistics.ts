import { create } from 'zustand';
import { api } from '@/utils/api';

type BoothInfo = {
  boothId?: string;
  adminName?: string;
  // 필요 시 필드 추가
};

export type Statistic = {
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuSale: number;
};

export type OrderStatisticState = {
  menuSaleList: Statistic[];
  totalSale: number;
};

type OrderStatisticsStore = {
  allOrderStatistics: OrderStatisticState;
  boothInfo: BoothInfo;
  setBoothInfo: (booth: BoothInfo) => void;
  getStatistics: (params: { boothId: string; date: number; type: string }) => Promise<void>;
};

export const useOrderStatistics = create<OrderStatisticsStore>((set) => ({
  allOrderStatistics: {
    menuSaleList: [],
    totalSale: 0,
  },
  boothInfo: {},

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