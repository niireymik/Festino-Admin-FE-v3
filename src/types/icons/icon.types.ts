import { OrderItem } from './../modals/modal.types';
export interface IconOrderListProps {
  isActive?: boolean;
}

export interface IconClockProps {
  className?: string;
}

export interface SvgCharacterProps {
  width?: number;
}

export interface IconOrderCheckProps {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface IconOrderDetailProps {
  className?: string;
  onClick?: () => void;
}

export interface IconRefreshVectorProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  className?: string
}

export interface IconSearchProps {
  width?: number;
  height?: number;
  fillColor?: string;
  className?: string;
}

export interface IconOrderMinusProps {
  className?: string;
  onClick?: (tableNum: string, order: OrderItem) => void;
}

export interface IconOrderPlusProps {
  className?: string;
  onClick?: (tableNum: string, order: OrderItem) => void;
}

export interface IconTrashProps {
  className?: string;
  onClick?: (tableNum: string, order: OrderItem) => void;
}