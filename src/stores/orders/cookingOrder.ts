import { create } from 'zustand';
import { api } from '@/utils/api';
import { CookingOrderStore } from '@/types/orders/order.types';

export const useCookingOrder = create<CookingOrderStore>((set) => ({
  // cookingOrderList: [],

  // 테스트용
  cookingList: [
    {
      menuId: "b84f1649-4550-41d7-b92c-dc2030442efb",
      menuName: "보쌈 & 막국수 세트",
      tableCount: 2,
      totalRemainCount: 1,
      cookList: [
        {
          "servedCount": 1,
          "cookId": "13bfcd86-4ff7-4cf0-b919-36067139d705",
          "orderId": "43557052-2952-4d38-9509-7d483565159c",
          tableNum: 23,
          totalCount: 1
        },
        {
          servedCount: 0,
          cookId: "47a473ca-bb5f-49c5-afbf-e3b5dd517e99",
          orderId: "c8560b57-4d03-4f16-b343-d31a989b80f9",
          tableNum: 14,
          totalCount: 1
        }
      ]
    },
    {
      menuId: "e9413c19-3405-417c-bb36-8b6bc032d914",
      menuName: "강할머니 보쌈",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "3e702e37-f7e9-4393-8afe-4bd6bed53e47",
      menuName: "니가무라막국수",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "0bfa5b44-4921-41d6-b774-1a9e2155554f",
      menuName: "시원~한 할매 묵사발",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "feb0d6ca-5168-4629-a698-8816d0853239",
      menuName: "정성가득 두부김치",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "22888f00-9777-49b0-9299-4e2ec17a7527",
      menuName: "갯마을 해물라면",
      tableCount: 3,
      totalRemainCount: 3,
      cookList: [
        {
          servedCount: 0,
          cookId: "b0f306ce-c129-40dc-9d7e-6aaaedc21207",
          orderId: "c8560b57-4d03-4f16-b343-d31a989b80f9",
          tableNum: 14,
          totalCount: 1
        },
        {
          servedCount: 0,
          cookId: "85497a7c-aa25-438f-a385-ec69561282aa",
          orderId: "25e95113-382e-4be6-8d23-c29c0891142e",
          tableNum: 1,
          totalCount: 1
        },
        {
          servedCount: 0,
          cookId: "9610d383-b82b-4d2d-a5d6-0acc5f023d38",
          orderId: "7db1e56b-a52c-4f56-97ae-689a1df5f444",
          tableNum: 1,
          totalCount: 1
        }
      ]
    },
    {
      menuId: "45035e14-e314-431f-b9d1-aaf3d143f7df",
      menuName: "정통 메밀전병(3줄)",
      tableCount: 1,
      totalRemainCount: 0,
      cookList: [
        {
          servedCount: 1,
          cookId: "e01f8d3f-d687-4cc0-a5bc-909a3ae3e7c1",
          orderId: "ba8ee3de-02a9-43ec-8c28-12f74ff357d5",
          tableNum: 14,
          totalCount: 1
        }
      ]
    },
    {
      menuId: "e9a1f9ba-f9ab-48e2-9c82-aa075241be75",
      menuName: "추억의 슬러시 - 콜라",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "4918c9b9-084d-4736-87b3-680206cf3f0f",
      menuName: "추억의 슬러시 - 식혜",
      tableCount: 1,
      totalRemainCount: 2,
      cookList: [
        {
          servedCount: 0,
          cookId: "2b392162-8a01-46eb-885b-99a7d3c37ee8",
          orderId: "43557052-2952-4d38-9509-7d483565159c",
          tableNum: 23,
          totalCount: 2
        }
      ]
    },
    {
      menuId: "277ea30e-63be-460f-ad66-4b98efba3f9e",
      menuName: "사이다",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "438df566-dc0d-4870-bbe9-e3f89efda344",
      menuName: "콜라",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    },
    {
      menuId: "ed4803b5-b638-44a4-ad78-a89b69484a3f",
      menuName: "물",
      tableCount: 0,
      totalRemainCount: 0,
      cookList: []
    }
  ],

  getCookingOrderList: async ({ boothId, date }) => {
    if (!boothId) return false;

    try {
      const response = await api.get(`/admin/booth/${boothId}/order/cooking/all/${date}`);
      const data = response.data;

      if (data.success) {
        set({ cookingList: data.cookingList });
        return true;
      } else {
        set({ cookingList: [] });
        return false;
      }
    } catch (error) {
      console.error(error);
      set({ cookingList: [] });
      return false;
    }
  },

  initCookingOrderList: () => {
    set({ cookingList: [] });
  },
}));