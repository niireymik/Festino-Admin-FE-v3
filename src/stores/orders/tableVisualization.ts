import { create } from "zustand";
import { useBaseModal } from "../commons/baseModal";

export interface TableVisualizationStore {
  orderList: string[];
  openTableVisualDetail: () => void;
  closeTableVisualDetail: () => void;
}

export const useTableVisualizationDetail = create<TableVisualizationStore>(() => {
  const baseModal = useBaseModal.getState();
  
  return {
    orderList: [],
    openTableVisualDetail: () => {
      baseModal.setModalType('tableVisualizationModal');
      baseModal.openModal();
    },
  
    closeTableVisualDetail: () => {
      baseModal.closeModal();
    },
  };
})