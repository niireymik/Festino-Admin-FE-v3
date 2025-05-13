import { useBaseModal } from '@/stores/commons/baseModal';
import ModalWrapper from './ModalWrapper';
import MenuModal from './MenuModal';
import TableCustomModal from './TableCustomModal';

const ModalPage: React.FC = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <ModalWrapper>
      {modalType === 'menuModal' && <MenuModal />}
      {modalType === 'tableModal' && <TableCustomModal />}
    </ModalWrapper>
  );
};

export default ModalPage;