// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const PaletteIcon = ({ className, fill }) => (
  <SvgIcon viewBox="0 0 24 22" className={className}>
    <path
      d="M16.56 8.94L8.32.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l1.68 1.68-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"
      fill="#102542"
    />
    <rect
      y="22"
      width="20"
      height="0.000000001"
      strokeWidth="4"
      stroke={fill}
    />
  </SvgIcon>
);

export default PaletteIcon;
