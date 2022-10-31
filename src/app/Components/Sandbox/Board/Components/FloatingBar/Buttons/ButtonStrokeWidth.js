import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// icons
import StrokeWidthIcon from '../../Icons/FloatingBar/StrokeWidthIcon';
import CheckIcon from '@material-ui/icons/Check';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const PROPERTIES = {
  strokeSizes: [0, 1, 2, 4, 8, 12, 16, 20, 24, 28, 32],
  width: 45,
  menuWidth: 55,
  menuPos: 48,
  sizeDivHeight: 30,
  menuHeight: 330
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonStrokeWidth = ({ menuOpen, ...props }) => {
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
    sizeSelect,
    dropDownClose,
    svgIcon,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    sizeSelect,
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
      menuHeight: PROPERTIES.strokeSizes.length * PROPERTIES.sizeDivHeight,
      menuWidth: PROPERTIES.menuWidth
    }
  );

  return (
    <Tooltip title={textRm.strokeWidth[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        <StrokeWidthIcon className={svgIcon} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {strokeWidthOptions(currentValue.strokeWidth, setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const strokeWidthOptions = (strokeWidth, setStyle, classes) => {
  const { sizeOption } = classes;
  return (
    <>
      {PROPERTIES.strokeSizes.map(size => {
        return (
          <div
            key={`btnStrokeWidth${size}`}
            className={sizeOption}
            style={{ ...currentSizeStyle(size)[0] }}
            onClick={() => setStyle('strokeWidth', size)}
          >
            {`${size}px`}
            {currentSizeStyle(strokeWidth, size)[1]}
          </div>
        );
      })}
    </>
  );
};

const currentSizeStyle = (strokeWidth, size) => {
  if (size === strokeWidth) {
    return [
      { fontWeight: 'bold', fontSize: '12px', color: '#F87060' },
      <CheckIcon
        style={{ fontSize: '11px', position: 'absolute', top: '10px' }}
      />
    ];
  } else {
    return [{ fontWeight: 'normal' }];
  }
};

export default ButtonStrokeWidth;
