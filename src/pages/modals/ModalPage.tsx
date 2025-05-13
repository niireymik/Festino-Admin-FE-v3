import LoadingModal from '@/components/modals/LoadingModal';
import ModalWrapper from '@/components/modals/ModalWrapper';
import OrderPopup from '@/components/modals/OrderPopup';
import ServiceOrderModal from '@/components/modals/ServiceOrderModal';
import TableVisualizationModal from '@/components/modals/TableVisualizationModal';
import { useBaseModal } from '@/stores/commons/baseModal';

const ModalPage: React.FC = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <ModalWrapper>
      {modalType === 'orderPopup' && <OrderPopup />}
      {modalType === 'serviceModal' && <ServiceOrderModal />}
      {modalType === 'loadingModal' && <LoadingModal />}
      {modalType === 'tableVisualizationModal' && <TableVisualizationModal />}
    </ModalWrapper>
  );
};

export default ModalPage;
