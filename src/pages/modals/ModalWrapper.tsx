import { useBaseModal } from '@/stores/commons/baseModal';
import { useEffect } from 'react';

export interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { closeModal } = useBaseModal();

  // ESC 키 핸들러
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'; 
    window.addEventListener('keydown', handleEscKey);

    return () => {
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className="fixed z-50 w-screen h-screen bg-black/50 flex justify-center items-center">
      {children}
    </div>
  );
};

export default ModalWrapper;