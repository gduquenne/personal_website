import React, { useMemo } from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

// Import CustomIcons
import GroupIcons from '../../Icons/FloatingBar/GroupIcons/GroupIcons';
import GroupIcon from '../../Icons/FloatingBar/GroupIcons/GroupIcon';
import UngroupIcon from '../../Icons/FloatingBar/GroupIcons/UngroupIcon';
import SelectGroupIcon from '../../Icons/FloatingBar/GroupIcons/SelectGroupIcon';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);

const PROPERTIES = {
  width: 45,
  menuWidth: 155,
  menuPos: 48,
  menuHeight: 70
};

const ButtonGroupObjects = ({
  menuOpen,
  target,
  groupObjectsFuncs,
  ...props
}) => {
  const classes = useStyles();
  const { currentValue, setStyle, language } = props;
  const { buttonSelectGroup, buttonGroup, buttonUngroup } = useMemo(
    () =>
      createButtons(
        currentValue.groupIndex,
        target,
        groupObjectsFuncs,
        setStyle,
        classes,
        language
      ),
    [currentValue]
  );
  return useMemo(
    () =>
      displayButton(
        props,
        classes,
        buttonSelectGroup,
        buttonGroup,
        buttonUngroup
      ),
    [currentValue, menuOpen === props.buttonName]
  );
};

const displayButton = (
  {
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
  classes,
  buttonSelectGroup,
  buttonGroup,
  buttonUngroup
) => {
  const {
    svgIcon,
    buttonStyle,
    styleDropDown,
    dropDownClose,
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
  muiStyleProps.className += ` ${buttonStyle}  ${dropDownClass.button}`;
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
    <Tooltip title={textRm.groupMenu[language]} placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        <GroupIcons className={svgIcon} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            width: PROPERTIES.menuWidth,
            ...menuPosStyle
          }}
        >
          {buttonSelectGroup}
          {buttonGroup}
          {buttonUngroup}
        </div>
      </Button>
    </Tooltip>
  );
};

const createButtons = (
  groupIndex,
  target,
  groupObjectsFuncs,
  setStyle,
  classes,
  language
) => {
  const buttonSelectGroup = createButton(
    'selectGroup',
    props => <SelectGroupIcon {...props} />,
    classes,
    () => groupObjectsFuncs.selectGroupObjects(groupIndex),
    language,
    groupIndex !== undefined &&
      (groupIndex !== 'Mul' || target.type !== 'activeSelection')
  );
  const buttonGroup = createButton(
    'group',
    props => <GroupIcon {...props} />,
    classes,
    () => setStyle('groupIndex', groupObjectsFuncs.getNewGroupIndex()),
    language,
    target.type === 'activeSelection'
  );
  const buttonUngroup = createButton(
    'ungroup',
    props => <UngroupIcon {...props} />,
    classes,
    () => {
      setStyle('groupIndex', undefined);
      groupObjectsFuncs.verifyGroupConsistence(groupIndex);
    },
    language,
    groupIndex !== undefined
  );
  return { buttonSelectGroup, buttonGroup, buttonUngroup };
};

const createButton = (
  buttonName,
  icon,
  classes,
  onClickClbk,
  language,
  enabled
) => {
  const { groupIcon, textStyleOption } = classes;
  let className;
  let tooltipText;
  let fill;
  let fillSpecColorRect;
  if (enabled) {
    fill = '#102542';
    fillSpecColorRect = '#C4C4C4';
    className = groupIcon;
    tooltipText = textRm[buttonName][language];
  } else {
    fill = '#646464';
    fillSpecColorRect = '#646464';
    className = '';
    tooltipText = textRm[`${buttonName}Disabled`][language];
  }
  return (
    <Tooltip key={`${buttonName}Key`} title={tooltipText} placement="top" arrow>
      <div
        className={textStyleOption}
        style={{ width: PROPERTIES.width }}
        onClick={() => {
          if (enabled) {
            onClickClbk();
          }
        }}
      >
        {icon({ className, fill, fillSpecColorRect })}
      </div>
    </Tooltip>
  );
};

export default ButtonGroupObjects;
