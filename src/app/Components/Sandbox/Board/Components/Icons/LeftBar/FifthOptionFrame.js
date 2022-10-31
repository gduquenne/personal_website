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

class FifthOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 11 8" {...this.props}>
        <rect
          x="0.375"
          y="0.375"
          width="9.25"
          height="7.25"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
      </SvgIcon>
    );
  }
}

export default FifthOptionFrame;
