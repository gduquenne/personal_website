import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon
} from '../../Icons/FloatingBar/FontAlignIcon';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const PROPERTIES = {
  width: 45,
  menuWidth: 55,
  menuHeight: 93,
  menuPos: 48
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonTextAlign = ({ menuOpen, ...props }) => {
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
    setStyle,
    currentValue,
    buttonName,
    language,
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
  const icon = handleAlignIcon(currentValue.textAlign);
  const dropDownClass = getDropDownClass(
    buttonName,
    textAlignSelectStyle,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
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

  muiStyleProps.className += ` ${buttonStyle}  ${dropDownClass.button}`;

  return (
    <Tooltip title={textRm.textAlign[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleMenuOpen}
      >
        {icon}
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {textAlignOptions(currentValue.textAlign, setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const handleAlignIcon = alignValue => {
  if (alignValue === 'left') {
    return <LeftAlignIcon />;
  } else if (alignValue === 'right') {
    return <RightAlignIcon />;
  } else {
    return <CenterAlignIcon />;
  }
};

const textAlignOptions = (textAlign, setStyle, classes) => {
  const { customOption } = classes;
  const aligns = {
    left: props => <LeftAlignIcon {...props} />,
    center: props => <CenterAlignIcon {...props} />,
    right: props => <RightAlignIcon {...props} />
  };
  return Object.entries(aligns).map(([position, icon]) => (
    <div
      key={position}
      className={customOption}
      onClick={() => {
        setStyle('textAlign', position);
        document.getElementsByClassName('upper-canvas')[0].click();
      }}
    >
      {icon({
        className: currentTextAlignStyle(textAlign, position, classes)
      })}
    </div>
  ));
};

const currentTextAlignStyle = (textAlign, alignIcon, classes) => {
  const { selectedAlignSvg, hoverAlignSvg } = classes;
  if (alignIcon === textAlign) {
    return selectedAlignSvg;
  } else {
    return hoverAlignSvg;
  }
};

export default ButtonTextAlign;
