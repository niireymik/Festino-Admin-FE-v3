import { useBaseModal } from '@/stores/commons/baseModal';
import ModalWrapper from './ModalWrapper';
import MenuModal from './MenuModal';

const ModalPage: React.FC = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <ModalWrapper>
      {modalType === 'menuModal' && <MenuModal />}
    </ModalWrapper>
  );
};

export default ModalPage;