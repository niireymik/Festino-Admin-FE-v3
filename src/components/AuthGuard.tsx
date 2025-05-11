import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/logins/userStore';
import { useDate } from '@/stores/commons/date';
import { useTableStatusOrder } from '@/stores/orders/tableStatusOrder';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const publicPages = ['/login', '/mobile/login'];
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  const { userOwnBoothId, isUserValid, getUserOwnBoothId } = useUserStore();
  const { setBoothId } = useTableStatusOrder();
  const { getNowDate } = useDate();

  useEffect(() => {
    (async () => {
      if (publicPages.includes(pathname)) return true;

      const { isValidate } = await isUserValid();
      await getUserOwnBoothId();
      await getNowDate();
      setBoothId(userOwnBoothId);

      if (!isValidate) {
        if (pathname.includes('mobile') || isMobile) return navigate('/mobile/login', { replace: true });
        else return navigate('/login');
      }
      
    })();
  }, [pathname]);

  useEffect(() => {
    (async () => {
      if (pathname.includes(userOwnBoothId)) {
        const { isUserOwnBooth } = useUserStore();
        const isOwn = await isUserOwnBooth(userOwnBoothId);
        if(isOwn) {
          return true;
        } else {
          return navigate('/error');
        }
      } else {
        return true;
      }
    })
  }, [])

  return null;
};

export default AuthGuard;