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
  menuInfo: MenuInfoType[];
}

export interface MenuInfoType {
  menuId: string;
  menuName: string;
  menuCount: number;
  menuPrice: number;
}

export interface TableVisualizationStore {
  tableList: TableItemType[];
  getAllTableVisualization: (params: { boothId: string, date: number }) => Promise<void>;
  openTableVisualDetail: () => void;
  closeTableVisualDetail: () => void;
}

export const useTableVisualizationDetail = create<TableVisualizationStore>((set) => {
  const baseModal = useBaseModal.getState();
  
  return {
    tableList: [],

    getAllTableVisualization: async ({ boothId, date }) => {
      try {
        const response = await api.get(`/admin/booth/${boothId}/order/visualization/${date}`);
        const data = response.data;

        if (data.success) {
          set({ tableList: data.data });
        } else {
          set({ tableList: [] });
        }
      } catch (error) {
        set({ tableList: [] });
      }
    },

    openTableVisualDetail: () => {
      baseModal.setModalType('tableVisualizationModal');
      baseModal.openModal();
    },
  
    closeTableVisualDetail: () => {
      baseModal.closeModal();
    },
  };
})