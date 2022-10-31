// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox='0 0 40 50' {...this.props}>
        <path d='M8.75 14.8438H31.25V17.9688H8.75V14.8438Z' />
        <path d='M8.75 23.4375H31.25V26.5625H8.75V23.4375Z' />
        <path d='M8.75 32.0312H20.625V35.1562H8.75V32.0312Z' />
        <path d='M2.5 4.6875V45.3125H37.5V4.6875H2.5ZM35 42.1875H5V7.8125H35V42.1875Z' />
      </SvgIcon>
    );
  }
}

export default Notes;
