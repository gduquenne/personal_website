import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

import {
  FontStyleIcon,
  UnderlineIcon,
  BoldIcon,
  LinethroughIcon,
  ItalicIcon
} from '../../Icons/FloatingBar/FontStyleIcons';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);
const PROPERTIES = {
  width: 45,
  menuWidth: 150,
  menuPos: 48,
  menuHeight: 36
};

const ButtonFontStyle = ({ menuOpen, ...props }) => {
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
    styleDropDown,
    dropDownClose,
    buttonStyle,
    svgIcon,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    styleDropDown,
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
    <Tooltip title={textRm.fontStyle[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        <FontStyleIcon className={svgIcon} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {textStyleOptions(currentValue, setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const textStyleOptions = (currentValue, setStyle, classes) => {
  const { textStyleOption } = classes;
  const { underline, linethrough, fontWeight, fontStyle } = currentValue;
  const values = {
    fontWeight: { 900: '200', 200: '900' },
    fontStyle: { italic: 'normal', normal: 'italic' }
  };
  return (
    <>
      <div
        onClick={() => setStyle('fontWeight', values.fontWeight[fontWeight])}
        className={textStyleOption}
      >
        <BoldIcon className={currentTextStyle({ fontWeight }, classes)} />
      </div>
      <div
        onClick={() => setStyle('linethrough', !linethrough)}
        className={textStyleOption}
      >
        <LinethroughIcon
          className={currentTextStyle({ linethrough }, classes)}
        />
      </div>
      <div
        onClick={() => setStyle('underline', !underline)}
        className={textStyleOption}
      >
        <UnderlineIcon className={currentTextStyle({ underline }, classes)} />
      </div>
      <div
        onClick={() => setStyle('fontStyle', values.fontStyle[fontStyle])}
        className={textStyleOption}
      >
        <ItalicIcon className={currentTextStyle({ fontStyle }, classes)} />
      </div>
    </>
  );
};

const currentTextStyle = (style, classes) => {
  const { selectedStyleSvg, hoverStyleSvg } = classes;
  if (
    style.fontWeight === '900' ||
    style.linethrough ||
    style.fontStyle === 'italic' ||
    style.underline
  ) {
    return selectedStyleSvg;
  } else {
    return hoverStyleSvg;
  }
};

export default ButtonFontStyle;
