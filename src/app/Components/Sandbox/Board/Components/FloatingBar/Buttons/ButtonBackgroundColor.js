import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

//icons
import PaletteIcon from '../../Icons/FloatingBar/PaletteIcon';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

import OpacityOptions from './OpacityOptions';
import COLORS from '../../Utils/Colors';

const useStyles = makeStyles(floatingBarStyles);
const PROPERTIES = {
  width: 45,
  menuWidth: 260,
  menuPos: 48,
  menuHeight: 220,
  menuHeightWithOpacity: 260
};

const ButtonBackgroundColor = ({ menuOpen, ...props }) => {
  const classes = useStyles();
  const { currentValue } = props;
  const opacityOptionsRender = useMemo(
    () => (
      <>
        {props.opacity && (
          <OpacityOptions
            currentFill={currentValue.fill}
            setStyle={props.setStyle}
            language={props.language}
          />
        )}
      </>
    ),
    [currentValue]
  );

  const backgroundColorOptionsRender = useMemo(
    () => backgroundColorOptions(currentValue.fill, props.setStyle, classes),
    [currentValue]
  );

  return useMemo(
    () =>
      displayButton(
        props,
        classes,
        opacityOptionsRender,
        backgroundColorOptionsRender
      ),
    [opacityOptionsRender, menuOpen === props.buttonName]
  );
};

const displayButton = (
  {
    calcMenuPos,
    calcButtonPosLeft,
    handleMenuOpen,
    getDropDownClass,
    currentValue,
    setStyle,
    buttonName,
    opacity,
    language,
    ...muiStyleProps
  },
  classes,
  opacityOptionsRender,
  backgroundColorOptionsRender
) => {
  const {
    dropDownClose,
    svgIcon,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const { colorDropDownClass, tooltipTitle } = getColorAndTooltipTitle(
    opacity,
    classes,
    language
  );
  const dropDownClass = getDropDownClass(
    buttonName,
    colorDropDownClass,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  const { fill } = currentValue;

  let menuHeight;
  if (opacity) {
    menuHeight = PROPERTIES.menuHeightWithOpacity;
  } else {
    menuHeight = PROPERTIES.menuHeight;
  }

  let iconBottomBarFill;
  if (Array.isArray(fill)) {
    iconBottomBarFill = '#646464';
  } else {
    iconBottomBarFill = fill;
  }

  const menuPosStyle = calcMenuPos(
    {
      topPos: PROPERTIES.menuPos,
      leftPos: calcButtonPosLeft(buttonName)
    },
    {
      menuHeight,
      menuWidth: PROPERTIES.menuWidth
    }
  );
  muiStyleProps.className += ` ${buttonStyle} ${dropDownClass.button}`;

  return (
    <Tooltip title={tooltipTitle} placement="top" arrow>
      <Button
        {...muiStyleProps}
        onClick={handleMenuOpen}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
      >
        <PaletteIcon className={svgIcon} fill={iconBottomBarFill} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {opacityOptionsRender}
          {backgroundColorOptionsRender}
        </div>
      </Button>
    </Tooltip>
  );
};

const getColorAndTooltipTitle = (opacity, classes, language) => {
  let colorDropDownClass;
  let tooltipTitle;
  if (!opacity) {
    colorDropDownClass = classes.fontColorSelect;
    tooltipTitle = textRm.fillColor[language];
  } else {
    colorDropDownClass = classes.opacityAndColorSelect;
    tooltipTitle = textRm.fillColorToolTip[language];
  }
  return { colorDropDownClass, tooltipTitle };
};

const calcColor = (newColor, currentFill) => {
  /**
   * rgbWanted ex : rgba(215, 36, 7, 0.2)
   *   remove rgba(
   *   remove )
   *   split by ,
   * rgbWanted === ["215", " 36", " 7", " 0.2"]
   */
  const rIndex = 0;
  const gIndex = 1;
  const bIndex = 2;
  const aIndex = 3;
  const subRgba = 5;
  const rgbWanted = newColor.substring(subRgba).replace(')', '').split(',');
  const r = parseInt(rgbWanted[rIndex], 10);
  const g = parseInt(rgbWanted[gIndex], 10);
  const b = parseInt(rgbWanted[bIndex], 10);
  const a = parseFloat(
    currentFill.substring(subRgba).replace(')', '').split(',')[aIndex]
  );
  return ['rgba(', r, ', ', g, ', ', b, ', ', a, ')'].join('');
};

const currentColorStyle = (color, currentColor) => {
  const stringMatch = color
    .substring(0, color.lastIndexOf(',') + 1)
    .localeCompare(currentColor);
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

const backgroundColorOptions = (currentFill, setStyle, classes) => {
  const { colorCircle, colorDiv } = classes;
  let currentColor = 'default';
  if (!Array.isArray(currentFill)) {
    currentColor = currentFill.substring(0, currentFill.lastIndexOf(',') + 1);
  }
  return (
    <div className={colorDiv}>
      {Object.entries(COLORS).map(([key, value]) => {
        return (
          <span
            key={`btnBackGroundColor${key}`}
            className={colorCircle}
            style={{ ...currentColorStyle(value, currentColor) }}
            onClick={() => {
              if (Array.isArray(currentFill)) {
                setStyle(
                  'fill',
                  currentFill.map(fill => calcColor(value, fill))
                );
              } else {
                setStyle('fill', calcColor(value, currentFill));
              }
            }}
          >
            {' '}
          </span>
        );
      })}
    </div>
  );
};

export default ButtonBackgroundColor;
