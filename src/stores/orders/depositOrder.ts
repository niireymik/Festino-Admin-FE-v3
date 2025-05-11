import { create } from 'zustand';
import { api } from '@/utils/api';
import { DepositOrderStore } from '@/types/orders/order.types';

export const useDepositOrder = create<DepositOrderStore>((set) => ({
  // waitDepositList: [],

  // 테스트용
  waitDepositList: [
    {
      orderId: "10359a21-7f82-4f01-b256-c6fb9c66aeac",
      orderNum: 545,
      tableNum: 1,
      userName: "이희연",
      phoneNum: "01024033289",
      totalPrice: 20000,
      menuList: [
        {
          menuId: "b84f1649-4550-41d7-b92c-dc2030442efb",
          menuName: "보쌈 & 막국수 세트",
          menuCount: 1,
          menuPrice: 20000
        }
      ],
      createAt: "2024-09-26T00:08:07.627268"
    },
    {
      orderId: "0af60d15-7d3e-4b96-8e1b-5fdd5e2ccf38",
      orderNum: 587,
      tableNum: 1,
      userName: "ㄴㄴ",
      phoneNum: "010-1111-1111",
      totalPrice: 38000,
      menuList: [
        {
          menuId: "e9413c19-3405-417c-bb36-8b6bc032d914",
          menuName: "강할머니 보쌈",
          menuPrice: 15000,
          menuCount: 2
        },
        {
          menuId: "0bfa5b44-4921-41d6-b774-1a9e2155554f",
          menuName: "시원~한 할매 묵사발",
          menuPrice: 8000,
          menuCount: 1
        }
      ],
      createAt: "2025-05-10T06:44:29.117377"
    },
    {
      orderId: "8249b7de-cf2e-46f2-9c11-f37a11181117",
      orderNum: 588,
      tableNum: 1,
      userName: "ㅇㅇㅇ",
      phoneNum: "010-2222-2222",
      totalPrice: 20000,
      menuList: [
        {
          menuId: "b84f1649-4550-41d7-b92c-dc2030442efb",
          menuName: "보쌈 & 막국수 세트",
          menuPrice: 20000,
          menuCount: 1
        }
      ],
      createAt: "2025-05-11T04:00:29.124672"
    }
  ],  

  getWaitDepositOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/deposit/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ waitDepositList: data.waitDepositList });
        return true;
      } else {
        set({ waitDepositList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ waitDepositList: [] });
      return false;
    }
  },

  initWaitDepositOrderList: () => {
    set({ waitDepositList: [] });
  },
}));