// Import Core
import React, { Component } from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

class DrawIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon viewBox="0 0 29 27" {...this.props}>
        <path
          d="M12.2188 26.4062C14.8146 25.3854 14.2459 22.5708 12.9334 20.7917C11.6355 18.9688 9.84173 17.7146 8.0334 16.5042C6.74314 15.6909 5.59111 14.6768 4.6209 13.5C4.21256 13.0187 3.38131 12.1292 4.22715 11.9542C5.08756 11.7792 6.57506 12.625 7.3334 12.9458C8.66048 13.5 9.97298 14.1417 11.198 14.9L12.6709 12.4208C10.3959 10.9187 7.47923 9.59167 4.76673 9.19792C3.2209 8.96458 1.58756 9.28542 1.06256 10.9625C0.595895 12.4062 1.33964 13.8646 2.18548 15.0021C4.1834 17.6708 7.28965 18.9542 9.6084 21.2583C10.1042 21.7396 10.7021 22.3083 10.9938 22.9792C11.3001 23.6208 11.2271 23.6646 10.5417 23.6646C8.7334 23.6646 6.47298 22.25 5.00006 21.3167L3.52715 23.7958C5.7584 25.1667 9.49173 27.3104 12.2188 26.4062ZM28.3917 3.65625C28.7126 3.33542 28.7126 2.81042 28.3917 2.50417L26.4959 0.608333C26.3432 0.461121 26.1393 0.378868 25.9271 0.378868C25.715 0.378868 25.5111 0.461121 25.3584 0.608333L23.8709 2.09583L26.9042 5.12917L28.3917 3.65625ZM14.0417 11.925V14.9583H17.0751L26.0438 5.98958L23.0105 2.95625L14.0417 11.925Z"
          fill="rgba(16, 37, 66, 1)"
        />
      </SvgIcon>
    );
  }
}

export default DrawIcon;