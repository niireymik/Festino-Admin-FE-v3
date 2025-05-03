import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MobileLayout from './layouts/MobileLayout';
import OrderLayout from './layouts/OrderLayout';
import BoothListPage from './pages/booths/BoothListPage';
import OrderStatistics from './pages/orders/OrderStatisticsPage';

const App : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/">
          <Route element={<BoothListPage />} />
        </Route>

        {/* Order */}
        <Route path="/order" element={<OrderLayout />}>
          {/* <Route path="" element={<OrderRealTime />} /> */}
          {/* <Route path="ready" element={<OrderReady />} /> */}
          {/* <Route path="cooking" element={<OrderCooking />} /> */}
          {/* <Route path="finish" element={<OrderFinish />} /> */}
          {/* <Route path="cancel" element={<OrderCancel />} /> */}
          <Route path="statistics" element={<OrderStatistics />} />
        </Route>

        {/* Mobile */}
        <Route path="/mobile" element={<MobileLayout />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;