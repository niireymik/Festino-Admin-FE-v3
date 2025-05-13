// 메뉴
export interface Menu {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuCount: number;
}

// 테이블 주문 현황
export interface TableOrder {
  orderId: string;
  orderType: string;
  tableNum: number;
  servedCount: number;
  totalCount: number;
  createAt: string;
}

export interface TableStatusOrderStore {
  orderCategories: string[];
  orderStatus: string;
  boothId: string;
  orderList: TableOrder[];
  setOrderStatus: (status: string) => void;
  setBoothId: (id: string) => void;
  initBaseOrder: () => void;
  getAllTableOrders: (params: { boothId: string; date: number }) => Promise<void>;
}

// 조리중
export interface Cook {
  servedCount: number;
  cookId: string;
  orderId: string;
  tableNum: number;
  totalCount: number;
}

export interface CookingMenu {
  menuId: string;
  menuName: string;
  tableCount: number;
  totalRemainCount: number;
  cookList: Cook[];
}

export interface CookingOrderStore {
  cookingList: CookingMenu[];
  getCookingOrderList: (params: { boothId: string; date: number }) => Promise<boolean>;
  initCookingOrderList: () => void;
}

// 입금대기
export interface WaitDepositOrder {
  orderId: string;
  orderNum: number;
  tableNum: number;
  userName: string;
  phoneNum: string;
  totalPrice: number;
  menuList: Menu[];
  createAt: string;
}

export interface DepositOrderStore {
  waitDepositList: WaitDepositOrder[];
  getWaitDepositOrderList: (params: { boothId: string; date: number }) => Promise<boolean>;
  initWaitDepositOrderList: () => void;
}

// 조리완료
export interface FinishOrder {
  orderId: string;
  orderNum: number;
  tableNum: number;
  userName: string;
  phoneNum: string;
  totalPrice: number;
  menuList: Menu[];
  createAt: string;
  finishAt: string;
}

export interface FinishOrderStore {
  finishList: FinishOrder[];
  getFinishOrderList: (params: { boothId: string; date: number }) => Promise<boolean>;
  initFinishOrderList: () => void;
}

// 주문취소
export interface CancelOrder {
  orderId: string;
  orderNum: number;
  tableNum: number;
  userName: string;
  phoneNum: string;
  totalPrice: number;
  menuList: Menu[];
  createAt: string;
}

export interface CancelOrderStore {
  cancelList: CancelOrder[];
  getCancelOrderList: (params: { boothId: string; date: number }) => Promise<boolean>;
  initCancelOrderList: () => void;
}

export interface DepositMenu {
  menuName: string;
  menuPrice: number;
  menuCount: number;
}

export interface OrderCancelCardProps {
  orderId: string;
  orderNum: number;
  tableNum: number;
  userName: string;
  phoneNum: string;
  totalPrice: number;
  menuList: DepositMenu[];
  createAt: string;
}

export interface OrderCardProps {
  type: string;
  cardData: any;
}

export interface OrderFinishCardProps {
  orderId: string;
  orderNum: number;
  tableNum: number;
  totalPrice: number;
  menuList: Menu[];
  userName: string;
  createAt: string;
  phoneNum: string;
  finishAt?: string;
}

export interface OrderReadyCardProps {
  orderId: string;
  orderNum: number;
  tableNum: number;
  totalPrice: number;
  menuList: Menu[];
  userName: string;
  createAt: string;
  phoneNum: string;
}

export interface TableCardProps {
  type: string;
}

export interface Props {
  tableOrder: TableOrder;
}

export interface CardData {
  id: string;
  type: string;
}

export interface TableInfo {
  tableNumIndex: number;
  customTableNum: string;
}

export interface TableDetailState {
  tableNumList: TableInfo[];
  tableNum: number;

  openTableDetailModal: () => void;
  closeTableDetailModal: () => void;
  getTableList: (boothId: string) => Promise<void>;
  submitTableDetail: (boothId: string) => Promise<boolean | undefined>;
  getCustomTableNum: (tableNum: number) => string | number;
}