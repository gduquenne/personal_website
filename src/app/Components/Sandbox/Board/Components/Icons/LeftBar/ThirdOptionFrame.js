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

class ThirdOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 11 13" {...this.props}>
        <path d="M9.8421 2.39241L8.10526 1V2.39241H9.8421Z" fill="#102542" />
        <path
          d="M9.8421 2.39241L10 12H1V1H8.10526M9.8421 2.39241L8.10526 1M9.8421 2.39241H8.10526V1"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
      </SvgIcon>
    );
  }
}

export default ThirdOptionFrame;
