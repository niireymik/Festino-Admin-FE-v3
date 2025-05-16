import { BOOTH_POPUP_INFO } from '@/constants/constant';
import { useReservePopupStore } from '@/stores/reserve/reservePopup';
import React, { useEffect, useRef, useState } from 'react';
import IconBoothInfo from '../icons/IconBoothInfo';

const BoothConfirmModal: React.FC = () => {
  const {
    submitBoothReservePopup,
    submitPopup,
    closePopup,
    reservationInfo,
    boothInfo,
    popupType,
  } = useReservePopupStore();

  const [isSubmit, setIsSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    if (isSubmit) return;
    setIsSubmit(true);
    if (popupType === 'booth') {
      await submitBoothReservePopup();
    } else {
      await submitPopup();
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    if (popupType === 'booth') {
      const isReservationKey = String(boothInfo?.isReservation) as 'true' | 'false';
      const info = BOOTH_POPUP_INFO.booth[isReservationKey];
      setTitle(info.title);
      setSubTitle(info.subTitle);
    } else if (popupType === 'restore' || popupType === 'confirm' || popupType === 'cancel') {
      const info = BOOTH_POPUP_INFO[popupType];
      setTitle(info.title);
      setSubTitle(info.subTitle);
    } else {
      setTitle('');
      setSubTitle('');
    }
  }, [popupType, boothInfo]);  

  useEffect(() => {
    submitRef.current?.focus();
  }, []);

  useEffect(() => {
    submitRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="w-[400px] h-[260px] flex flex-col justify-between items-center bg-white rounded-2xl p-8">
        {/* Info */}
        <div className="flex flex-col justify-center items-center w-full">
          <IconBoothInfo type={popupType === 'cancel' ? 'danger' : 'info'} />
          <p className="text-md font-bold text-secondary-700 pt-[20px]">{title}</p>

          {popupType === 'reserve' && (
            <div className="w-full flex flex-col gap-[10px] py-[10px]">
              <div className="text-secondary-700-light text-xl font-medium">예약자 정보</div>
              <div className="relative rounded-xl border-primary-700 border w-full">
                <table className="w-full">
                  <thead className="bg-primary-700-light text-secondary-900 h-[50px]">
                    <tr>
                      <th className="font-light text-center">예약 번호</th>
                      <th className="font-light text-center">예약자</th>
                      <th className="font-light text-center">연락처</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center h-[50px]">
                      <td>{reservationInfo?.reservationNum}</td>
                      <td>{reservationInfo?.userName}</td>
                      <td>{reservationInfo?.phoneNum}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="pt-[12px] text-secondary-700-light text-sm whitespace-pre-wrap text-center">
            {subTitle}
          </p>
        </div>

        {/* Button Row */}
        <div className="flex justify-between gap-[20px] w-full items-end">
          <button
            type="button"
            className={`grow h-[40px] is-button is-outlined text-sm ${popupType === 'cancel' ? 'is-danger' : ''}`}
            onClick={closePopup}
          >
            취소
          </button>
          <button
            type="submit"
            className={`grow h-[40px] is-button text-sm ${popupType === 'cancel' ? 'is-danger' : ''}`}
            ref={submitRef}
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
};

export default BoothConfirmModal;