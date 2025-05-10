export interface Menu {
  menuName: string;
  menuPrice: number;
  menuCount: number;
}

export interface Order {
  orderId: string;
  orderType: 'WAIT_DEPOSIT' | 'COOKING' | 'READY' | 'FINISH' | 'CANCEL';
  orderNum: number;
  tableNum: number;
  userName: string;
  phoneNum: string;
  totalPrice: number;
  menuList: Menu[];
}

export interface AllOrderStore {
  allOrder: Order[];
  getAllOrder: (params: { boothId: string; date: number }) => Promise<boolean>;
}