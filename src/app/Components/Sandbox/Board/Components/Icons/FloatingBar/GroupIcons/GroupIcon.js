// Import Core
import React from 'react';

import GroupFrameIcon from './GroupFrameIcon';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const GroupIcon = ({ className, fill, fillSpecColorRect }) => (
  <SvgIcon viewBox="0 0 17 17" className={className}>
    {GroupFrameIcon(fill)}
    <rect x="8" y="7" width="5" height="5" fill={fill} />
    <rect x="5" y="5" width="5" height="5" fill={fillSpecColorRect} />
  </SvgIcon>
);

export default GroupIcon;
