// Import Core
import React from 'react';

import GroupFrameIcon from './GroupFrameIcon';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const UngroupIcon = ({ className, fill, fillSpecColorRect }) => (
  <SvgIcon viewBox="0 0 17 17" className={className}>
    {GroupFrameIcon(fill)}
    <rect x="9" y="9" width="4" height="4" fill={fill} />
    <rect x="4" y="4" width="4" height="4" fill={fillSpecColorRect} />
  </SvgIcon>
);

export default UngroupIcon;
