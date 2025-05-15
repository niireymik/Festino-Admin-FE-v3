

export interface TableItem {
  tableNumIndex: number;
  customTableNum: string;
}

export interface BaseModalStore {
  isModalOpen: boolean;
  isMobileModalOpen: boolean;
  modalType: string;
  setModalType: (type: string) => void;
  openModal: () => void;
  closeModal: () => void;
  openMobileModal: () => void;
  closeMobileModal: (type?: string) => void;
}

export interface OrderPopupState {
  menuInfoList: any[];
  orderInfo: any;
  cookingInfo: any;
  selectType: string;
  note: string;

  submitPopup: (params: { type: string }) => Promise<void>;
  openPopup: (params: { type: string, selectOrderInfo: any, selectMenuInfoList: any[], selectCookingInfo?: any }) => void;
  closePopup: () => void;
  deleteOrder: (params: { orderId: string }) => Promise<boolean>;
  patchOrderRestore: (params: { orderId: string, orderType: string }) => Promise<boolean>;
  patchOrderDeposit: (params: { orderId: string }) => Promise<boolean>;
  patchOrderComplete: (params: { orderId: string, orderType: string }) => Promise<boolean>;
  patchCookingComplete: (params: { cookId: string }) => Promise<boolean>;
  getNote: () => Promise<void>;
}

export interface MenuItem {
  menuId: string;
  menuName: string;
  menuPrice: number;
  [key: string]: any;
}

export interface OrderItem {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuCount: number;
  isService?: boolean;
  tableNum?: number;
  [key: string]: any;
}

export interface ServiceModalStore {
  menuList: MenuItem[];
  memo: string;
  openServiceModal: () => void;
  getMenuList: () => Promise<void>;
  saveService: (orderList: Record<string, OrderItem[]>) => Promise<void>;
  setMemo: (text: string) => void;
}

export interface TableVisualizationStore {
  orderList: string[];
  openTableVisualDetail: () => void;
  closeTableVisualDetail: () => void;
}