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

class SecondOptionFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 10 13" {...this.props}>
        <path d="M8.85965 2.39241L7.31579 1V2.39241H8.85965Z" fill="#102542" />
        <path
          d="M8.85965 2.39241L9 12H1V1H7.31579M8.85965 2.39241L7.31579 1M8.85965 2.39241H7.31579V1"
          stroke="#102542"
          strokeWidth="0.75"
          fill="none"
        />
      </SvgIcon>
    );
  }
}

export default SecondOptionFrame;
