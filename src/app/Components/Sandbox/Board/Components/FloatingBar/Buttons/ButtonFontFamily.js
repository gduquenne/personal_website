import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const PROPERTIES = {
  families: {
    arial: 'Arial',
    roboto: 'Roboto',
    alexbrush_regular: 'AlexBrush',
    kaushanscript_regular: 'KaushanScript',
    georgia_serif: 'Georgia',
    neon_glow_regular: 'NeonGlow',
    opensans: 'OpenSans'
  },
  width: 130,
  menuWidth: 130,
  menuPos: 48,
  familyDivHeight: 30,
  menuHeight: 214
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonFontFamily = ({ menuOpen, ...props }) => {
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
    fontFamilySelectStyle,
    dropDownClose,
    buttonStyleFontFamily,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    fontFamilySelectStyle,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyleFontFamily} ${dropDownClass.button}`;
  const menuPosStyle = calcMenuPos(
    {
      topPos: PROPERTIES.menuPos,
      leftPos: calcButtonPosLeft(buttonName)
    },
    {
      menuHeight:
        Object.keys(PROPERTIES.families).length * PROPERTIES.familyDivHeight,
      menuWidth: PROPERTIES.menuWidth
    }
  );
  const { fontFamily } = currentValue;
  const currentFontFamilyName = getCurrentFontFamilyName(fontFamily);

  return (
    <Tooltip title={textRm.fontFamily[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        style={{
          width: PROPERTIES.width,
          fontSize: '14px',
          textTransform: 'none'
        }}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleMenuOpen}
      >
        {currentFontFamilyName}
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{ ...menuPosStyle }}
        >
          {fontFamilyOptions(fontFamily, setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const getCurrentFontFamilyName = fontFamily => {
  if (fontFamily !== 'Mul') {
    fontFamily = PROPERTIES.families[fontFamily];
  } else {
    fontFamily = 'multiple';
  }
  return fontFamily;
};

const currentFontFamilyStyle = (currentFontFamily, selectedFontFamily) => {
  if (selectedFontFamily === currentFontFamily) {
    return { fontWeight: 'bold', color: '#F87060', fontSize: '14px' };
  } else {
    return { fontFamily: 'normal', fontSize: '14px' };
  }
};

const fontFamilyOptions = (currentFontFamily, setStyle, classes) => {
  const { fontFamilyOptionsStyle } = classes;
  return Object.entries(PROPERTIES.families).map(([family, value]) => {
    return (
      <span
        key={`btnFontFamily${family}`}
        className={fontFamilyOptionsStyle}
        style={{
          ...currentFontFamilyStyle(currentFontFamily, family),
          fontFamily: family
        }}
        onClick={() => setStyle('fontFamily', family)}
      >
        {value}
      </span>
    );
  });
};

export default ButtonFontFamily;
