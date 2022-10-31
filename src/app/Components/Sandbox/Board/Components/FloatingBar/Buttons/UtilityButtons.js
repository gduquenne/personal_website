import React, { useMemo } from 'react';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  CopyIcon,
  CutIcon,
  BringToBackIcon,
  BringToFrontIcon
} from '../../Icons/FloatingBar/UtilityIcons';
import textRm from '../../../Texts/textFloatingBar';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

const useStyles = makeStyles(floatingBarStyles);

const UtilityButtons = props => {
  const classes = useStyles();
  return useMemo(() => displayButton(props, classes), []);
};

const displayButton = (
  {
    setStyle,
    currentValue,
    buttonName,
    language,
    bringToFrontOrBack,
    deleteItems,
    ...muiStyleProps
  },
  classes
) => {
  muiStyleProps.className += ` ${classes.buttonStyle} ${classes.buttonMenuClosed} `;

  const buttons = {
    cut: {
      icon: <CutIcon className={classes.utilityIcon} />,
      clbk: () => {
        window.dispatchEvent(new Event('copy'));
        deleteItems();
      },
      text: textRm.cut[language]
    },
    copy: {
      icon: <CopyIcon className={classes.utilityIcon} />,
      clbk: () => window.dispatchEvent(new Event('copy')),
      text: textRm.copy[language]
    },
    bringToFront: {
      icon: <BringToFrontIcon className={classes.utilityIcon} />,
      clbk: () => bringToFrontOrBack('bringForward'),
      text: textRm.bringToFront[language]
    },
    bringToBack: {
      icon: <BringToBackIcon className={classes.utilityIcon} />,
      clbk: () => bringToFrontOrBack('sendBackwards'),
      text: textRm.sendToBack[language]
    }
  };

  return Object.entries(buttons).map(([key, { icon, clbk, text }]) => {
    return (
      <Tooltip key={key} title={text} placement="top" arrow>
        <Button
          key={key}
          {...muiStyleProps}
          disableElevation={true}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={clbk}
        >
          {icon}
        </Button>
      </Tooltip>
    );
  });
};

export default UtilityButtons;
