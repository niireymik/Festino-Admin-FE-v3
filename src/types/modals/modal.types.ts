export interface MenuItem {
  menuId: string;
  menuName: string;
  menuPrice: number;
  [key: string]: any;
}

export interface TableItem {
  tableNumIndex: number;
  customTableNum: string;
}

export interface OrderItem {
  menuId: string;
  menuName: string;
  menuCount: number;
  menuPrice: number;
  isService: boolean;
}
