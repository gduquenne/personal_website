// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const FontStyleIcon = props => {
  return (
    <SvgIcon viewBox="0 -3 13 16" {...props}>
      <path
        d="M2.64453 9L4.44336 0.410156H7.37891C8.01562 0.410156 8.46094 0.429687 8.71484 0.46875C9.13672 0.527344 9.49414 0.644531 9.78711 0.820312C10.0801 0.996094 10.3027 1.23047 10.4551 1.52344C10.6074 1.81641 10.6836 2.14062 10.6836 2.49609C10.6836 2.97266 10.5508 3.38672 10.2852 3.73828C10.0195 4.08594 9.60938 4.34961 9.05469 4.5293C9.49609 4.65039 9.83984 4.86719 10.0859 5.17969C10.3359 5.48828 10.4609 5.83789 10.4609 6.22852C10.4609 6.74414 10.3145 7.23438 10.0215 7.69922C9.72852 8.16016 9.32422 8.49219 8.80859 8.69531C8.29297 8.89844 7.58789 9 6.69336 9H2.64453ZM5.48047 3.87891H6.82812C7.43359 3.87891 7.86914 3.83594 8.13477 3.75C8.40039 3.66406 8.59961 3.52344 8.73242 3.32812C8.86523 3.13281 8.93164 2.92383 8.93164 2.70117C8.93164 2.48242 8.86914 2.30273 8.74414 2.16211C8.61914 2.02148 8.44141 1.92773 8.21094 1.88086C8.08203 1.85742 7.77148 1.8457 7.2793 1.8457H5.9082L5.48047 3.87891ZM4.70117 7.61719H6.40625C7.12109 7.61719 7.59961 7.57227 7.8418 7.48242C8.08789 7.38867 8.2832 7.23633 8.42773 7.02539C8.57617 6.81445 8.65039 6.5918 8.65039 6.35742C8.65039 6.07227 8.54492 5.83789 8.33398 5.6543C8.12305 5.4668 7.77148 5.37305 7.2793 5.37305H5.16992L4.70117 7.61719Z"
        fill="#102542"
      />
      <rect y="9.81818" width="12" height="1.09091" fill="#102542" />
    </SvgIcon>
  );
};

const UnderlineIcon = props => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M12.79 16.95c3.03-.39 5.21-3.11 5.21-6.16V4.25C18 3.56 17.44 3 16.75 3s-1.25.56-1.25 1.25v6.65c0 1.67-1.13 3.19-2.77 3.52-2.25.47-4.23-1.25-4.23-3.42V4.25C8.5 3.56 7.94 3 7.25 3S6 3.56 6 4.25V11c0 3.57 3.13 6.42 6.79 5.95zM5 20c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"
        fillOpacity="0.8"
        fill="#102542"
      />
    </SvgIcon>
  );
};

const BoldIcon = props => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
        fillOpacity="0.8"
        fill="#102542"
      />
    </SvgIcon>
  );
};

const LinethroughIcon = props => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M14.59 7.52c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13s-.53.21-.72.36c-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43s.38 1.15.38 1.81h-3.01M20 10H4c-.55 0-1 .45-1 1s.45 1 1 1h8.62c.18.07.4.14.55.2.37.17.66.34.87.51s.35.36.43.57c.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75s-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58s.37.85.65 1.21c.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H20c.55 0 1-.45 1-1V11c0-.55-.45-1-1-1z"
        fillOpacity="0.8"
        fill="#102542"
      />
    </SvgIcon>
  );
};

const ItalicIcon = props => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z"
        fillOpacity="0.8"
        fill="#102542"
      />
    </SvgIcon>
  );
};

export { FontStyleIcon, BoldIcon, LinethroughIcon, UnderlineIcon, ItalicIcon };