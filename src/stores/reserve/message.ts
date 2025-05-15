import { create } from 'zustand';
import { alertError, api } from '@/utils/api';
import { useBaseModal } from '../commons/baseModal';
import { useMessageModalStore } from './messageModal';

interface CustomMessage {
  message: string;
  messageType: number;
}

interface MessageStore {
  message: string;
  customMessageList: CustomMessage[];
  setMessage: (value: string) => void;
  getMessage: (boothId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  saveCustomMessage: (messages: CustomMessage[]) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  message: '',
  customMessageList: [
    { message: '', messageType: 0 },
    { message: '', messageType: 1 },
    { message: '', messageType: 2 },
  ],

  setMessage: (value) => set({ message: value }),

  getMessage: async (boothId) => {
    const baseModal = useBaseModal.getState();

    try {
      const response = await api.get('/admin/message/all', {
        params: { boothId },
      });

      if (response.data.success) {
        const list = response.data.customMessageList.map(({ message, messageType }: CustomMessage) => ({
          message,
          messageType,
        }));
        set({ customMessageList: list });
      } else {
        set({
          customMessageList: [
            { message: '', messageType: 0 },
            { message: '', messageType: 1 },
            { message: '', messageType: 2 },
          ],
        });
      }
    } catch (error) {
      console.error(error);
      alertError(error);
      baseModal.closeModal();
    }
  },

  sendMessage: async (message) => {
    const baseModal = useBaseModal.getState();
    const { messageInfo } = useMessageModalStore.getState();
    // const { boothInfo } = useBoothDetailStore.getState();

    // baseModal.closeModal();

    // if (!messageInfo?.phoneNum || !messageInfo?.userName || !boothInfo?.adminName) {
    //   return alertError('메시지 전송에 실패했습니다.');
    // }

    // baseModal.setModalType('loadingModal');
    // baseModal.openModal();

    // try {
    //   const response = await api.post('/admin/message/send', {
    //     phoneNum: messageInfo.phoneNum,
    //     userName: messageInfo.userName,
    //     adminName: boothInfo.adminName,
    //     message,
    //   });

    //   if (response.data === 'SEND_SUCCESS') {
    //     alert('메시지 전송에 성공했습니다.');
    //   } else {
    //     alert('메시지 전송에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alertError(error);
    // } finally {
    //   baseModal.closeModal();
    // }
  },

  saveCustomMessage: async (messages) => {
    const baseModal = useBaseModal.getState();
    // const { boothInfo } = useBoothDetailStore.getState();

    // try {
    //   const response = await api.post('/admin/message', {
    //     boothId: boothInfo?.boothId,
    //     customMessageList: messages,
    //   });

    //   if (response.data.success) {
    //     alert('메시지 수정에 성공했습니다.');
    //   } else {
    //     alert('메시지 수정에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alertError(error);
    // } finally {
    //   baseModal.closeModal();
    // }
  },
}));