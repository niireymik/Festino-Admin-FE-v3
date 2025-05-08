import { Outlet } from "react-router-dom";

const OrderLayout : React.FC = () => {
  return (
    <div className="flex flex-col px-4 gap-[40px] min-w-[630px] pb-20">
      {/* Header */}
      <div className="flex justify-between pt-[50px] lg:pt-[100px] min-w-[670px] gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-cover bg-order-icon" />
          <div className="text-primary-800 text-xl md:text-2xl font-semibold">주문 조회</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default OrderLayout;