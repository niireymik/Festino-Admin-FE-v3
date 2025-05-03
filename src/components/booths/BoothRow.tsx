import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const BoothRow : React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleWidth = windowWidth < 1024 ? 40 : 70;

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const isBoothOwner = false; // 👉 예시용. 실제 로직 연동 시 상태로 교체

  // 핸들러는 모두 비어둠
  const handleClickBoothOpen = () => {
    alert('handleClickBoothOpen');
  };

  const handleClickBoothOrder = () => {
    alert('handleClickBoothOrder');
  };

  const handleClickBoothReservation = () => {
    alert('handleClickBoothReservation');
  };

  const handleClickBoothDetail = () => {
    alert('handleClickBoothDetail');
  };

  return (
    <div
      className={`text-second-700-light text-xs lg:text-[14px] h-[55px] w-full flex justify-between gap-2 flex-nowrap overflow-x-auto items-center px-4 lg:px-[50px] last:rounded-b-[20px] last:border-0 border-b-1 border-secondary-300 ${
        isBoothOwner ? 'hover:bg-slate-200 bg-slate-100 font-bold' : 'hover:bg-slate-50 bg-white'
      }`}
    >
      <div className="text-nowrap min-w-[21px] w-[21px] lg:min-w-[35px] lg:w-[35px] text-center">1</div>
      <div className="text-wrap break-keep min-w-[75px] w-[75px] lg:min-w-[140px] lg:w-[140px] text-center">카테고리</div>
      <div className="text-wrap break-keep min-w-[42px] w-[70px] lg:min-w-[70px] lg:w-[140px] text-center">부스이름</div>
      <div className="text-wrap break-keep min-w-[42px] w-[70px] lg:min-w-[70px] lg:w-[140px] text-center">10:00 ~ 17:00</div>

      <div
        className="text-wrap w-fit lg:min-w-[70px] lg:w-[70px] text-center flex items-center justify-center"
        onClick={handleClickBoothReservation}
      >
        <ToggleSwitch isActive={true} width={toggleWidth} />
      </div>

      <div
        className="text-wrap w-fit lg:min-w-[70px] lg:w-[70px] text-center flex items-center justify-center"
        onClick={handleClickBoothOpen}
      >
        <ToggleSwitch isActive={false} width={toggleWidth} />
      </div>

      <div
        className="text-wrap w-fit lg:min-w-[70px] lg:w-[70px] text-center flex items-center justify-center"
        onClick={handleClickBoothOrder}
      >
        <ToggleSwitch isActive={false} width={toggleWidth} />
      </div>

      <div
        className="text-xs lg:text-[14px] text-nowrap w-[60px] h-[25px] rounded-2xl flex items-center justify-center text-center lg:min-w-[75px] lg:h-[30px] bg-primary-800-light-12 lg:rounded-2xl text-primary-800 cursor-pointer select-none font-semibold"
        onClick={handleClickBoothDetail}
      >
        부스정보
      </div>
    </div>
  );
};

export default BoothRow