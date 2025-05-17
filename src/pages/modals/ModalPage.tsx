import MenuModal from './MenuModal';
import TableCustomModal from './TableCustomModal';
import LoadingModal from '@/components/modals/LoadingModal';
import MessageCustomModal from '@/components/modals/MessageCustomModal';
import MessageModal from '@/components/modals/MessageModal';
import ModalWrapper from '@/components/modals/ModalWrapper';
import OrderPopup from '@/components/modals/OrderPopup';
import ReservePopup from '@/components/modals/ReservePopup';
import ServiceOrderModal from '@/components/modals/ServiceOrderModal';
import TableVisualizationModal from '@/components/modals/TableVisualizationModal';
import { useBaseModal } from '@/stores/commons/baseModal';

const ModalPage: React.FC = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <>
      {isModalOpen && (
        <ModalWrapper>
          {modalType === 'menuModal' && <MenuModal />}
          {modalType === 'tableModal' && <TableCustomModal />}
          {modalType === 'orderPopup' && <OrderPopup />}
          {modalType === 'serviceModal' && <ServiceOrderModal />}
          {modalType === 'loadingModal' && <LoadingModal />}
          {modalType === 'tableVisualizationModal' && <TableVisualizationModal />}
          {modalType === 'messageModal' && <MessageModal />}
          {modalType === 'messageCustomModal' && <MessageCustomModal />}
          {modalType === 'reservePopup' && <ReservePopup />}
        </ModalWrapper>
      )}
    </>
  );
};

export default ModalPage;