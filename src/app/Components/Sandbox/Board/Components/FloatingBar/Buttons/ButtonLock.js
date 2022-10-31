import React, { useMemo } from 'react';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LockIcon, UnlockIcon } from '../../Icons/FloatingBar/LockIcons';
import textRm from '../../../Texts/textFloatingBar';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

const useStyles = makeStyles(floatingBarStyles);

const ButtonLock = props => {
  const classes = useStyles();
  return useMemo(() => displayButton(props, classes), [
    props.updated,
    props.currentValue.lockState
  ]);
};

const displayButton = (
  {
    setStyle,
    currentValue,
    language,
    setLock,
    isFirst,
    updated,
    setUpdated,
    ...muiStyleProps
  },
  classes
) => {
  muiStyleProps.className += ` ${classes.buttonStyle} ${classes.buttonMenuClosed} `;
  const style = !isFirst && {
    width: '30px',
    borderLeft: '0.5px solid #102542',
    marginLeft: '1px'
  };
  const { text, icon } = getLockSpecs(currentValue.lockState, language);
  return (
    <Tooltip title={text} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        style={{ ...style }}
        onClick={() => {
          setLock();
          setUpdated(!updated);
        }}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

const getLockSpecs = (lockState, language) => {
  if (lockState) {
    return { icon: <LockIcon />, text: textRm.unlock[language] };
  } else {
    return { icon: <UnlockIcon />, text: textRm.lock[language] };
  }
};

export default ButtonLock;
