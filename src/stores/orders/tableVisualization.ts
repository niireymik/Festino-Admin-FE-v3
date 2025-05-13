import { create } from "zustand";
import { useBaseModal } from "../commons/baseModal";
import { TableVisualizationStore } from "@/types/modals/modal.types";

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