// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class CursorIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 24 24" {...this.props}>
        <path
          d="M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2"
          fill="rgba(16, 37, 66, 1)"
        />
      </SvgIcon>
    );
  }
}

export default CursorIcon;
