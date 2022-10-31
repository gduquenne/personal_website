// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const OptionIcon = props => {
  return (
    <SvgIcon viewBox="0 -3 3 18" {...props}>
      <ellipse cx="1.5" cy="1.625" rx="1.5" ry="1.625" fill="#102542" />
      <ellipse cx="1.5" cy="6.5" rx="1.5" ry="1.625" fill="#102542" />
      <ellipse cx="1.5" cy="11.375" rx="1.5" ry="1.625" fill="#102542" />
    </SvgIcon>
  );
};

export default OptionIcon;
