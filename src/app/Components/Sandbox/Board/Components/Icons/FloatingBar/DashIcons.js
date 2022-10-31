// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const FullIcon = props => {
  return (
    <SvgIcon viewBox="0 -2 16 1" fill="#102542" {...props}>
      <rect width="16" height="1" fill="#102542" />
    </SvgIcon>
  );
};

const DashedIcon = props => {
  return (
    <SvgIcon viewBox="0 -2 16 1" fill="#102542" {...props}>
      <line y1="0.5" x2="2.28575" y2="0.5" stroke="#102542" />
      <line x1="3.42908" y1="0.5" x2="5.71483" y2="0.5" stroke="#102542" />
      <line x1="10.2864" y1="0.5" x2="12.5721" y2="0.5" stroke="#102542" />
      <line x1="6.85718" y1="0.5" x2="9.14293" y2="0.5" stroke="#102542" />
      <line x1="13.7142" y1="0.5" x2="16" y2="0.5" stroke="#102542" />
    </SvgIcon>
  );
};

const DashesIcon = props => {
  return (
    <SvgIcon viewBox="0 0 16 8" fill="#102542" {...props}>
      <rect width="16" height="2" fill="#102542" />
      <rect y="3" width="4.70588" height="2" fill="#102542" />
      <rect x="5.64709" y="3" width="4.70588" height="2" fill="#102542" />
      <rect x="11.2941" y="3" width="4.70588" height="2" fill="#102542" />
      <circle cx="6.5" cy="7" r="1" fill="#102542" />
      <circle cx="3.75" cy="7" r="1" fill="#102542" />
      <circle cx="1" cy="7" r="1" fill="#102542" />
      <circle cx="9.25" cy="7" r="1" fill="#102542" />
      <circle cx="12" cy="7" r="1" fill="#102542" />
      <circle cx="14.75" cy="7" r="1" fill="#102542" />
    </SvgIcon>
  );
};

const DottedIcon = props => {
  return (
    <SvgIcon viewBox="0 -2 16 1" fill="#102542" {...props}>
      <circle cx="0.5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="2" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="3.5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="6.5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="8" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="9.5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="11" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="12.5" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="14" cy="0.5" r="0.5" fill="#102542" />
      <circle cx="15.5" cy="0.5" r="0.5" fill="#102542" />
    </SvgIcon>
  );
};

export { FullIcon, DashedIcon, DottedIcon, DashesIcon };
