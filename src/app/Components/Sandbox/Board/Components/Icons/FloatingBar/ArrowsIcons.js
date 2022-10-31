// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const ArrowsIcons = props => {
  return (
    <SvgIcon viewBox="-3 -3 15 18" fill="#102542">
      <path
        onClick={e => props.onArrowChange(e, -1)}
        d="M3.5 11L0.468911 7.25H6.53109L3.5 11Z"
        fill="#102542"
      />
      <path
        onClick={e => props.onArrowChange(e, 1)}
        d="M3.5 0L6.53109 3.75L0.468911 3.75L3.5 0Z"
        fill="#102542"
      />
    </SvgIcon>
  );
};

export default ArrowsIcons;
