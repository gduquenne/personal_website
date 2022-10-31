import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button } from '@material-ui/core';

import OptionIcon from '../../Icons/FloatingBar/OptionIcon';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);

const PROPERTIES = {
  options: { delete: { shortcut: 'Del' } },
  width: 30,
  menuWidth: 155,
  menuPos: 48,
  menuHeight: 160
};

const ButtonMoreOptions = ({ menuOpen, ...props }) => {
  const classes = useStyles();
  return useMemo(() => displayButton(props, classes), [
    menuOpen === props.buttonName
  ]);
};

const displayButton = (
  {
    deleteItems,
    bringToFrontOrBack,
    calcMenuPos,
    calcButtonPosLeft,
    handleMenuOpen,
    getDropDownClass,
    setStyle,
    buttonName,
    currentValue,
    language,
    ...muiStyleProps
  },
  classes
) => {
  const {
    moreOptionsSelectStyle,
    dropDownClose,
    svgIcon,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    moreOptionsSelectStyle,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyle} ${dropDownClass.button}`;
  PROPERTIES.options.delete.clbk = deleteItems;
  PROPERTIES.options.delete.text = textRm.delete[language];
  return (
    <Button
      {...muiStyleProps}
      style={{ width: PROPERTIES.width }}
      onClick={handleMenuOpen}
    >
      <OptionIcon className={svgIcon} />
      <div
        className={dropDownClass.menu}
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
      >
        {moreOptionsOptions(classes)}
      </div>
    </Button>
  );
};

const moreOptionsOptions = classes => {
  const { moreOptionsOption, moreOptionsShortcut, moreOptionsText } = classes;
  return Object.entries(PROPERTIES.options).map(([key, value]) => {
    const { clbk, text, shortcut } = value;
    return (
      <div className={moreOptionsOption} key={key} onClick={clbk}>
        <div className={moreOptionsText} key={`option ${text}`}>
          {text}
        </div>
        {shortcut && (
          <span className={moreOptionsShortcut} key={`shortcut${key}`}>
            {shortcut}
          </span>
        )}
      </div>
    );
  });
};

export default ButtonMoreOptions;
