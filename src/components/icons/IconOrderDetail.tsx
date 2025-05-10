
import React from 'react';
import { IconOrderListProps } from '@/types/icons/icon.types';

const IconOrderList: React.FC<IconOrderListProps> = ({ isActive = true }) => {
  return (
    <div className="cursor-pointer">
      {isActive && (
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 0H2C0.89543 0 0 0.89543 0 2V16C0 17.1046 0.89543 18 2 18H12C13.1046 18 14 17.1046 14 16V2C14 0.89543 13.1046 0 12 0Z"
            fill="#0073F0"
          />
          <path d="M4.5 4.5H9.5M4.5 7.5H7.5M4.5 10.5H8.5M4.5 13.5H7.5" stroke="white" strokeLinecap="round" />
          <path
            d="M3 4.5C3 4.22386 2.77614 4 2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5C2.77614 5 3 4.77614 3 4.5Z"
            fill="white"
          />
          <path
            d="M3 7.5C3 7.22386 2.77614 7 2.5 7C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8C2.77614 8 3 7.77614 3 7.5Z"
            fill="white"
          />
          <path
            d="M3 10.5C3 10.2239 2.77614 10 2.5 10C2.22386 10 2 10.2239 2 10.5C2 10.7761 2.22386 11 2.5 11C2.77614 11 3 10.7761 3 10.5Z"
            fill="white"
          />
          <path
            d="M3 13.5C3 13.2239 2.77614 13 2.5 13C2.22386 13 2 13.2239 2 13.5C2 13.7761 2.22386 14 2.5 14C2.77614 14 3 13.7761 3 13.5Z"
            fill="white"
          />
        </svg>
      )}
    </div>
  );
};

export default IconOrderList;