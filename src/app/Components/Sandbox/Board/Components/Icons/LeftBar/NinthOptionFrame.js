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

class NinthOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 14 10" {...this.props}>
        <rect
          x="0.375"
          y="0.375"
          width="13.25"
          height="9.25"
          rx="0.625"
          stroke="#102542"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="1.25" cy="1.25" r="0.25" fill="#102542" />
        <circle cx="2.25" cy="1.25" r="0.25" fill="#102542" />
        <circle cx="3.25" cy="1.25" r="0.25" fill="#102542" />
      </SvgIcon>
    );
  }
}

export default NinthOptionFrame;
