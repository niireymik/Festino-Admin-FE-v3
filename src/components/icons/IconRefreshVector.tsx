import React from 'react';

interface IconRefreshVectorProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

const IconRefreshVector: React.FC<IconRefreshVectorProps> = ({
  width = 14,
  height = 15,
  strokeColor = 'white',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0271 7.84403C12.8837 8.93811 12.4451 9.9725 11.7584 10.8363C11.0717 11.7 10.1629 12.3606 9.12931 12.7471C8.09576 13.1336 6.97649 13.2314 5.89156 13.0301C4.80662 12.8288 3.79693 12.336 2.97079 11.6045C2.14465 10.873 1.53321 9.93044 1.20206 8.87785C0.870904 7.82526 0.832525 6.70239 1.09104 5.62964C1.34955 4.5569 1.8952 3.57476 2.66947 2.78856C3.44374 2.00236 4.41742 1.44175 5.48608 1.16687C8.44856 0.407064 11.5151 1.93199 12.6472 4.77366"
        stroke={strokeColor}
        strokeWidth="1.82353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0783 0.972656V4.77168H9.2793"
        stroke={strokeColor}
        strokeWidth="1.82353"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconRefreshVector;