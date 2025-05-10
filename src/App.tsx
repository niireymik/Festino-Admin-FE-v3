import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './layouts/MobileLayout';
import OrderLayout from './layouts/OrderLayout';
import BoothListPage from './pages/booths/BoothListPage';
import OrderStatisticsPage from './pages/orders/OrderStatisticsPage';
import DefaultLayout from './layouts/DefaultLayout';
import OrderRealTime from './pages/orders/OrderRealTime';
import OrderReady from './pages/orders/OrderReady';
import OrderCooking from './pages/orders/OderCooking';
import OrderFinish from './pages/orders/OrderFinish';
import OrderCancel from './pages/orders/OrderCancel';
import OrderTable from './pages/orders/OrderTable';

const App : React.FC = () => {
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  return (
    <BrowserRouter>
      <Routes>
      {!isMobile ? (
          <Route element={<DefaultLayout />}>
            {/* Main */}
            <Route path="/">
              <Route index element={<BoothListPage />} />
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
          </Route>
        ) : (
          // Mobile 
          <Route path="/mobile" element={<MobileLayout />}>

          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;