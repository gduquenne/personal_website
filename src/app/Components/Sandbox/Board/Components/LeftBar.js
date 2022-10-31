// Import Core
import React, { useEffect, useState, useContext, useMemo } from 'react';
import UserContext from '../../../../../Context/UserContext';

// Import Components from Material-UI
import { Fab, Button, ButtonGroup, Tooltip } from '@material-ui/core';

// Import Styles
import leftBarStyles from './StyleSheets/leftBarStyles.jss';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Icons
import {
  CheckBoxOutlineBlankSharp as CheckBoxIcon,
  RadioButtonUnchecked as CircleIcon,
  Remove as LineIcon
} from '@material-ui/icons';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import StickyIcon from './Icons/LeftBar/StickyIcon';
import StickyIconActive from './Icons/LeftBar/StickyIconActive';
import TextIcon from './Icons/LeftBar/TextIcon';
import TextIconActive from './Icons/LeftBar/TextIconActive';
import DrawIcon from './Icons/LeftBar/DrawIcon';
import DrawIconActive from './Icons/LeftBar/DrawIconActive';
import ImageIcon from './Icons/LeftBar/ImageIcon';
import ImageIconActive from './Icons/LeftBar/ImageIconActive';
import CursorIcon from './Icons/LeftBar/CursorIcon';
import HandIcon from './Icons/LeftBar/HandIcon';
import FrameIcon from './Icons/LeftBar/FrameIcon';
import FrameIconActive from './Icons/LeftBar/FrameIconActive';
import ShapeIcon from './Icons/LeftBar/ShapeIcon';
import ShapeIconActive from './Icons/LeftBar/ShapeIconActive';
import CustomFrame from './Icons/LeftBar/CustomFrame';
import FourthOptionFrame from './Icons/LeftBar/FourthOptionFrame';
import SixthOptionFrame from './Icons/LeftBar/SixthOptionFrame';

// Import Texts
import textRm from '../Texts/textLeftBar';

import COLORS from './Utils/Colors';

const useStyles = makeStyles(leftBarStyles);

let activeButtonGlobal = null;

const LeftBar = ({ setSelected, setDragging, setDrawSize, dragging }) => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const { language } = context;

  const [menuOpen, setMenuOpen] = useState(null);
  const [cursorSelected, setCursorSelected] = useState(!dragging);
  const [hoverButton, setHoverButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [stickyColor, setStickyColor] = useState('rgba(243, 254, 122, 1)');

  useEffect(() => {
    const removeMenuOpenE = e =>
      removeMenuOpen(e, setActiveButton, setMenuOpen, setHoverButton);
    window.addEventListener('click', removeMenuOpenE);
    return () => window.removeEventListener('click', removeMenuOpenE);
  }, []);

  useEffect(() => {
    setCursorSelected(!dragging);
    if (activeButton === 'draw') {
      setActiveButton(null);
    }
  }, [dragging]);
  useEffect(() => (activeButtonGlobal = activeButton), [activeButton]);

  const scale = Math.min(1, Math.max(window.innerWidth / 1920, 0.5));

  const selectOrDragBtn = useMemo(
    () =>
      fabStyle({
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        remotingsType: getSelectMoveString(cursorSelected),
        key: 'LbBtnSelectmoveKey',
        notActiveIcon: cursorStyle(cursorSelected),
        activeIcon: undefined,
        onClickClbk: () => {
          setMenuOpen(null);
          setActiveButton(null);
          setSelected(null);
          setCursorSelected(!cursorSelected);
          setDragging();
        },
        shortcut: 'V'
      }),
    [cursorSelected, hoverButton]
  );

  const stickynoteMenuBtn = useMemo(
    () =>
      stickyNotesMenu(
        {
          setActiveButton,
          setMenuOpen,
          setHoverButton,
          setStickyColor,
          setCursorSelected
        },
        { menuOpen, activeButton, hoverButton, stickyColor, cursorSelected },
        { setSelected, setDragging },
        classes,
        language
      ),
    [activeButton, hoverButton, menuOpen]
  );

  const textBtn = useMemo(
    () =>
      fabStyle({
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        remotingsType: 'text',
        key: 'LbBtnTextKey',
        notActiveIcon: <TextIcon />,
        activeIcon: <TextIconActive />,
        onClickClbk: () => {
          setMenuOpen(null);
          handleActiveButton('text', activeButton, setActiveButton);
          handleSelected(
            { remotingsType: 'text' },
            'text',
            activeButton,
            setSelected
          );
          resetCursor(cursorSelected, setCursorSelected, setDragging);
        },
        shortcut: 'T'
      }),
    [activeButton, hoverButton]
  );

  const shapesMenuBtn = useMemo(
    () =>
      shapesMenu(
        {
          setActiveButton,
          setMenuOpen,
          setHoverButton,
          setCursorSelected
        },
        { menuOpen, activeButton, hoverButton, cursorSelected },
        { setSelected, setDragging },
        classes,
        language
      ),
    [activeButton, hoverButton]
  );

  const drawMenuBtn = useMemo(
    () =>
      drawMenu(
        {
          setActiveButton,
          setMenuOpen,
          setHoverButton,
          setCursorSelected
        },
        { menuOpen, activeButton, hoverButton, cursorSelected },
        { setSelected, setDrawSize, setDragging },
        classes,
        language
      ),
    [activeButton, hoverButton, menuOpen]
  );

  const imageBtn = useMemo(
    () =>
      fabStyle({
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        remotingsType: 'image',
        key: 'LbBtnImgKey',
        notActiveIcon: <ImageIcon />,
        activeIcon: <ImageIconActive />,
        onClickClbk: () => {
          setMenuOpen(null);
          handleActiveButton('image', activeButton, setActiveButton);
          handleSelected(
            { remotingsType: 'imageshape' },
            'image',
            activeButton,
            setSelected
          );
          resetCursor(cursorSelected, setCursorSelected, setDragging);
        },
        shortcut: 'I'
      }),
    [activeButton, hoverButton]
  );

  const framesMenuBtn = useMemo(
    () =>
      framesMenu(
        {
          setActiveButton,
          setMenuOpen,
          setHoverButton,
          setCursorSelected
        },
        { menuOpen, activeButton, hoverButton, cursorSelected },
        { setSelected, setDragging },
        classes,
        language
      ),
    [activeButton, hoverButton, menuOpen]
  );

  return (
    <div
      id="leftbar"
      className={classes.leftBar}
      style={{
        transform: `scale(${scale},${scale} )`
      }}
    >
      {selectOrDragBtn}
      {stickynoteMenuBtn}
      {textBtn}
      {shapesMenuBtn}
      {drawMenuBtn}
      {imageBtn}
      {framesMenuBtn}
    </div>
  );
};

