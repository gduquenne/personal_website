// Import Core
import React, { Component } from 'react';

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

class CustomFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 12 9" {...this.props}>
        <rect
          x="1.77887"
          y="1.79163"
          width="8.94231"
          height="5.91667"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
        <path
          d="M1 2.25V1H2.21154V2.25H1Z"
          stroke="#102542"
          strokeWidth="0.75"
        />
        <path
          d="M1 7.25H2.21154V8.5H1V7.25Z"
          stroke="#102542"
          strokeWidth="0.75"
        />
        <path
          d="M10.2885 2.25V1H11.5V2.25H10.2885Z"
          stroke="#102542"
          strokeWidth="0.75"
        />
        <path
          d="M10.2885 7.25H11.5V8.5H10.2885V7.25Z"
          stroke="#102542"
          strokeWidth="0.75"
        />
      </SvgIcon>
    );
  }
}

export default CustomFrame;
