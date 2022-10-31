// Import Core
import React from 'react';

import GroupFrameIcon from './GroupFrameIcon';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const GroupIcons = ({ className, fill }) => (
  <SvgIcon viewBox="0 0 17 17" className={className}>
    {GroupFrameIcon(fill)}
    <rect
      x="7.46338"
      y="7.04877"
      width="4.97561"
      height="4.14634"
      fill={fill}
    />
    <rect
      x="4.39624"
      y="5.22559"
      width="5.30488"
      height="4.06098"
      fill={fill}
      stroke="white"
      strokeWidth="0.5"
    />
  </SvgIcon>
);

export default GroupIcons;
