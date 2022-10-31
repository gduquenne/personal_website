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

class BoardIconActive extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 25 27" {...this.props}>
        <path
          d="M11.8421 0H0.328918V5.68423H11.8421V0Z"
          fill="rgba(255,255,255,1)"
        />
        <path
          d="M11.8421 7.10535H0.328918V27.0001H11.8421V7.10535Z"
          fill="rgba(255,255,255,1)"
        />
        <path
          d="M24.6711 14.2106H13.158V27.0001H24.6711V14.2106Z"
          fill="rgba(255,255,255,1)"
        />
        <path
          d="M24.6711 0H13.158V12.7895H24.6711V0Z"
          fill="rgba(255,255,255,1)"
        />
      </SvgIcon>
    );
  }
}

export default BoardIconActive;
