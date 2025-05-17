import { create } from 'zustand';
import { api } from '@/utils/api';

interface DateStore {
  nowDate: number;
  getNowDate: () => Promise<void>;
}

export const useDate = create<DateStore>((set) => ({
  nowDate: 0,

  getNowDate: async () => {
    try {
      const response = await api.get('/admin/date');
      const date = Number(response.data);

      if (date > 3 || date < 0) {
        alert('Date Error, Please try again!');
        set({ nowDate: 0 });
        return;
      }

      set({ nowDate: 3 });
    } catch (error) {
      console.error('Failed to fetch date:', error);
      set({ nowDate: 0 });
    }
  },
}));