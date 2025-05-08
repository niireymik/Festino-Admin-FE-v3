import React from 'react';

const IconDropDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      className="w-2 h-2 icon"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
      {...props}
    >
      <path
        className="icon-path"
        stroke="#999999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1L5 5L9 1"
      />
    </svg>
  );
};

export default IconDropDown;