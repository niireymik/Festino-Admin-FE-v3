import { create } from 'zustand';
import { api } from '@/utils/api';
import { OrderStatisticsStore } from '@/types/orders/statistics.types';

export const useOrderStatistics = create<OrderStatisticsStore>((set) => ({
  type: 0,
  // allOrderStatistics: {
  //   menuSaleList: [],
  //   totalSale: 0,
  // },
  // 테스트용
  allOrderStatistics: {
    menuSaleList: [
      { menuName: '소떡소떡', menuPrice: 3000, menuCount: 12, menuSale: 36000 },
      { menuName: '닭꼬치', menuPrice: 4000, menuCount: 8, menuSale: 32000 },
      { menuName: '소떡소떡', menuPrice: 3000, menuCount: 50, menuSale: 36000 },
      { menuName: '닭꼬치', menuPrice: 4000, menuCount: 8, menuSale: 32000 },
      { menuName: '소떡소떡', menuPrice: 3000, menuCount: 12, menuSale: 36000 },
      { menuName: '닭꼬치', menuPrice: 4000, menuCount: 8, menuSale: 32000 },
      { menuName: '소떡소떡', menuPrice: 3000, menuCount: 12, menuSale: 36000 },
      { menuName: '닭꼬치', menuPrice: 4000, menuCount: 8, menuSale: 32000 },
    ],
    totalSale: 68000,
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