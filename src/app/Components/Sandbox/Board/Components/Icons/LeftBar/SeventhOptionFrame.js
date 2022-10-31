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

class SeventhOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 5 8" {...this.props}>
        <rect
          x="0.375"
          y="7.625"
          width="7.25"
          height="4.25"
          rx="0.625"
          transform="rotate(-90 0.375 7.625)"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
        <circle cx="2.5" cy="6.5" r="0.5" fill="#102542" />
      </SvgIcon>
    );
  }
}

export default SeventhOptionFrame;
