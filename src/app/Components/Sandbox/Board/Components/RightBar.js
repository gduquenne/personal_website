// Import Core
import React, { useState } from 'react';

// Import Components from Material-UI
import { Fab } from '@material-ui/core';

// Import Styles
import rightBarStyles from './StyleSheets/rightBarStyles.jss';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

//Import Icons
import ChatIcon from './Icons/RightBar/ChatIcon';
import InstructionIcon from './Icons/RightBar/InstructionIcon';
import TipsIcon from './Icons/RightBar/TipsIcon';
import SettingsIcon from './Icons/RightBar/SettingsIcon';

const useStyles = makeStyles(rightBarStyles);

const RightBar = function () {
  const classes = useStyles();

  const [menuOpen, setMenuOpen] = useState(null);
  const [hoverButton, setHoverButton] = useState(null);

  const fabStyle = (text, icon, clbk, fabClass) => {
    return (
      <Fab
        id={text}
        key={text}
        color="default"
        onClick={clbk}
        className={classes[fabClass]}
        onMouseEnter={() => setHoverButton(text)}
        onMouseLeave={() => setHoverButton(null)}
      >
        {icon}
        {hoverButton === text && menuOpen !== text && (
          <p className={classes.text}>{text}</p>
        )}
      </Fab>
    );
  };

  const scale = Math.min(1, Math.max(window.innerWidth / 1920, 0.5));

  return (
    <div
      id="rightbar"
      className={classes.rightBar}
      style={{
        transform: `scale(${scale},${scale} )`
      }}
    >
      {fabStyle('chat', <ChatIcon />, () => setMenuOpen(null), 'icons')}
      {fabStyle(
        'instructions',
        <InstructionIcon />,
        () => setMenuOpen(null),
        'icons'
      )}
      {fabStyle('pro tips', <TipsIcon />, () => setMenuOpen(null), 'icons')}
      {fabStyle(
        'host settings',
        <SettingsIcon />,
        () => setMenuOpen(null),
        'icons'
      )}
    </div>
  );
};

export default RightBar;
