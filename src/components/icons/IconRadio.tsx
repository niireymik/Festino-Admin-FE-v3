import { IconRadioProps } from '@/types/icons/icon.types';
import React from 'react';

const IconRadio: React.FC<IconRadioProps> = ({ isActive = false, readOnly = false }) => {
  const renderSvg = () => {
    if (isActive && !readOnly) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#0073F0" />
          <path
            d="M7.19922 11.9984L10.7992 15.5984L17.9992 8.39844"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (!isActive && !readOnly) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#CCCCCC" />
          <path
            d="M7.19922 11.9984L10.7992 15.5984L17.9992 8.39844"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (isActive && readOnly) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12.5" r="12" fill="#66CF55" />
          <path
            d="M7.19922 12.5L10.7992 16.1L17.9992 8.90002"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    return (
      <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12.5" r="12" fill="#FF6D6D" />
        <path
          d="M7.19922 12.5L10.7992 16.1L17.9992 8.90002"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return <div className="cursor-pointer">{renderSvg()}</div>;
};

export default IconRadio;