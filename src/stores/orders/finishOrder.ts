import { create } from 'zustand';
import { api } from '@/utils/api';
import { FinishOrderStore } from '@/types/orders/order.types';

export const useFinishOrder = create<FinishOrderStore>((set) => ({
  // finishOrderList: [],

  // 테스트용
  finishList: [
    {
      "orderId": "c5fbe3c2-7ed8-4e47-bd87-5846d498d9ad",
      "orderNum": 435,
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
      "createAt": "2024-09-13T18:35:40.762742",
      "finishAt": "2024-09-13T18:44:52.762484"
    },
    {
      "orderId": "1ed82aa6-41c6-4532-9399-a94824a67f01",
      "orderNum": 437,
      "tableNum": 28,
      "userName": "이현밍",
      "phoneNum": "01092464178",
      "totalPrice": 30000,
      "menuList": [
        {
          "menuId": "b84f1649-4550-41d7-b92c-dc2030442efb",
          "menuName": "보쌈 & 막국수 세트",
          "menuCount": 1,
          "menuPrice": 20000
        },
        {
          "menuId": "0bfa5b44-4921-41d6-b774-1a9e2155554f",
          "menuName": "시원~한 할매 묵사발",
          "menuCount": 1,
          "menuPrice": 8000
        },
        {
          "menuId": "438df566-dc0d-4870-bbe9-e3f89efda344",
          "menuName": "콜라",
          "menuCount": 1,
          "menuPrice": 2000
        }
      ],
      "createAt": "2024-09-13T18:36:38.890977",
      "finishAt": "2024-09-13T18:43:17.927133"
    },
    {
      "orderId": "a0e060df-0bbd-4d71-9668-c870a56884f1",
      "orderNum": 438,
      "tableNum": 27,
      "userName": "위정민",
      "phoneNum": "01087627943",
      "totalPrice": 25000,
      "menuList": [
        {
          "menuId": "e9413c19-3405-417c-bb36-8b6bc032d914",
          "menuName": "강할머니 보쌈",
          "menuCount": 1,
          "menuPrice": 15000
        },
        {
          "menuId": "0bfa5b44-4921-41d6-b774-1a9e2155554f",
          "menuName": "시원~한 할매 묵사발",
          "menuCount": 1,
          "menuPrice": 8000
        },
        {
          "menuId": "ed4803b5-b638-44a4-ad78-a89b69484a3f",
          "menuName": "물",
          "menuCount": 2,
          "menuPrice": 2000
        }
      ],
      "createAt": "2024-09-13T18:46:40.240133",
      "finishAt": "2024-09-13T18:48:40.770489"
    },
  ],

  getFinishOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/finish/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ finishList: data.finishList });
        return true;
      } else {
        set({ finishList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ finishList: [] });
      return false;
    }
  },

  initFinishOrderList: () => {
    set({ finishList: [] });
  },
}));