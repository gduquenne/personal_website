import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

import {
  FullIcon,
  DashedIcon,
  DottedIcon,
  DashesIcon
} from '../../Icons/FloatingBar/DashIcons';

import COLORS from '../../Utils/Colors';

const useStyles = makeStyles(floatingBarStyles);
const PROPERTIES = {
  dotted: [0.5, 10],
  dashed: [10, 20],
  full: [],
  width: 45,
  menuWidth: 330,
  menuPos: 48,
  sliderHeight: 40,
  menuHeight: 252
};

const ButtonDashAndColour = ({ menuOpen, ...props }) => {
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
    opacityAndColorSelect,
    dropDownClose,
    svgIcon,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    opacityAndColorSelect,
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
  const { strokeDashArray, stroke } = currentValue;
  const { strokeDistance, strokePattern } = calcStrokeDistanceAndPattern(
    strokeDashArray
  );
  return (
    <Tooltip title={textRm.stroke[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        <DashesIcon className={svgIcon} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {dashOptions(strokeDistance, strokeDashArray, setStyle, classes)}
          {dashDistanceSlider(
            strokeDistance,
            strokePattern,
            setStyle,
            classes,
            language
          )}
          {strokeColorOptions(stroke, setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const calcStrokeDistanceAndPattern = strokeDashArray => {
  let strokeDistance;
  let strokePattern;
  if (strokeDashArray === null || strokeDashArray.length === 0) {
    strokeDistance = [10, 20];
    strokePattern = false;
    PROPERTIES.menuHeight = 252;
  } else {
    strokeDistance = [strokeDashArray[1], strokeDashArray[1]];
    strokePattern = strokeDashArray[0];
    PROPERTIES.menuHeight = 252 + PROPERTIES.sliderHeight;
  }
  return { strokeDistance, strokePattern };
};

const dashDistanceSlider = (
  strokeDistance,
  strokePattern,
  setStyle,
  classes,
  language
) => {
  const { sliderDiv, sliderLabel } = classes;
  if (strokePattern) {
    return (
      <div className={sliderDiv}>
        <Slider
          value={strokeDistance[0]}
          onChange={(_, newValue) => {
            setStyle('strokeDashArray', [strokePattern, newValue]);
          }}
          aria-labelledby="input-slider"
          min={10}
          step={1}
          max={70}
        />
        <div style={{ whiteSpace: 'nowrap' }} className={sliderLabel}>
          {textRm.borderSpacing[language]}
        </div>
      </div>
    );
  }
  return null;
};

const currentDash = (strokeDashArray, dashArray, classes) => {
  const { dash, selectedDash } = classes;
  if (Array.isArray(strokeDashArray) && dashArray === strokeDashArray[0]) {
    return selectedDash;
  } else {
    return dash;
  }
};

const dashOptions = (strokeDistance, strokeDashArray, setStyle, classes) => {
  const { dashDiv } = classes;
  return (
    <div className={dashDiv}>
      <FullIcon
        className={currentDash(strokeDashArray, PROPERTIES.full[0], classes)}
        onClick={() => {
          setStyle('strokeDashArray', PROPERTIES.full);
          setStyle('strokeLineCap', 'square');
        }}
      />
      <DashedIcon
        className={currentDash(strokeDashArray, PROPERTIES.dashed[0], classes)}
        onClick={() => {
          setStyle('strokeDashArray', [
            PROPERTIES.dashed[0],
            strokeDistance[1]
          ]);
          setStyle('strokeLineCap', 'square');
        }}
      />
      <DottedIcon
        className={currentDash(strokeDashArray, PROPERTIES.dotted[0], classes)}
        onClick={() => {
          setStyle('strokeDashArray', [
            PROPERTIES.dotted[0],
            strokeDistance[0]
          ]);
          setStyle('strokeLineCap', 'round');
        }}
      />
    </div>
  );
};

const strokeColorOptions = (stroke, setStyle, classes) => {
  const { colorCircle, colorDiv } = classes;
  return (
    <div className={colorDiv}>
      {Object.entries(COLORS).map(([key, value]) => {
        return (
          <span
            key={`btnStrokeColor${key}`}
            className={colorCircle}
            style={{ ...currentColorStyle(stroke, value) }}
            onClick={() => setStyle('stroke', value)}
          >
            {' '}
          </span>
        );
      })}
    </div>
  );
};

const currentColorStyle = (stroke, color) => {
  const stringMatch = color
    .substring(0, color.lastIndexOf(',') + 1)
    .localeCompare(stroke.substring(0, stroke.lastIndexOf(',') + 1));
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

export default ButtonDashAndColour;
