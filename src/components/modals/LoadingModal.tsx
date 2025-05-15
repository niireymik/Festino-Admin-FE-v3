
import React from 'react';
import IconLoading from '../icons/IconLoading';

const LoadingModal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <IconLoading width={300} />
      <div className="text-white font-light font-jalnan2 text-xl pt-[40px]">
        귀여운 티노가 요청을 처리중이에요...
      </div>
    </div>
  );
};

export default LoadingModal;
