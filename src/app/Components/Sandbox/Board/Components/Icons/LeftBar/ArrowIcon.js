// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class ArrowIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 25 25" {...this.props}>
        <path
          d="M21.65 11.65l-2.79-2.79c-.32-.32-.86-.1-.86.35V11H4c-.55 0-1 .45-1 1s.45 1 1 1h14v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.19.2-.51.01-.7z"
          fill="rgba(16, 37, 66, 1)"
          // fill="rgba(0, 0, 0, 0.26)"
        />
      </SvgIcon>
    );
  }
}

export default ArrowIcon;
