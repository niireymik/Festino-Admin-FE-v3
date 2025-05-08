import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { BoothRowProps } from "@/types/booths/booth.types";

const BoothRow: React.FC<BoothRowProps> = ({
  booth,
  index,
  onToggleOpen,
  onToggleOrder,
  onToggleReservation,
  onClickDetail,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggleWidth = windowWidth < 1024 ? 40 : 70;

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const { boothName, adminCategory, openTime, closeTime, isOpen } = booth;

  return (
    <div
      className={`text-second-700-light text-xs lg:text-[14px] h-[55px] w-full flex justify-between gap-2 flex-nowrap overflow-x-auto items-center px-4 lg:px-[50px] last:rounded-b-[20px] last:border-0 border-b-1 border-secondary-300 hover:bg-slate-50 bg-white`}
    >
      <div className="text-nowrap min-w-[21px] w-[21px] lg:min-w-[35px] lg:w-[35px] text-center">{index + 1}</div>
      <div className="text-wrap min-w-[75px] lg:min-w-[140px] text-center">{adminCategory}</div>
      <div className="text-wrap min-w-[70px] lg:min-w-[140px] text-center">{boothName}</div>
      <div className="text-wrap min-w-[70px] lg:min-w-[140px] text-center">{openTime} ~ {closeTime}</div>

      <div className="w-fit lg:min-w-[70px] text-center flex items-center justify-center" onClick={onToggleReservation}>
        <ToggleSwitch isActive={true} width={toggleWidth} />
      </div>

      <div className="w-fit lg:min-w-[70px] text-center flex items-center justify-center" onClick={onToggleOpen}>
        <ToggleSwitch isActive={isOpen} width={toggleWidth} />
      </div>

      <div className="w-fit lg:min-w-[70px] text-center flex items-center justify-center" onClick={onToggleOrder}>
        <ToggleSwitch isActive={false} width={toggleWidth} />
      </div>

      <div
        className="text-xs lg:text-[14px] w-[60px] h-[25px] rounded-2xl flex items-center justify-center lg:min-w-[75px] lg:h-[30px] bg-primary-800-light-12 text-primary-800 cursor-pointer select-none font-semibold"
        onClick={onClickDetail}
      >
        부스정보
      </div>
    </div>
  );
};

export default BoothRow;