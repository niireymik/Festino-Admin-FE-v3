export interface BoothInfo {
  boothId?: string;
  adminName?: string;
};

export interface Statistic {
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuSale: number;
};

export interface OrderStatisticState {
  menuSaleList: Statistic[];
  totalSale: number;
};

export interface OrderStatisticsStore {
  type: number;
  setType: (type: number) => void;
  allOrderStatistics: OrderStatisticState;
  boothInfo: BoothInfo;
  setBoothInfo: (booth: BoothInfo) => void;
  getStatistics: (params: { boothId: string; date: number; type: string }) => Promise<void>;
};

export type StatisticsTypeValue = {
  type: string;
  value: string;
};