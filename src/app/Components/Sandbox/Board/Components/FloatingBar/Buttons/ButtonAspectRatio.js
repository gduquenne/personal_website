import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);
const PROPERTIES = {
  width: 45,
  menuWidth: 253,
  menuHeight: 120,
  menuPos: 48
};

const ButtonAspectRatio = ({ menuOpen, ...props }) => {
  const classes = useStyles();
  return useMemo(() => displayButton(props, classes), [
    menuOpen === props.buttonName
  ]);
};

const displayButton = (
  {
    calcMenuPos,
    calcButtonPosLeft,
    handleMenuOpen,
    getDropDownClass,
    typeArray,
    setFrameType,
    setStyle,
    currentValue,
    buttonName,
    language,
    ...muiStyleProps
  },
  classes
) => {
  const {
    aspectRatioSelect,
    dropDownClose,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    aspectRatioSelect,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyle}  ${dropDownClass.button}`;
  return (
    <Tooltip title={textRm.aspectRatio[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        style={{
          width: PROPERTIES.width,
          fontSize: '9px'
        }}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        {textRm.aspectRatio[language]}
        <div
          onMouseOver={e => e.stopPropagation()}
          style={{
            ...calcMenuPos(
              {
                topPos: PROPERTIES.menuPos,
                leftPos: calcButtonPosLeft(buttonName)
              },
              {
                menuHeight: PROPERTIES.menuHeight,
                menuWidth: PROPERTIES.menuWidth
              }
            )
          }}
          className={dropDownClass.menu}
        >
          {aspectRatioOptions(typeArray, setFrameType, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const aspectRatioOptions = (typeArray, setFrameType, classes) => {
  const { aspectRatio } = classes;
  return typeArray.map((typeProps, index) => {
    return (
      <div
        className={aspectRatio}
        key={`ratio${typeProps.name}`}
        onClick={() => setFrameType(index)}
      >
        {typeProps.name}
      </div>
    );
  });
};

export default ButtonAspectRatio;
