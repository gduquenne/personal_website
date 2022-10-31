import React, { useState, useEffect, useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

//icons
import ArrowsIcons from '../../Icons/FloatingBar/ArrowsIcons';
import CheckIcon from '@material-ui/icons/Check';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const PROPERTIES = {
  sizes: [4, 6, 8, 10, 12, 14, 18, 24, 32, 36, 48, 64, 80, 144, 288],
  width: 45,
  menuWidth: 55,
  menuHeight: 450,
  sizeDivHeight: 30,
  padding: 30,
  menuPos: 48
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonFontSize = ({ menuOpen, ...props }) => {
  const classes = useStyles();
  const fontSize = getCurrentFontSize(props.currentValue.fontSize);
  const [currentSize, setCurrentSize] = useState(fontSize);

  useEffect(() => {
    if (fontSize !== currentSize) {
      setCurrentSize('Mul');
    }
  }, []);

  useEffect(() => {
    if (fontSize !== 'Mul') {
      setCurrentSize(parseInt(fontSize, 10));
    }
  }, [fontSize]);

  return useMemo(
    () => displayButton(props, classes, currentSize, setCurrentSize),
    [menuOpen === props.buttonName]
  );
};

const displayButton = (
  {
    autoFontSize,
    setVerticalAlign,
    calcMenuPos,
    calcButtonPosLeft,
    handleMenuOpen,
    getDropDownClass,
    buttonName,
    setStyle,
    currentValue,
    language,
    ...muiStyleProps
  },
  classes,
  currentSize,
  setCurrentSize
) => {
  const {
    sizeSelect,
    dropDownClose,
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
      menuHeight:
        (PROPERTIES.sizes.length +
          +(typeof autoFontSize === 'boolean' && autoFontSize)) *
        PROPERTIES.sizeDivHeight,
      menuWidth: PROPERTIES.menuWidth
    }
  );
  return (
    <Tooltip title={textRm.fontSize[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        style={{
          fontStyle: 'bold',
          textTransform: 'capitalize'
        }}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        endIcon={
          <ArrowsIcons
            onArrowChange={(e, option) =>
              onArrowChange(e, option, setCurrentSize, currentSize)
            }
          />
        }
        onClick={handleMenuOpen}
      >
        {currentSize}
        <div
          id="fontSizeSelect"
          onMouseOver={e => {
            e.stopPropagation();
          }}
          className={dropDownClass.menu}
          style={menuPosStyle}
        >
          {fontSizeOptions(
            autoFontSize,
            currentSize,
            setCurrentSize,
            setStyle,
            setVerticalAlign,
            classes.sizeOption
          )}
        </div>
      </Button>
    </Tooltip>
  );
};

const getCurrentFontSize = fontSize => {
  if (fontSize !== 'Mul') {
    fontSize = parseInt(fontSize, 10);
  }
  return fontSize;
};

const fontSizeOptions = (
  autoFontSize,
  currentSize,
  setCurrentSize,
  setStyle,
  setVerticalAlign,
  sizeOptionClass
) => {
  const autoFSFriendly = typeof autoFontSize === 'boolean';
  return (
    <>
      {autoFSFriendly &&
        displayBtnMenu(
          `btnAutoFontSize`,
          'Auto',
          autoFontSize,
          () => setStyle('autoFontSize', !autoFontSize),
          sizeOptionClass
        )}
      {PROPERTIES.sizes.map(size =>
        displayBtnMenu(
          `btnFontSize${size}`,
          `${size}px`,
          size === currentSize,
          () => {
            setCurrentSize(size);
            setStyle('fontSize', size);
            setVerticalAlign();
          },
          sizeOptionClass
        )
      )}
    </>
  );
};

const displayBtnMenu = (
  key,
  text,
  styleCondition,
  onClickClbk,
  sizeOptionClass
) => {
  const [sizeStyle, checkIcon] = currentSizeStyle(styleCondition);
  return (
    <div
      key={key}
      className={sizeOptionClass}
      style={sizeStyle}
      onClick={onClickClbk}
    >
      {text}
      {checkIcon}
    </div>
  );
};

const onArrowChange = (e, option, setCurrentSize, currentSize) => {
  e.stopPropagation();
  const { sizes } = PROPERTIES;
  let index = sizes.indexOf(currentSize) + option;
  if (index === -1) {
    for (let i = 0; i < sizes.length; i += 1) {
      if (currentSize < sizes[i]) {
        index = i;
      }
    }
    if (index === -1) {
      index = sizes.length;
    }
  }
  if (index >= 0 && index < sizes.length) {
    setCurrentSize(sizes[index]);
  }
};

const currentSizeStyle = condition => {
  if (condition) {
    return [
      { fontWeight: 'bold', color: '#F87060' },
      <CheckIcon
        style={{ fontSize: '11px', position: 'absolute', top: '10px' }}
      />
    ];
  } else {
    return [{ fontWeight: 'normal' }];
  }
};

export default ButtonFontSize;
