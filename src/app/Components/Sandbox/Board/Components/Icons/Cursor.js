// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

/*
 * #########################################################################
 * #                                                                       #
 * #                                                                       #
 * #                                                                       #
 * #                                                                       #
 * #                             SVG ICON                                  #
 * #                                                                       #
 * #                                                                       #
 * #                                                                       #
 * #                                                                       #
 * #########################################################################
 */

const Cursor = ({ fill, isHostOrPro }, props) => {
  let cursorType;
  if (isHostOrPro) {
    cursorType = 'rgb(16, 37, 66)';
  }
  return (
    <SvgIcon viewBox="0 0 36 35" {...props}>
      <path
        d="M19.5277 33.4238L8.67003 9.08136L33.605 18.4992L22.8419 22.1253L22.5894 22.2104L22.5192 22.4674L19.5277 33.4238Z"
        fill={fill}
        stroke={cursorType}
      />
    </SvgIcon>
  );
};

export default Cursor;
