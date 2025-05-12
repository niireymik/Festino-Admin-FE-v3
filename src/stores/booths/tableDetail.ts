import { create } from 'zustand';
import { api, alertError } from '@/utils/api';

interface TableItem {
  tableNumIndex: number;
  customTableNum: string;
}

interface TableDetailState {
  tableNumList: TableItem[];
  tableNum: number;
  getTableList: (boothId: string) => Promise<void>;
  submitTableDetail: (boothId: string) => Promise<boolean>;
  getCustomTableNum: (tableNum: number) => string;
  // openTableDetailModal: () => void;
  // closeTableDetailModal: () => void;
}

export const useTableDetail = create<TableDetailState>((set, get) => ({
  tableNumList: [],
  tableNum: 0,

  getTableList: async (boothId: string) => {
    try {
      const res = await api.get(`/admin/order/table/booth/${boothId}`);
      if (res.data.success) {
        set({
          tableNumList: res.data.tableNumList,
          tableNum: res.data.tableNumList.length,
        });
      } else {
        alertError(res.data.message);
      }
    } catch (error: any) {
      alertError(error?.message || '에러가 발생했습니다');
    }
  },

  submitTableDetail: async (boothId: string) => {
    try {
      const { tableNumList } = get();
      const res = await api.post('/admin/order/table', {
        boothId,
        tableNumList: tableNumList.map(({ tableNumIndex, customTableNum }) => ({
          tableNumIndex,
          customTableNum,
        })),
      });

      if (res.data.success) {
        return true;
      } else {
        alertError(res.data.message);
        return false;
      }
    } catch (error: any) {
      alertError(error?.message || '에러가 발생했습니다');
      return false;
    }
  },

  getCustomTableNum: (tableNum: number) => {
    const { tableNumList } = get();
    return tableNumList.find((table) => table.tableNumIndex === tableNum)?.customTableNum ?? tableNum.toString();
  },

//   openTableDetailModal: () => {
//     const modalStore = useModalStore.getState();
//     modalStore.openModal('tableDetail');
//   },

//   closeTableDetailModal: () => {
//     const modalStore = useModalStore.getState();
//     modalStore.closeModal();
//   },
}));