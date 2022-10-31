// Import Core
import React from 'react';

// Import Components from Material-UI
import { SvgIcon } from '@material-ui/core';

const MiddleAlignIcon = props => {
  return (
    <SvgIcon viewBox="0 0 64 64" fill="#102542" {...props}>
      <path d="m54 24h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
      <path d="m54 35h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
    </SvgIcon>
  );
};

const TopAlignIcon = props => {
  return (
    <SvgIcon fill="#102542" viewBox="0 0 64 64" {...props}>
      <path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
      <path d="m54 19h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
    </SvgIcon>
  );
};

const BottomAlignIcon = props => {
  return (
    <SvgIcon id="Layer" fill="#102542" viewBox="0 0 64 64" {...props}>
      <path d="m54 41h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
      <path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" />
    </SvgIcon>
  );
};

export { MiddleAlignIcon, TopAlignIcon, BottomAlignIcon };
