import { useEffect } from "react";
import BoothRow from "@/components/booths/BoothRow";
import { useBoothList } from "@/stores/booths/boothList";
import { Booth } from "@/types/booths/booth.types";
import { useNavigate } from "react-router-dom";

const BoothListPage: React.FC = () => {
  const {
    boothList,
    getAllBoothList,
    updateBoothOpen,
    updateBoothOrder,
    updateBoothReservation,
  } = useBoothList();
  
  const navigate = useNavigate();

  const handleClickBoothDetail = (boothId:string) => {
    navigate(`/booth/${boothId}`);
  };

  useEffect(() => {
    getAllBoothList();
  }, []);

  return (
    <div className="flex flex-col px-4 gap-[20px] min-w-[630px] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center pt-[100px] min-w-[350px]">
        <div className="flex items-center gap-4">
          <div className="bg-booth-list bg-cover w-8 h-8" />
          <div className="text-primary-800 text-xl md:text-2xl font-semibold">부스 리스트</div>
        </div>
        <button className="hover:bg-primary-800 font-semibold w-[60px] h-[35px] rounded-xl text-sm text-white bg-primary-800 cursor-pointer">
          등록
        </button>
      </div>

      {/* Table */}
      <div className="w-full flex flex-col h-full shadow-secondary rounded-b-[20px] outline outline-1 outline-primary-400 rounded-t-2xl text-secondary-700">
        {/* Table Header */}
        <div className="text-2xs lg:text-[14px] font-semibold h-[55px] w-full bg-primary-800-light-8 rounded-t-2xl flex justify-between gap-2 overflow-x-auto items-center px-4 lg:px-[50px] border-b border-primary-800-light-24">
          <div className="min-w-[21px] w-[21px] lg:min-w-[35px] lg:w-[35px] text-center">번호</div>
          <div className="min-w-[70px] lg:min-w-[120px] max-w-[120px] text-center">관리자 카테고리</div>
          <div className="min-w-[100px] lg:min-w-[130px] text-center">부스이름</div>
          <div className="min-w-[70px] lg:min-w-[140px] text-center">운영시간</div>
          <div className="w-[40px] lg:min-w-[70px] text-center">예약가능</div>
          <div className="w-[40px] lg:min-w-[70px] text-center">오픈</div>
          <div className="w-[40px] lg:min-w-[70px] text-center">주문가능</div>
          <div className="text-center min-w-[50px] lg:text-[14px] max-w-[60px] lg:min-w-[75px] truncate">바로가기</div>
        </div>

        {/* Table Body */}
        {boothList.map((booth: Booth, index: number) => (
          <BoothRow
            key={booth.boothId}
            booth={booth}
            index={index}
            onToggleOpen={() =>
              updateBoothOpen({ boothId: booth.boothId, isOpen: !booth.isOpen, adminCategory: booth.adminCategory })
            }
            onToggleOrder={() =>
              updateBoothOrder({ boothId: booth.boothId, isOrder: true, adminCategory: booth.adminCategory })
            }
            onToggleReservation={() =>
              updateBoothReservation({ boothId: booth.boothId, isReservation: true, adminCategory: booth.adminCategory })
            }
            onClickDetail={() => handleClickBoothDetail(booth.boothId)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoothListPage;