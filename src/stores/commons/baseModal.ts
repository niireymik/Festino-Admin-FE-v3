import { BaseModalStore } from '@/types/modals/modal.types';
import { create } from 'zustand';

export const useBaseModal = create<BaseModalStore>((set) => ({
  isModalOpen: false,
  isMobileModalOpen: false,
  modalType: '',

  setModalType: (type) => set({ modalType: type }),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  openMobileModal: () => set({ isMobileModalOpen: true }),

  closeMobileModal: (type?: string) => {
    if (type !== 'mobileLoading') {
      set({ isMobileModalOpen: false });
    }
  },
}));