const getDropRightClass = (
  name,
  newMenuOpen,
  droprightOpen,
  droprightClose
) => {
  if (newMenuOpen === name) {
    return droprightOpen;
  } else {
    return droprightClose;
  }
};

const handleActiveButton = (remotingsType, activeButton, setActiveButton) => {
  if (activeButton === remotingsType) {
    setActiveButton(null);
  } else {
    setActiveButton(remotingsType);
  }
};

const handleSelected = (sel, remotingsType, activeButton, setSelected) => {
  if (activeButton !== remotingsType) {
    setSelected(sel);
  } else {
    setSelected(null);
  }
};

const handleMenuOpen = (remotingsType, menuOpen, activeButton, setMenuOpen) => {
  if (menuOpen === remotingsType) {
    setMenuOpen(null);
  } else {
    if (activeButton !== remotingsType) {
      setMenuOpen(remotingsType);
    }
  }
};

const removeMenuOpen = (e, setActiveButton, setMenuOpen, setHoverButton) => {
  if (
    e.target.className &&
    typeof e.target.className === 'string' &&
    e.target.className.includes('upper-canvas')
  ) {
    setMenuOpen(null);
    setHoverButton(null);
    if (activeButtonGlobal !== 'draw') {
      setActiveButton(null);
    }
  }
};

const cursorStyle = cursorSelected => {
  if (cursorSelected) {
    return <CursorIcon />;
  } else {
    return <HandIcon />;
  }
};

const getSelectMoveString = cursorSelected => {
  if (cursorSelected) {
    return 'select';
  } else {
    return 'move';
  }
};

const resetCursor = (cursorSelected, setCursorSelected, setDragging) => {
  if (cursorSelected === false) {
    setCursorSelected(true);
    setDragging();
  }
};

const fabStyle = ({
  remotingsType,
  key,
  notActiveIcon,
  activeIcon,
  onClickClbk,
  setHoverButton,
  activeButton,
  hoverButton,
  menuOpen,
  classes,
  language,
  shortcut
}) => {
  const text = textRm[remotingsType][language];
  let icon;
  let bgcStyle;
  if (activeButton === remotingsType) {
    icon = activeIcon;
    bgcStyle = 'rgba(248,112,96,1)';
  } else {
    icon = notActiveIcon;
    bgcStyle = null;
  }
  const tooltipTitle = (
    <span style={{ fontSize: 14 }}>
      {text}
      {shortcut && (
        <>
          &nbsp;&nbsp;
          <span style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            &nbsp;{shortcut}&nbsp;
          </span>
        </>
      )}
    </span>
  );
  return (
    <>
      <Tooltip
        title={tooltipTitle}
        open={hoverButton === remotingsType && menuOpen !== remotingsType}
        placement="right"
        arrow
      >
        <Fab
          id={key}
          key={key}
          color="default"
          onClick={onClickClbk}
          className={classes.icons}
          onMouseEnter={() => setHoverButton(remotingsType)}
          onMouseLeave={() => setHoverButton(null)}
          style={{ backgroundColor: bgcStyle }}
        >
          {icon}
        </Fab>
      </Tooltip>
    </>
  );
};

