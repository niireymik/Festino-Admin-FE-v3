import BoothRow from "@/components/booths/BoothRow";

const BoothListPage : React.FC = () => {
  return (
    <div className="flex flex-col px-4 gap-[20px] min-w-[630px] pb-20">
      {/* 부스 목록 header */}
      <div className="flex justify-between items-center pt-[100px] min-w-[350px]">
        <div className="flex items-center gap-4">
          <div className="bg-booth-list bg-cover w-8 h-8" />
          <div className="text-primary-800 text-xl md:text-2xl font-semibold">부스 리스트</div>
        </div>
        <div className="flex gap-4">
          <button 
            className="hover:bg-primary-800 font-semibold w-[60px] h-[35px] rounded-xl text-sm lg:w-[60px] lg:h-[35px] flex items-center justify-center text-white lg:text-md bg-primary-800 cursor-pointer select-none"
          >
            등록
          </button>
        </div>
      </div>

      {/* 부스 목록 */}
      <div className="w-full flex flex-col h-full shadow-secondary rounded-b-[20px] outline outline-1 outline-primary-400 rounded-t-2xl text-secondary-700">
        {/* Table Header */}
        <div className="text-xs lg:text-[14px] font-semibold h-[55px] w-full bg-primary-800-light-8 rounded-t-2xl flex justify-between gap-2 flex-nowrap overflow-x-auto items-center px-4 lg:px-[50px] border-b border-primary-800-light-24">
          <div className="text-nowrap min-w-[21px] w-[21px] lg:min-w-[35px] text-center">번호</div>
          <div className="text-balance break-keep min-w-[75px] w-[75px] lg:min-w-[140px] text-center">관리자 카테고리</div>
          <div className="text-balance min-w-[42px] w-[70px] lg:min-w-[70px] lg:w-[140px] text-center">부스이름</div>
          <div className="text-balance min-w-[42px] w-[70px] lg:min-w-[70px] lg:w-[140px] text-center">운영시간</div>
          <div className="text-balance w-fit lg:min-w-[70px] lg:w-[70px] text-center">예약가능</div>
          <div className="text-balance w-fit lg:min-w-[70px] lg:w-[70px] text-center">오픈</div>
          <div className="text-balance w-fit lg:min-w-[70px] lg:w-[70px] text-center">주문가능</div>
          <div className="text-balance text-center w-[60px] lg:min-w-[75px]">바로가기</div>
        </div>

        {/* Table Body */}
        <BoothRow />
        <BoothRow />
        <BoothRow />
      </div>
    </div>
  );
};

export default BoothListPage;