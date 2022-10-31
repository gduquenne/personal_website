// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class HandIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 30 30" {...this.props}>
        <path
          fill="rgba(16, 37, 66, 1)"
          d="M25,24V14c-3,0-4-1-4-1h-4l-8-1v7.5C6.448,18.201,5.289,18,4,18c-1.5,0-3,0.579-3,2.5v-0.014L5.5,22.5l3.157,3.157c1.5,1.5,3.535,2.343,5.657,2.343H21C23.209,28,25,26.209,25,24z"
        />
        <path
          fill="rgba(16, 37, 66, 1)"
          d="M19 11A2 2 0 1 0 19 15A2 2 0 1 0 19 11Z"
        />
        <path
          fill="rgba(16, 37, 66, 1)"
          d="M17 12c0-1.105-.895-2-2-2s-2 .895-2 2c0 .174 0 .826 0 1 0 1.105.895 2 2 2s2-.895 2-2C17 12.826 17 12.174 17 12zM23 12A2 2 0 1 0 23 16 2 2 0 1 0 23 12zM11 2L11 2C9.895 2 9 2.895 9 4v9h4V4C13 2.895 12.105 2 11 2z"
        />
      </SvgIcon>
    );
  }
}

export default HandIcon;