const btnStyle = (
  icon,
  onClickClbk,
  btnClass,
  key,
  classes,
  description,
  disabled
) => {
  let desc;
  if (description) {
    desc = <p className={classes.buttonDescription}>{description}</p>;
  } else {
    desc = '';
  }
  return (
    <Button
      key={key}
      color="default"
      onClick={onClickClbk}
      className={classes[btnClass]}
      disabled={disabled}
    >
      <div className={classes.buttonDescriptionWrapper}>
        {icon}
        {desc}
      </div>
    </Button>
  );
};

const stickyNotesMenu = (hooks, states, clbks, classes, language) => {
  const remotingsType = 'stickynote';
  const { setSelected, setDragging } = clbks;
  const {
    setMenuOpen,
    setHoverButton,
    setActiveButton,
    setStickyColor,
    setCursorSelected
  } = hooks;
  const {
    menuOpen,
    hoverButton,
    activeButton,
    stickyColor,
    cursorSelected
  } = states;
  const stickyColors = [
    'defaultStickyColor',
    'careyspink',
    'eastside',
    'cornflower',
    'jordyblue',
    'shadowgreen',
    'sprout',
    'salomie',
    'manhattan',
    'tonyspink',
    'japonica'
  ];
  const classDropRight = getDropRightClass(
    remotingsType,
    menuOpen,
    `${classes.droprightFrames} ${classes.dropRightStickyNote}`,
    classes.droprightClose
  );
  const stickyNoteIcon = color => {
    return (
      <div
        style={{
          backgroundColor: color
        }}
        className={classes.stickyNoteIcon}
      ></div>
    );
  };
  const fabOnClickClbk = () => {
    resetCursor(cursorSelected, setCursorSelected, setDragging);
    handleMenuOpen(remotingsType, menuOpen, activeButton, setMenuOpen);
    handleActiveButton(remotingsType, activeButton, setActiveButton);
    handleSelected(
      {
        remotingsType,
        type: stickyColor
      },
      remotingsType,
      activeButton,
      setSelected
    );
  };
  const btnOnClickClbk = color => () => {
    setSelected({
      remotingsType,
      type: color
    });
    setMenuOpen(null);
    setHoverButton(null);
    setStickyColor(color);
  };
  return (
    <div
      style={{
        borderBottom: 'none',
        position: 'relative'
      }}
    >
      {fabStyle({
        remotingsType,
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        key: 'LbBtnStickyKey',
        notActiveIcon: <StickyIcon stickyColor={stickyColor} />,
        activeIcon: <StickyIconActive stickyColor={stickyColor} />,
        onClickClbk: fabOnClickClbk,
        shortcut: 'S'
      })}
      <div>
        <ButtonGroup
          className={classDropRight}
          variant="contained"
          style={{ width: '165px' }}
        >
          {stickyColors.map(el =>
            btnStyle(
              stickyNoteIcon(COLORS[el]),
              btnOnClickClbk(COLORS[el]),
              'stickynoteButtons',
              `LbBtnStickyNote${el}Key`,
              classes
            )
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

const shapesMenu = (hooks, states, clbks, classes, language) => {
  const remotingsType = 'shapes';
  const { setSelected, setDragging } = clbks;
  const {
    setMenuOpen,
    setHoverButton,
    setActiveButton,
    setCursorSelected
  } = hooks;
  const { menuOpen, hoverButton, activeButton, cursorSelected } = states;
  const shapesType = [
    { type: 'rectshape', icon: <CheckBoxIcon /> },
    { type: 'circleshape', icon: <CircleIcon /> },
    { type: 'lineshape', icon: <LineIcon /> }
  ];
  const classDropRight = getDropRightClass(
    remotingsType,
    menuOpen,
    classes.dropright,
    classes.droprightClose
  );
  const fabOnClickClbk = () => {
    resetCursor(cursorSelected, setCursorSelected, setDragging);
    handleMenuOpen(remotingsType, menuOpen, activeButton, setMenuOpen);
    handleActiveButton(remotingsType, activeButton, setActiveButton);
    handleSelected(null, remotingsType, activeButton, setSelected);
  };
  const btnOnClickClbk = type => () => {
    setSelected({ remotingsType: type });
    setMenuOpen(null);
    setHoverButton(null);
  };
  return (
    <div
      style={{
        borderBottom: 'none',
        position: 'relative'
      }}
    >
      {fabStyle({
        remotingsType,
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        key: 'LbBtnShapeMenuKey',
        notActiveIcon: <ShapeIcon />,
        activeIcon: <ShapeIconActive />,
        onClickClbk: fabOnClickClbk,
        shortcut: undefined
      })}
      <div>
        <ButtonGroup
          className={classDropRight}
          variant="contained"
          style={{ width: '170px' }}
        >
          {shapesType.map((el, index) =>
            btnStyle(
              el.icon,
              btnOnClickClbk(el.type),
              'shapesButton',
              `LbBtnShapes${index}`,
              classes
            )
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

const drawMenu = (hooks, states, clbks, classes, language) => {
  const remotingsType = 'draw';
  const { setSelected, setDrawSize, setDragging } = clbks;
  const {
    setMenuOpen,
    setHoverButton,
    setActiveButton,
    setCursorSelected
  } = hooks;
  const { menuOpen, hoverButton, activeButton, cursorSelected } = states;
  const sizes = [
    { size: 1, fontSize: 10 },
    { size: 5, fontSize: 20 },
    { size: 10, fontSize: 30 },
    { size: 15, fontSize: 35 },
    { size: 20, fontSize: 50 },
    { size: 25, fontSize: 65 }
  ];
  const classDropRight = getDropRightClass(
    remotingsType,
    menuOpen,
    classes.dropright,
    classes.droprightClose
  );
  const fabOnClickClbk = () => {
    resetCursor(cursorSelected, setCursorSelected, setDragging);
    handleMenuOpen(remotingsType, menuOpen, activeButton, setMenuOpen);
    handleActiveButton(remotingsType, activeButton, setActiveButton);
    handleSelected(remotingsType, remotingsType, activeButton, setSelected);
  };
  const btnOnClickClbk = size => () => {
    setSelected('draw');
    setDrawSize(size);
    setMenuOpen(null);
    setHoverButton(null);
    setActiveButton(remotingsType);
  };
  return (
    <div
      style={{
        borderBottom: 'none',
        position: 'relative'
      }}
    >
      {fabStyle({
        remotingsType,
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        key: 'LbBtnDrawKey',
        notActiveIcon: <DrawIcon />,
        activeIcon: <DrawIconActive />,
        onClickClbk: fabOnClickClbk,
        shortcut: undefined
      })}
      <div>
        <ButtonGroup className={classDropRight} variant="contained">
          {sizes.map(({ size, fontSize }, index) =>
            btnStyle(
              <RemoveRoundedIcon
                style={{
                  fontSize: `${fontSize}px`
                }}
              />,
              btnOnClickClbk(size),
              'shapesButton',
              `LbBtnDraw${index}Key`,
              classes
            )
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

const framesMenu = (hooks, states, clbks, classes, language) => {
  const remotingsType = 'export';
  const { setSelected, setDragging } = clbks;
  const {
    setMenuOpen,
    setHoverButton,
    setActiveButton,
    setCursorSelected
  } = hooks;
  const { menuOpen, hoverButton, activeButton, cursorSelected } = states;
  const framesType = [
    { type: 0, icon: <CustomFrame />, desc: 'Custom', disabled: false },
    { type: 3, icon: <FourthOptionFrame />, desc: '16x9', disabled: false },
    { type: 1, icon: <SixthOptionFrame />, desc: '1:1', disabled: false }
  ];
  const classDropRight = getDropRightClass(
    remotingsType,
    menuOpen,
    classes.droprightFrames,
    classes.droprightClose
  );
  const fabOnClickClbk = () => {
    handleMenuOpen(remotingsType, menuOpen, activeButton, setMenuOpen);
    handleActiveButton(remotingsType, activeButton, setActiveButton);
    resetCursor(cursorSelected, setCursorSelected, setDragging);
    handleSelected(null, remotingsType, activeButton, setSelected);
  };
  const btnOnClickClbk = type => () => {
    setSelected({ type, remotingsType: 'frameshape' });
    setMenuOpen(null);
    setHoverButton(null);
  };
  return (
    <div
      style={{
        borderBottom: 'none',
        position: 'relative'
      }}
    >
      {fabStyle({
        remotingsType,
        setHoverButton,
        activeButton,
        hoverButton,
        menuOpen,
        classes,
        language,
        key: 'LbBtnFramesMenuKey',
        notActiveIcon: <FrameIcon />,
        activeIcon: <FrameIconActive />,
        onClickClbk: fabOnClickClbk,
        shortcut: undefined
      })}
      <div>
        <ButtonGroup className={classDropRight} variant="contained">
          {framesType.map((el, index) =>
            btnStyle(
              el.icon,
              btnOnClickClbk(el.type),
              'framesButton',
              `LbBtnCustomFrame${index}Key`,
              classes,
              el.desc,
              el.disabled
            )
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default LeftBar;
