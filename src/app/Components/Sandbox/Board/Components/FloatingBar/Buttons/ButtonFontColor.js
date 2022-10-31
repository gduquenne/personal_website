import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FontColorIcon from '../../Icons/FloatingBar/FontColorIcon';
// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

import COLORS from '../../Utils/Colors';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);
const PROPERTIES = {
  width: 45,
  menuWidth: 260,
  menuPos: 48,
  menuHeight: 220
};

const ButtonFontColor = ({ menuOpen, ...props }) => {
  const classes = useStyles(PROPERTIES.width);
  const fontColorIconRender = useMemo(() => {
    const { fill } = props.currentValue;
    let iconBottomBarFill;
    if (!fill || fill.length === 0) {
      iconBottomBarFill = '#646464';
    } else {
      iconBottomBarFill = fill;
    }
    return (
      <FontColorIcon className={classes.svgIcon} fill={iconBottomBarFill} />
    );
  }, [props.currentValue]);

  return useMemo(() => displayButton(props, classes, fontColorIconRender), [
    fontColorIconRender,
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
  classes,
  fontColorIconRender
) => {
  const { fill } = currentValue;
  const {
    fontColorSelect,
    dropDownClose,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  muiStyleProps.className += ` ${buttonStyle}`;
  const dropDownClass = getDropDownClass(
    buttonName,
    fontColorSelect,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyle} ${dropDownClass.button}`;
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
    <Tooltip title={textRm.fontColor[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleMenuOpen}
      >
        {fontColorIconRender}
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {fontColorOptions(fill, classes, setStyle)}
        </div>
      </Button>
    </Tooltip>
  );
};

const fontColorOptions = (currentColor, { colorCircle }, setStyle) => {
  return Object.entries(COLORS).map(([key, value]) => {
    return (
      <span
        key={`btnFontColor${key}`}
        className={colorCircle}
        style={{ ...currentColorStyle(value, currentColor) }}
        onClick={() => setStyle('fill', value)}
      >
        {' '}
      </span>
    );
  });
};

const currentColorStyle = (color, currentColor) => {
  const stringMatch = color.localeCompare(currentColor);
  if (stringMatch === 0) {
    return {
      backgroundColor: color,
      padding: '2px',
      backgroundClip: 'content-box',
      borderWidth: '2px'
    };
  } else {
    return { backgroundColor: color, borderWidth: '1px' };
  }
};

export default ButtonFontColor;
