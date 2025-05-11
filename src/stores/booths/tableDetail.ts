import { create } from 'zustand';
import { api, alertError } from '@/utils/api';
import { useBaseModal } from '../commons/baseModal';

interface TableInfo {
  tableNumIndex: number;
  customTableNum: string;
}

interface TableDetailState {
  tableNumList: TableInfo[];
  tableNum: number;

  openTableDetailModal: () => void;
  closeTableDetailModal: () => void;
  getTableList: (boothId: string) => Promise<void>;
  submitTableDetail: (boothId: string) => Promise<boolean | undefined>;
  getCustomTableNum: (tableNum: number) => string | number;
}

export const useTableDetail = create<TableDetailState>((set, get) => {
  const baseModal = useBaseModal.getState();

  return {
    tableNumList: [],
    tableNum: 0,

    openTableDetailModal: () => {
      baseModal.openModal();
      baseModal.setModalType('tableDetail');
    },

    closeTableDetailModal: () => {
      baseModal.closeModal();
    },

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
      } catch (error) {
        console.error(error);
        alertError(error);
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
      } catch (error) {
        console.error(error);
        alertError(error);
      }
    },

    getCustomTableNum: (tableNum: number) => {
      const { tableNumList } = get();
      return (
        tableNumList.find((table) => table.tableNumIndex === tableNum)?.customTableNum ?? tableNum
      );
    },
  };
});