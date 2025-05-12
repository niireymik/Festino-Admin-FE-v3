import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MobileLayout from './layouts/MobileLayout';
import OrderLayout from './layouts/OrderLayout';
import BoothListPage from './pages/booths/BoothListPage';
import OrderStatisticsPage from './pages/orders/OrderStatisticsPage';
import DefaultLayout from './layouts/DefaultLayout';
import BoothDetailPage from './pages/booths/BoothDetailPage';

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
              <Route path="/booth/:boothId" element={<BoothDetailPage />} />
            </Route>

            {/* Order */}
            <Route path="/order" element={<OrderLayout />}>
              {/* <Route element={<OrderRealTime />} /> */}
              {/* <Route path="ready" element={<OrderReady />} /> */}
              {/* <Route path="cooking" element={<OrderCooking />} /> */}
              {/* <Route path="finish" element={<OrderFinish />} /> */}
              {/* <Route path="cancel" element={<OrderCancel />} /> */}
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