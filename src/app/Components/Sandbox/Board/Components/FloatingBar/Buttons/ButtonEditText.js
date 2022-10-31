import React from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button } from '@material-ui/core';

import { ShapeIcon, TextIcon } from '../../Icons/FloatingBar/EditTextIcons';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

const useStyles = makeStyles(floatingBarStyles);

const ButtonEditText = ({ setText, editingText, key, ...muiStyleProps }) => {
  const classes = useStyles();
  const { buttonStyle } = classes;
  muiStyleProps.className += ` ${buttonStyle}`;

  return (
    <Button
      {...muiStyleProps}
      key={key}
      style={{
        borderRight: '2px solid rgba(16, 37, 66, 1)'
      }}
      onClick={setText}
    >
      {handleIcons(editingText, classes)}
    </Button>
  );
};

const handleIcons = (editingText, classes) => {
  const { svgIcon } = classes;
  if (editingText) {
    return <ShapeIcon className={svgIcon} />;
  } else {
    return <TextIcon className={svgIcon} />;
  }
};

export default ButtonEditText;
