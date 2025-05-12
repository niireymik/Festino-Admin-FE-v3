import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './layouts/MobileLayout';
import OrderLayout from './layouts/OrderLayout';
import BoothListPage from './pages/booths/BoothListPage';
import OrderStatisticsPage from './pages/orders/OrderStatisticsPage';
import DefaultLayout from './layouts/DefaultLayout';
import BoothDetailPage from './pages/booths/BoothDetailPage';
import LoginPage from './pages/logins/LoginPage';
import OrderRealTime from './pages/orders/OrderRealTimePage';
import OrderReady from './pages/orders/OrderReadyPage';
import OrderCooking from './pages/orders/OderCookingPage';
import OrderFinish from './pages/orders/OrderFinishPage';
import OrderCancel from './pages/orders/OrderCancelPage';
import OrderTable from './pages/orders/OrderTablePage';
import AuthGuard from '@/components/AuthGuard';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTableStatusOrder } from './stores/orders/tableStatusOrder';

const App: React.FC = () => {
  const [cookies] = useCookies(['boothId']);
  const { boothId, setBoothId } = useTableStatusOrder();

  useEffect(() => {
    // Zustand 상태가 비어 있고, 쿠키에 boothId가 있으면 복원
    if (!boothId && cookies.boothId) {
      setBoothId(cookies.boothId);
    }
  }, [boothId, cookies.boothId]);

  return (
    <BrowserRouter>
      <AuthGuard />
      <Routes>
          <Route element={<DefaultLayout />}>
            {/* Main */}
            <Route path="/">
              <Route index element={<BoothListPage />} />
              <Route path="/booth/:boothId" element={<BoothDetailPage />} />
            </Route>

            {/* Order */}
            <Route path="/order" element={<OrderLayout />}>
              <Route path="realTime" element={<OrderRealTime />} />
              <Route path="ready" element={<OrderReady />} />
              <Route path="cooking" element={<OrderCooking />} />
              <Route path="finish" element={<OrderFinish />} />
              <Route path="cancel" element={<OrderCancel />} />
              <Route path="table" element={<OrderTable />} />
              <Route path="statistics" element={<OrderStatisticsPage />} />
            </Route>

            <Route>
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>

          {/* mobile */}
          <Route path="/mobile" element={<MobileLayout />}>
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;