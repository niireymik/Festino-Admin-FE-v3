import { create } from 'zustand';
import { api } from '@/utils/api';
import { TableStatusOrderStore } from '@/types/orders/order.types';

export const useBaseOrder = create<TableStatusOrderStore>((set) => ({
  orderCategories: ['realTime', 'ready', 'cooking', 'finish', 'cancel', 'statistics'],
  orderStatus: 'realTime',
  boothId: '',
  // orderList: [],
  // 테스트용
  orderList: [
    {
      orderId: "2b8dcf69-5237-4ab0-93e5-918561177cf1",
      orderType: "COOKING",
      tableNum: 5,
      servedCount: 0,
      totalCount: 0,
      createAt: "2024-05-10T14:30:00Z",
    },
    {
      orderId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      orderType: "READY",
      tableNum: 2,
      servedCount: 1,
      totalCount: 3,
      createAt: "2024-05-10T14:31:00Z",
    },
    {
      orderId: "f4e3d2c1-b5a6-7890-fedc-ba0987654321",
      orderType: "FINISH",
      tableNum: 7,
      servedCount: 2,
      totalCount: 2,
      createAt: "2024-05-10T14:32:00Z",
    },
    {
      orderId: "9f8e7d6c-5b4a-3210-cdef-abcd98765432",
      orderType: "REALTIME",
      tableNum: 1,
      servedCount: 0,
      totalCount: 1,
      createAt: "2024-05-10T14:33:00Z",
    },
    {
      orderId: "123e4567-e89b-12d3-a456-426614174000",
      orderType: "CANCEL",
      tableNum: 3,
      servedCount: 0,
      totalCount: 2,
      createAt: "2024-05-10T14:34:00Z",
    },
    {
      orderId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      orderType: "READY",
      tableNum: 2,
      servedCount: 1,
      totalCount: 3,
      createAt: "2024-05-10T14:35:00Z",
    },
    {
      orderId: "f4e3d2c1-b5a6-7890-fedc-ba0987654321",
      orderType: "FINISH",
      tableNum: 7,
      servedCount: 2,
      totalCount: 2,
      createAt: "2024-05-10T14:36:00Z",
    },
    {
      orderId: "9f8e7d6c-5b4a-3210-cdef-abcd98765432",
      orderType: "REALTIME",
      tableNum: 1,
      servedCount: 0,
      totalCount: 1,
      createAt: "2024-05-10T14:37:00Z",
    },
    {
      orderId: "123e4567-e89b-12d3-a456-426614174000",
      orderType: "CANCEL",
      tableNum: 3,
      servedCount: 0,
      totalCount: 2,
      createAt: "2024-05-10T14:38:00Z",
    },
    {
      orderId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      orderType: "READY",
      tableNum: 2,
      servedCount: 1,
      totalCount: 3,
      createAt: "2024-05-10T14:39:00Z",
    },
    {
      orderId: "f4e3d2c1-b5a6-7890-fedc-ba0987654321",
      orderType: "FINISH",
      tableNum: 7,
      servedCount: 2,
      totalCount: 2,
      createAt: "2024-05-10T14:40:00Z",
    },
    {
      orderId: "9f8e7d6c-5b4a-3210-cdef-abcd98765432",
      orderType: "REALTIME",
      tableNum: 1,
      servedCount: 0,
      totalCount: 1,
      createAt: "2024-05-10T14:41:00Z",
    },
    {
      orderId: "123e4567-e89b-12d3-a456-426614174000",
      orderType: "CANCEL",
      tableNum: 3,
      servedCount: 0,
      totalCount: 2,
      createAt: "2024-05-10T14:42:00Z",
    },
  ],

  setOrderStatus: (status) => set({ orderStatus: status }),

  setBoothId: (id) => set({ boothId: id }),

  initBaseOrder: () => set({ orderStatus: 'realTime' }),

  getAllTableOrders: async ({ boothId, date }) => {
    try {
      const response = await api.get(`/admin/booth/${boothId}/order/table/${date}`);
      const data = response.data;

      if (data.success) {
        set({ orderList: data.orderList });
      } else {
        set({ orderList: [] });
      }
    } catch (error) {
      console.error(error);
      set({ orderList: [] });
    }
  }
}));