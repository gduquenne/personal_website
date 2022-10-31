import React from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import { Button, Tooltip } from '@material-ui/core';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

///import Icon
import EmojiIcon from '../../Icons/FloatingBar/EmojiIcon';

const PROPERTIES = {
  // 16 atm
  emojis: {
    smilingFaceWithHearts: '🥰',
    smilingFaceWithHeartEyes: '😍',
    winkingFace: '😉',
    smilingFaceWithSmilingEyes: '😊',
    smilingFaceWithHalo: '😇',
    starStruck: '🤩',
    slightlyFrowningFace: '🙁',
    poutingFace: '😡',
    angryFace: '😠',
    loudlyCryingFace: '😭',
    faceScreamingInFear: '😱',
    redHeart: '❤',
    faceWithTearsOfJoy: '😂',
    sparkles: '✨',
    thumbsUp: '👍',
    fire: '🔥'
  },
  width: 45,
  menuWidth: 140,
  menuHeight: 207,
  menuPos: 48
};

const useStyles = makeStyles(floatingBarStyles);

const ButtonEmoji = ({
  handleMenuOpen,
  getDropDownClass,
  calcButtonPosLeft,
  setStyle,
  buttonName,
  calcMenuPos,
  key,
  ...muiStyleProps
}) => {
  const classes = useStyles();
  const {
    emojiSelect,
    dropDownClose,
    svgIcon,
    buttonStyle,
    buttonMenuOpen,
    buttonMenuClosed
  } = classes;

  const dropDownClass = getDropDownClass(
    buttonName,
    emojiSelect,
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
    <Tooltip title="Emoji" placement="top" arrow>
      <Button
        {...muiStyleProps}
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        onClick={handleMenuOpen}
      >
        <EmojiIcon className={svgIcon} />
        <div
          onMouseOver={e => e.stopPropagation()}
          className={dropDownClass.menu}
          style={{
            ...menuPosStyle
          }}
        >
          {emojiOptions(setStyle, classes)}
        </div>
      </Button>
    </Tooltip>
  );
};

const emojiOptions = (setStyle, classes) => {
  const { emojiIcon } = classes;
  return Object.entries(PROPERTIES.emojis).map(([emoji, value]) => {
    return (
      <span
        key={`btnEmoji${emoji}`}
        className={emojiIcon}
        onClick={() => setStyle(value)}
      >
        {value}
      </span>
    );
  });
};

export default ButtonEmoji;
