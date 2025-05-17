import { create } from "zustand";
import { useBaseModal } from "../commons/baseModal";
import { api } from "@/utils/api";
// import { TableVisualizationStore } from "@/types/modals/modal.types";
export interface TableListType {
  success: boolean;
  message: string;
  result: TableItemType[];
}

export interface TableItemType {
  tableNumIndex: number;
  type: 'ready' | 'cooking' | 'complete';
  orderInfo: OrderInfoType | null;
}

export interface OrderInfoType {
  orderNum: number;
  orderId: string;
  orderType: string;
  boothId: string;
  tableNum: number;
  date: number;
  userName: string;
  phoneNum: string;
  note: string;
  totalPrice: number;
  isDeposit: boolean;
  isService: boolean;
  createAt: string; 
  finishAt: string; 
  menuList: MenuInfoType[];
}

export interface MenuInfoType {
  menuId: string;
  menuName: string;
  menuCount: number;
  menuPrice: number;
}

export interface TableVisualizationStore {
  tableList: TableItemType[];
  tableOrderList: OrderInfoType[];
  selectedTableNumIndex: number | null;
  getAllTableVisualization: (params: { boothId: string, date: number }) => Promise<void>;
  getAllOrderByTableNum: (params: { boothId: string, tableNum: number }) => Promise<void>;
  openTableVisualDetail: (params: { tableNumIndex: number }) => void;
  closeTableVisualDetail: () => void;
}

export const useTableVisualizationDetail = create<TableVisualizationStore>((set) => {
  const baseModal = useBaseModal.getState();

  return {
    tableList: [],
    tableOrderList: [],
    selectedTableNumIndex: null,

    getAllTableVisualization: async ({ boothId, date }) => {
      try {
        const response = await api.get(`/admin/booth/${boothId}/order/visualization/${date}`);
        set({ tableList: response.data.success ? response.data.data : [] });
      } catch {
        set({ tableList: [] });
      }
    },

    getAllOrderByTableNum: async ({ boothId, tableNum }) => {
      try {
        const response = await api.get(`/admin/booth/${boothId}/order/all/table/${tableNum}`);
        set({ tableOrderList: response.data.success ? response.data.data : [] });
      } catch {
        set({ tableOrderList: [] });
      }
    },

    openTableVisualDetail: ({ tableNumIndex }) => {
      set({ selectedTableNumIndex: tableNumIndex });
      baseModal.setModalType('tableVisualizationModal');
      baseModal.openModal();
    },

    closeTableVisualDetail: () => {
      baseModal.closeModal();
    },
  };
});