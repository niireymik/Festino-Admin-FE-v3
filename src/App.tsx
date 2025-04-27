import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MobileLayout from './layouts/MobileLayout';
import OrderLayout from './layouts/OrderLayout';

const App : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/">

        </Route>

        {/* Order */}
        <Route path="/order" element={<OrderLayout />}>

        </Route>

        {/* Mobile */}
        <Route path="/mobile" element={<MobileLayout />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;