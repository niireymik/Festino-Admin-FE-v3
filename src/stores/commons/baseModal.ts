import { create } from 'zustand';

export interface BaseModalStore {
  isModalOpen: boolean;
  isMobileModalOpen: boolean;
  modalType: string;
  setModalType: (type: string) => void;
  openModal: () => void;
  closeModal: () => void;
  openMobileModal: () => void;
  closeMobileModal: (type?: string) => void;
}

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