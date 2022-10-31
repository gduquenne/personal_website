import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button } from '@material-ui/core';

import {
  MiddleAlignIcon,
  BottomAlignIcon,
  TopAlignIcon
} from '../../Icons/FloatingBar/VerticalAlignIcons';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

const PROPERTIES = {
  width: 45,
  menuWidth: 55,
  menuPos: 48,
  menuHeight: 93
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonVerticalAlign = ({ menuOpen, ...props }) => {
  const classes = useStyles();
  return useMemo(() => displayButton(props, classes), [
    menuOpen === props.buttonName
  ]);
};

const displayButton = (
  {
    setVerticalAlign,
    calcMenuPos,
    calcButtonPosLeft,
    handleMenuOpen,
    getDropDownClass,
    setStyle,
    currentValue,
    buttonName,
    ...muiStyleProps
  },
  classes
) => {
  const {
    textAlignSelectStyle,
    dropDownClose,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const icon = handleAlignIcon(currentValue.verticalAlign);
  const dropDownClass = getDropDownClass(
    buttonName,
    textAlignSelectStyle,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyle}  ${dropDownClass.button}`;
  const menuPosStyle = calcMenuPos(
    {
      topPos: PROPERTIES.menuPos,
      leftPos: calcButtonPosLeft(buttonName)
    },
    {
      menuHeight: PROPERTIES.menuHeight,
      menuWidth: PROPERTIES.menuWidth
    }
  );

  return (
    <Button
      disableElevation={true}
      disableFocusRipple={true}
      disableRipple={true}
      {...muiStyleProps}
      onClick={handleMenuOpen}
    >
      {icon}
      <div
        className={dropDownClass.menu}
        style={{
          ...menuPosStyle
        }}
      >
        {verticalAlignOptions(
          currentValue.verticalAlign,
          setVerticalAlign,
          setStyle,
          classes
        )}
      </div>
    </Button>
  );
};

const verticalAlignOptions = (
  verticalAlign,
  setVerticalAlign,
  setStyle,
  classes
) => {
  const { customOption } = classes;
  const aligns = {
    top: props => <TopAlignIcon {...props} />,
    middle: props => <MiddleAlignIcon {...props} />,
    bottom: props => <BottomAlignIcon {...props} />
  };
  return Object.entries(aligns).map(([position, icon]) => (
    <div
      key={position}
      className={customOption}
      onClick={() => {
        setStyle('verticalAlign', position);
        setVerticalAlign();
        document.getElementsByClassName('upper-canvas')[0].click();
      }}
    >
      {icon({
        className: currentVerticalAlignStyle(verticalAlign, position, classes)
      })}
    </div>
  ));
};

const currentVerticalAlignStyle = (verticalAlign, alignIcon, classes) => {
  const { selectedAlignSvg, hoverAlignSvg } = classes;
  if (alignIcon === verticalAlign) {
    return selectedAlignSvg;
  } else {
    return hoverAlignSvg;
  }
};

const handleAlignIcon = alignValue => {
  if (alignValue === 'bottom') {
    return <BottomAlignIcon />;
  } else if (alignValue === 'top') {
    return <TopAlignIcon />;
  } else {
    return <MiddleAlignIcon />;
  }
};

export default ButtonVerticalAlign;
