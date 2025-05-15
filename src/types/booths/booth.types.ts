export interface ToggleSwitchProps {
  isActive: boolean;
  width?: number;
  onClick?: () => void;
}

export interface Booth {
  boothId: string;
  boothName: string;
  adminName: string;
  adminCategory: string;
  openTime: string;
  closeTime: string;
  boothIntro: string;
  boothImage: string[]; 
  location: string;
  isOpen: boolean;
}

export interface BoothRowProps {
  booth: Booth;
  index: number;
  onToggleOpen: () => void;
  onToggleOrder: () => void;
  onToggleReservation: () => void;
  onClickDetail: () => void;
}

export interface BoothListState {
  boothList: Booth[];
  getAllBoothList: () => Promise<void>;
  handleClickBoothDetail: (boothId: string) => void;
  updateBoothOpen: (args: { boothId: string; isOpen: boolean; adminCategory: string }) => Promise<void>;
  updateBoothOrder: (args: { boothId: string; isOrder: boolean; adminCategory: string }) => Promise<void>;
  updateBoothReservation: (args: { boothId: string; isReservation: boolean; adminCategory: string }) => Promise<void>;
}