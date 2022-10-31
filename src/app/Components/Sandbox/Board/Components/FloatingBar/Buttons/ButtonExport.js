import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button } from '@material-ui/core';

const PROPERTIES = {
  formats: ['PNG', 'SVG', 'PDF'],
  width: 45,
  menuWidth: 150,
  menuHeight: 33,
  menuPos: 48
};

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);

const ButtonExport = ({ menuOpen, ...props }) => {
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
    buttonName,
    currentValue,
    setStyle,
    exportFile,
    language,
    key,
    ...muiStyleProps
  },
  classes
) => {
  const {
    exportSelect,
    dropDownClose,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;
  const dropDownClass = getDropDownClass(
    buttonName,
    exportSelect,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  );
  muiStyleProps.className += ` ${buttonStyle}  ${dropDownClass.button}`;
  return (
    <Button
      key={key}
      {...muiStyleProps}
      style={{
        width: '55px',
        fontSize: '11px'
      }}
      disableElevation={true}
      disableFocusRipple={true}
      disableRipple={true}
      onClick={handleMenuOpen}
    >
      {textRm.export[language]}
      <div
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
        className={dropDownClass.menu}
      >
        {exportOptions(exportFile, classes)}
      </div>
    </Button>
  );
};

const exportOptions = (exportFile, classes) => {
  const { exportOption } = classes;
  return PROPERTIES.formats.map(format => {
    return (
      <div
        className={exportOption}
        key={`format ${format}`}
        onClick={() => exportFile(format)}
      >
        {format}
      </div>
    );
  });
};

export default ButtonExport;
