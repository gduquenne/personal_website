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

class EighthOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 6 8" {...this.props}>
        <rect
          x="0.375"
          y="7.625"
          width="7.25"
          height="5.25"
          rx="0.625"
          transform="rotate(-90 0.375 7.625)"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
      </SvgIcon>
    );
  }
}

export default EighthOptionFrame;
