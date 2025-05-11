import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FestinoLogo from "./icons/FestinoLogo";
import { useUserStore } from "@/stores/logins/userStore";

const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout } = useUserStore();
  const navigate = useNavigate();

  // 활성 상태
  const [boothActive, setBoothActive] = useState(false);
  const [reserveActive, setReserveActive] = useState(false);
  const [orderActive, setOrderActive] = useState(false);

  // 로그인 화면으로 이동
  const handleClickLogout = () => {
    logout()
    navigate('/login');
  };

  const setActiveClass = (active: boolean) => {
    return active ? "font-semibold text-primary-800" : "";
  };

  // URL 변화 시 active 상태 갱신
  useEffect(() => {
    setBoothActive(pathname === "/" || pathname.startsWith("/booth"));
    setReserveActive(pathname.startsWith("/reserve"));
    setOrderActive(pathname.startsWith("/order/realTime"));
  }, [pathname]);

  return (
    <div className="bg-white w-full flex justify-between px-[40px] 2xl:px-[50px] items-center h-full shadow-primary select-none">
      <div
        className="text-3xl text-primary-800 font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FestinoLogo />
      </div>

      <div className="flex justify-end gap-4 md:gap-[50px] lg:gap-[70px] text-secondary-500 text-xs md:text-sm lg:text-[16px] font-medium">
        <div
          className={`hover:text-primary-800 hover:font-semibold cursor-pointer hidden sm:block ${setActiveClass(boothActive)}`}
          onClick={() => navigate("/")}
        >
          부스
        </div>
        <div
          className={`hover:text-primary-800 hover:font-semibold cursor-pointer hidden sm:block ${setActiveClass(reserveActive)}`}
          onClick={() => navigate("/reserve")}
        >
          테이블링
        </div>
        <div
          className={`hover:text-primary-800 hover:font-semibold cursor-pointer hidden sm:block ${setActiveClass(orderActive)}`}
          onClick={() => navigate("/order/realTime")}
        >
          주문조회
        </div>
        <div
          className="hover:text-primary-800 hover:font-semibold cursor-pointer hidden sm:block"
          onClick={() => handleClickLogout()}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default NavBar;