import { create } from 'zustand';
import { api } from '@/utils/api';
import { useBaseModal } from '../commons/baseModal';
import { useTableStatusOrder } from './tableStatusOrder';
import { useDate } from '../commons/date'
import { useDepositOrder } from './depositOrder';
import { useCookingOrder } from './cookingOrder';
import { useFinishOrder } from './finishOrder';
import { useCancelOrder } from './cancelOrder';
import { OrderPopupState } from '@/types/modals/modal.types';

export const useOrderPopup = create<OrderPopupState>((set, get) => {
  const baseModal = useBaseModal.getState();
  const baseOrder = useTableStatusOrder.getState();
  const dateStore = useDate.getState();
  const depositOrder = useDepositOrder.getState();
  const cookingOrder = useCookingOrder.getState();
  const finishOrder = useFinishOrder.getState();
  const cancelOrder = useCancelOrder.getState();

  return {
    menuInfoList: [],
    orderInfo: {},
    cookingInfo: {},
    selectType: '',
    note: '',

    // 취소하기
    deleteOrder: async ({ orderId }) => {
      try {
        const res = await api.delete(`/admin/booth/${baseOrder.boothId}/order/cancel`, {
          data: { orderId },
        });
        return res.data.success;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    // 복구하기
    patchOrderRestore: async ({ orderId, orderType }) => {
      try {
        const res = await api.put(`/admin/booth/${baseOrder.boothId}/order/${orderType.toLowerCase()}/restore`, {
          orderId,
          orderType,
        });
        return res.data.success;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    // 입금확인
    patchOrderDeposit: async ({ orderId }) => {
      try {
        const res = await api.put(`/admin/booth/${baseOrder.boothId}/order/deposit`, { orderId });
        return res.data.success;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    // 조리완료
    patchOrderComplete: async ({ orderId, orderType }) => {
      try {
        const res = await api.put(`/admin/booth/${baseOrder.boothId}/order/finish`, {
          orderId,
          orderType,
        });
        return res.data.success;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    // 조리중인 요리 조리완료
    patchCookingComplete: async ({ cookId }) => {
      try {
        const res = await api.put(`/admin/booth/${baseOrder.boothId}/order/cook/finish`, { cookId });
        return res.data.success;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    submitPopup: async ({ type }) => {
      const state = get();
      baseModal.setModalType('loadingModal');

      const { orderInfo, cookingInfo, selectType } = state;
      const boothId = baseOrder.boothId;
      const date = dateStore.nowDate;

      let success = false;

      if (type === 'cancel') {
        if (selectType === 'cancel') {
          success = await state.patchOrderRestore({ orderId: orderInfo.orderId, orderType: orderInfo.orderType });
          if (success) {
            await Promise.allSettled([
              cancelOrder.getCancelOrderList({ boothId, date }),
              baseOrder.getAllTableOrders({ boothId, date }),
            ]);
          }
        } else {
          success = await state.deleteOrder({ orderId: orderInfo.orderId });
          if (success) {
            await depositOrder.getWaitDepositOrderList({ boothId, date });
          }
        }
      } else if (type === 'deposit') {
        success = await state.patchOrderDeposit({ orderId: orderInfo.orderId });
        if (success) {
          await Promise.allSettled([
            depositOrder.getWaitDepositOrderList({ boothId, date }),
            cookingOrder.getCookingOrderList({ boothId, date }),
            baseOrder.getAllTableOrders({ boothId, date }),
          ]);
        }
      } else if (type === 'restore') {
        success = await state.patchOrderRestore({ orderId: orderInfo.orderId, orderType: orderInfo.orderType });
        if (success) {
          await Promise.allSettled([
            cookingOrder.getCookingOrderList({ boothId, date }),
            finishOrder.getFinishOrderList({ boothId, date }),
          ]);
        }
      } else if (type === 'complete') {
        if (selectType === 'cooking') {
          success = await state.patchCookingComplete({ cookId: cookingInfo.cook.cookId });
          if (success) {
            await Promise.allSettled([
              cookingOrder.getCookingOrderList({ boothId, date }),
              baseOrder.getAllTableOrders({ boothId, date }),
            ]);
          }
        } else {
          success = await state.patchOrderComplete({ orderId: orderInfo.orderId, orderType: orderInfo.orderType });
          if (success) {
            await Promise.allSettled([
              finishOrder.getFinishOrderList({ boothId, date }),
              baseOrder.getAllTableOrders({ boothId, date }),
            ]);
          }
        }
      }
      baseModal.closeModal();
    },

    openPopup: ({ type, selectOrderInfo, selectMenuInfoList, selectCookingInfo }) => {
      set({
        selectType: type,
        orderInfo: selectOrderInfo,
        menuInfoList: selectMenuInfoList,
        cookingInfo: selectCookingInfo || {},
      });
      baseModal.setModalType('orderPopup');
      baseModal.openModal();
    },

    getNote: async () => {
      const { selectType, orderInfo, cookingInfo } = get();
      if (selectType === 'detail' || selectType === 'complete') return;

      const orderId = selectType === 'cooking' ? cookingInfo.cook.orderId : orderInfo.orderId;
      try {
        const res = await api.get(`/admin/booth/${baseOrder.boothId}/order/${orderId}`);
        set({ note: res.data.data.note });
      } catch (e) {
        console.error(e);
      }
    },

    closePopup: () => {
      baseModal.closeModal();
    },
  };
});