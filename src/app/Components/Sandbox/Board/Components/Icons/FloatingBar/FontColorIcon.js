// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const FontColorIcon = ({ className, fill }) => (
  <SvgIcon width="13" height="14" viewBox="0 -1 13 16" className={className}>
    <rect
      y="14"
      width="13"
      height="0.000000001"
      strokeWidth="2"
      stroke={fill}
    />
    <path
      d="M10.7832 11H8.89648L8.14648 9.04883H4.71289L4.00391 11H2.16406L5.50977 2.41016H7.34375L10.7832 11ZM7.58984 7.60156L6.40625 4.41406L5.24609 7.60156H7.58984Z"
      fill="#102542"
    />
  </SvgIcon>
);

export default FontColorIcon;
