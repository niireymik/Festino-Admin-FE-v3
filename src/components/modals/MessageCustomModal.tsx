import React, { useEffect, useState } from 'react';
import IconClose from '../icons/IconClose';
import { useMessageStore } from '@/stores/reserve/message';
import { useBaseModal } from '@/stores/commons/baseModal';

const MessageCustomModal: React.FC = () => {
  const { customMessageList, saveCustomMessage } = useMessageStore();
  const { closeModal } = useBaseModal();

  const [messageList, setMessageList] = useState([...customMessageList]);

  useEffect(() => {
    setMessageList([...customMessageList]);
  }, [customMessageList]);

  const handleInputMessage = (e: React.ChangeEvent<HTMLInputElement>, type: number) => {
    let value = e.target.value;
    if (value.length > 35) {
      value = value.slice(0, 35);
    }
    const updatedList = [...messageList];
    updatedList[type].message = value;
    setMessageList(updatedList);
  };

  const handleClickSaveButton = () => {
    if (messageList.some((msg) => msg.message.length === 0)) {
      alert('메시지 내용을 입력해주세요.');
      return;
    }
    saveCustomMessage(messageList);
  };

  return (
    <div className="min-w-[515px] w-[600px] h-fit bg-white rounded-2xl p-10 flex flex-col justify-between">
      <div className="flex flex-col w-full gap-[28px]">
        <div>
          <div className="w-full flex justify-between items-center gap-5 shrink-0 font-semibold text-xl text-primary-800 h-9 pb-2">
            <div className="w-[25px]" />
            문자 커스텀
            <IconClose onClick={closeModal} className="w-8 h-8 p-2 cursor-pointer hover:bg-gray-100 rounded-2xl" />
          </div>
          <div className="text-secondary-700 font-medium text-center text-sm">
            메시지 앞에 <span className="text-danger font-bold">_ _ _님</span>이 고정으로 붙습니다.<br />
            보낼 메시지 내용을 35글자 이내로 입력해주세요.
          </div>
        </div>

        {['예약 완료', '입장 완료', '예약 취소'].map((label, index) => (
          <div key={index} className="flex flex-col gap-[10px] relative">
            <div className="text-md font-semibold pl-2">{label}</div>
            <input
              type="text"
              placeholder={
                index === 0
                  ? 'ㅇㅇㅇ학과 예약이 완료되었습니다.'
                  : index === 1
                  ? 'ㅇㅇㅇ학과에서 즐거운 시간 보내시기 바랍니다.'
                  : 'ㅇㅇㅇ학과 예약이 취소 되었습니다.'
              }
              onChange={(e) => handleInputMessage(e, index)}
              value={messageList[index]?.message || ''}
              maxLength={35}
              className="text-secondary-700 w-full h-[48px] border-1 border-secondary-700 rounded-xl px-[17px] font-medium focus:border-primary-800 focus:outline-none focus:border-1 text-sm"
            />
            <div className="absolute bottom-[13px] right-5 text-secondary-500-light-70 text-sm">
              {messageList[index]?.message.length || 0}/35
            </div>
          </div>
        ))}

        <div className="w-full flex justify-end items-center text-xl gap-3">
          <button
            className="is-button is-outlined font-semibold w-[60px] h-[35px] rounded-xl text-sm flex items-center justify-center text-primary-800 bg-white cursor-pointer select-none"
            onClick={() => closeModal()}
          >
            취소
          </button>
          <button
            className="is-button font-semibold w-[60px] h-[35px] rounded-xl text-sm flex items-center justify-center text-white bg-primary-800 cursor-pointer select-none"
            onClick={() => handleClickSaveButton()}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCustomModal;