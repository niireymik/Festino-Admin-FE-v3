import { create } from 'zustand';
import { api } from '@/utils/api';
import { CancelOrderStore } from '@/types/orders/order.types';

export const useCancelOrder = create<CancelOrderStore>((set) => ({
  // cancelList: [],

  // 테스트용
  cancelList: [
    {
      "orderId": "c8560b57-4d03-4f16-b343-d31a989b80f9",
      "orderNum": 436,
      "tableNum": 14,
      "userName": "이규빈",
      "phoneNum": "01084803668",
      "totalPrice": 26000,
      "menuList": [
        {
          "menuId": "b84f1649-4550-41d7-b92c-dc2030442efb",
          "menuName": "보쌈 & 막국수 세트",
          "menuCount": 1,
          "menuPrice": 20000
        },
        {
          "menuId": "22888f00-9777-49b0-9299-4e2ec17a7527",
          "menuName": "갯마을 해물라면",
          "menuCount": 1,
          "menuPrice": 6000
        }
      ],
      "createAt": "2024-09-13T18:35:48.462649"
    }
  ],

  getCancelOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/cancel/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ cancelList: data.cancelList });
        return true;
      } else {
        set({ cancelList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ cancelList: [] });
      return false;
    }
  },

  initCancelOrderList: () => {
    set({ cancelList: [] });
  },
}));