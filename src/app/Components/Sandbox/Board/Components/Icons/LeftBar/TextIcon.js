// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class TextIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox='0 0 29 23' {...this.props}>
        <path
          d='M10.977 22H6.43594V4.36328H0.620508V0.583984H16.7924V4.36328H10.977V22ZM26.1861 18.7334C26.9674 18.7334 27.9049 18.5625 28.9986 18.2207V21.5459C27.8854 22.0439 26.5182 22.293 24.8971 22.293C23.11 22.293 21.8062 21.8438 20.9859 20.9453C20.1754 20.0371 19.7701 18.6797 19.7701 16.873V8.97754H17.6314V7.08789L20.0924 5.59375L21.3814 2.13672H24.2379V5.62305H28.8229V8.97754H24.2379V16.873C24.2379 17.5078 24.4137 17.9766 24.7652 18.2793C25.1266 18.582 25.6002 18.7334 26.1861 18.7334Z'
          fill='rgba(16, 37, 66, 1)'
        />
      </SvgIcon>
    );
  }
}

export default TextIcon;
