import { modalInfo } from '@/constants/constant';
import { useBoothPopup } from '@/stores/booths/boothPopup';
import { useEffect, useRef } from 'react';
import IconNotice from '../icons/IconNotice';

const BoothPopup: React.FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const { selectedType, boothInfo, closePopup, submitPopup } = useBoothPopup();

  const checkCorrectSelect = () => {
    if (selectedType === 'open') return boothInfo.hasOwnProperty('isOpen');
    if (selectedType === 'order') return boothInfo.hasOwnProperty('isOrder');
    if (selectedType === 'reservation') return boothInfo.hasOwnProperty('isReservation');
    return false;
  };

  const getBoothInfo = () => {
    if (selectedType === 'open') return String(boothInfo.isOpen);
    if (selectedType === 'order') return String(boothInfo.isOrder);
    if (selectedType === 'reservation') return String(boothInfo.isReservation);
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkCorrectSelect()) {
      closePopup();
      return;
    }
    submitPopup();
  };

  useEffect(() => {
    submitRef.current?.focus();
  }, []);

  const isValid = checkCorrectSelect();
  const boothState = getBoothInfo();
  const modal = isValid
  ? modalInfo[selectedType as 'open' | 'order' | 'reservation']?.[boothState as 'true' | 'false'] ?? {}
  : modalInfo.error;

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[400px] h-[260px] flex flex-col justify-between items-center bg-white rounded-2xl">
        <div className="flex flex-col pt-[32px] items-center">
          <IconNotice type={isValid ? 'info' : 'error'} className="pb-[20px]" />
          <div className="text-secondary-700 font-bold text-md text-center">
            {modal.title}
          </div>
          <div className="pt-[12px] text-secondary-700-light text-sm whitespace-pre-wrap text-center">
            {modal.subTitle}
          </div>
        </div>
        <div className="flex justify-between gap-[20px] pb-[32px] w-full px-[40px]">
          {isValid ? (
            // success
            <>
              <button
                type="button"
                className="is-button is-outlined rounded-[16px] w-1/2 h-[40px] text-sm"
                onClick={() => closePopup()}
              >
                취소
              </button>
              <button
                type="submit"
                className="is-button w-1/2 h-[40px] text-sm rounded-[16px]"
                ref={submitRef}
              >
                확인
              </button>
            </>
          ) : (
            // error
            <button
              type="submit"
              className="is-button w-full h-[40px] text-sm rounded-[16px]"
              ref={submitRef}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default BoothPopup;