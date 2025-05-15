import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTableStatusOrder } from '@/stores/orders/tableStatusOrder';

const AppInitializer : React.FC = () => {
  const [cookies] = useCookies(['boothId']);
  const { boothId, setBoothId } = useTableStatusOrder();

  useEffect(() => {
    if (!boothId && cookies.boothId) {
      setBoothId(cookies.boothId);
    }
  }, [boothId, cookies.boothId]);

  return null;
};

export default AppInitializer;
