import React from 'react';

const IconScroll: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_3383_140177"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3383_140177)">
        <path
          d="M16.8558 16.6535L15.7923 15.6092L18.627 12.7592H13V11.2497H18.627L15.802 8.40923L16.8558 7.36523L21.5 12.0092L16.8558 16.6535ZM7.15375 16.6535L2.5 12.0092L7.14425 7.36523L8.198 8.40923L5.373 11.2497H11V12.7592H5.3635L8.198 15.6092L7.15375 16.6535Z"
          fill="#888888"
        />
      </g>
    </svg>
  );
};

export default IconScroll;
