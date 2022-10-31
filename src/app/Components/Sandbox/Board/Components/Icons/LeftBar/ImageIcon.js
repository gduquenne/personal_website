// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class ImageIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox='0 0 31 25' {...this.props}>
        <path
          d='M27.1652 0.833336H3.83189C2.22335 0.833336 0.915222 2.14146 0.915222 3.75V21.25C0.915222 22.8585 2.22335 24.1667 3.83189 24.1667H27.1652C28.7738 24.1667 30.0819 22.8585 30.0819 21.25V3.75C30.0819 2.14146 28.7738 0.833336 27.1652 0.833336ZM7.47772 5.20834C8.05788 5.20834 8.61428 5.4388 9.02452 5.84904C9.43475 6.25927 9.66522 6.81567 9.66522 7.39584C9.66522 7.976 9.43475 8.5324 9.02452 8.94263C8.61428 9.35287 8.05788 9.58333 7.47772 9.58334C6.89756 9.58333 6.34116 9.35287 5.93093 8.94263C5.52069 8.5324 5.29022 7.976 5.29022 7.39584C5.29022 6.81567 5.52069 6.25927 5.93093 5.84904C6.34116 5.4388 6.89756 5.20834 7.47772 5.20834ZM15.4986 19.7917H5.29022L11.1236 12.5L13.3111 15.4167L17.6861 9.58334L25.7069 19.7917H15.4986Z'
          fill='rgba(16, 37, 66, 1)'
        />
      </SvgIcon>
    );
  }
}

export default ImageIcon;
