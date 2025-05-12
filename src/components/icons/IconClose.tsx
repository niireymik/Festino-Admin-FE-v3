import React from 'react';

export interface IconCloseProps {
  onClick: () => void;
  className?: string;
}

const IconClose: React.FC<IconCloseProps> = ({ onClick, className = '' }) => {
  return (
    <div 
      onClick={() => onClick()}
      className={`${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M23.2266 2L2.50121 22.7253"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M23.2266 22.7266L2.50122 2.00121"
            stroke="#999999"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default IconClose;
