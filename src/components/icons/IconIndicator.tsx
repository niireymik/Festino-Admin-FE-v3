import React from 'react';

interface ArrowProps {
  left?: boolean;
  right?: boolean;
}

const IconIndicator: React.FC<ArrowProps> = ({ left = false, right = false }) => {
  return (
    <div className="cursor-pointer">
      {left && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" transform="matrix(-1 0 0 1 32 0)" fill="#0073F0" fillOpacity="0.08" />
          <mask id="mask0_1736_4251" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
            <rect width="22.4" height="22.4" transform="matrix(-1 0 0 1 27.2031 4.79688)" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1736_4251)">
            <path
              d="M15.441 15.9984L19.081 12.3584C19.4419 11.9976 19.4419 11.4126 19.081 11.0518C18.7202 10.6909 18.1352 10.6909 17.7744 11.0518L13.9591 14.8671C13.3342 15.4919 13.3342 16.505 13.9591 17.1298L17.7744 20.9451C18.1352 21.3059 18.7202 21.3059 19.081 20.9451C19.4419 20.5843 19.4419 19.9993 19.081 19.6384L15.441 15.9984Z"
              fill="#0073F0"
            />
          </g>
        </svg>
      )}
      {right && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#0073F0" fillOpacity="0.08" />
          <mask id="mask0_1736_4272" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
            <rect x="4.79688" y="4.79688" width="22.4" height="22.4" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_1736_4272)">
            <path
              d="M16.559 15.9984L12.919 12.3584C12.5581 11.9976 12.5581 11.4126 12.919 11.0518C13.2798 10.6909 13.8648 10.6909 14.2256 11.0518L18.0409 14.8671C18.6658 15.4919 18.6658 16.505 18.0409 17.1298L14.2256 20.9451C13.8648 21.3059 13.2798 21.3059 12.919 20.9451C12.5581 20.5843 12.5581 19.9993 12.919 19.6384L16.559 15.9984Z"
              fill="#0073F0"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default IconIndicator;