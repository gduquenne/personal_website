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

class InstructionIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 24 24" {...this.props}>
        <circle
          cx="12"
          cy="12"
          r="11.25"
          stroke="#102542"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="11" y="8" width="2" height="12" fill="#102542" />
        <rect x="11" y="5" width="2" height="2" fill="#102542" />
      </SvgIcon>
    );
  }
}

export default InstructionIcon;
