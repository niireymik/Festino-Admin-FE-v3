import { create } from 'zustand';
import { alertError, api } from '@/utils/api';
import { useBaseModal } from '../commons/baseModal';
import { MessageInfo, useMessageModalStore } from './messageModal';
import { useBoothDetail } from '../booths/boothDetail';

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

export const useMessageStore = create<MessageStore>((set) => ({
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

  sendMessage: async (message: string) => {
    const baseModal = useBaseModal.getState();
    const rawMessageInfo = useMessageModalStore.getState().messageInfo;
    const { boothInfo } = useBoothDetail.getState();
  
    baseModal.closeModal();
  
    if (typeof rawMessageInfo !== 'object' || rawMessageInfo === null) {
      return alertError('예약자 정보가 유효하지 않습니다.');
    }
  
    const messageInfo = rawMessageInfo as MessageInfo;
  
    if (!messageInfo.phoneNum) {
      return alertError('전화번호가 존재하지 않아 메시지를 전송할 수 없습니다.');
    }
    if (!messageInfo.userName) {
      return alertError('이름 정보가 존재하지 않아 메시지를 전송할 수 없습니다.');
    }
    if (!boothInfo?.adminName) {
      return alertError('부스 관리자 정보가 없습니다.');
    }
  
    baseModal.setModalType('loadingModal');
    baseModal.openModal();
  
    try {
      const response = await api.post('/admin/message/send', {
        phoneNum: messageInfo.phoneNum,
        userName: messageInfo.userName,
        adminName: boothInfo.adminName,
        message,
      });
  
      if (response.data === 'SEND_SUCCESS') {
        alert('메시지 전송에 성공했습니다.');
      } else {
        alertError('메시지 전송에 실패했습니다. 서버 응답을 확인해주세요.');
      }
    } catch (error) {
      console.error('메시지 전송 중 오류:', error);
      alertError('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      baseModal.closeModal();
    }
  },
  

  saveCustomMessage: async (messages) => {
    const baseModal = useBaseModal.getState();
    const { boothInfo } = useBoothDetail.getState();

    try {
      const response = await api.post('/admin/message', {
        boothId: boothInfo?.boothId,
        customMessageList: messages,
      });

      if (response.data.success) {
        alert('메시지 수정에 성공했습니다.');
      } else {
        alert('메시지 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alertError(error);
    } finally {
      baseModal.closeModal();
    }
  },
}));