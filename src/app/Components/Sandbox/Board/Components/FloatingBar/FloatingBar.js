import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../../../../Context/UserContext';

// Import Components from Material-UI
import { ButtonGroup, Box } from '@material-ui/core';

// Import Events
import {
  onObjMoving,
  onObjMoved,
  onObjScaling,
  onObjScaled,
  onBoardZoom
} from './Events';

// Import Button Components
import ButtonTextAlign from './Buttons/ButtonTextAlign';
import ButtonFontStyle from './Buttons/ButtonFontStyle';
import ButtonFontSize from './Buttons/ButtonFontSize';
import ButtonStrokeWidth from './Buttons/ButtonStrokeWidth';
import ButtonBackgroundColor from './Buttons/ButtonBackgroundColor';
import ButtonFontColor from './Buttons/ButtonFontColor';
import ButtonVerticalAlign from './Buttons/ButtonVerticalAlign';
import ButtonLock from './Buttons/ButtonLock';
import ButtonDashAndColour from './Buttons/ButtonDashAndColour';
import ButtonEmoji from './Buttons/ButtonEmoji';
import ButtonFontFamily from './Buttons/ButtonFontFamily';
import ButtonEditText from './Buttons/ButtonEditText';
import ButtonAspectRatio from './Buttons/ButtonAspectRatio';
import ButtonExport from './Buttons/ButtonExport';
import ButtonMoreOptions from './Buttons/ButtonMoreOptions';
import ButtonGroupObjects from './Buttons/ButtonGroupObjects';
import UtliltyButtons from './Buttons/UtilityButtons';

let editingText = false;
let activeTextSelection = [];
let textSelectionInterval = false;

const FloatingBar = ({
  activeObj,
  board,
  bringToFrontOrBack,
  groupObjectsFuncs,
  deleteItems
}) => {
  const context = useContext(UserContext);
  const { language } = context;

  const [menuOpen, setMenuOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [textSelection, setTextSelection] = useState([]);

  activeTextSelection = textSelection;

  if (activeObj.inGroup) {
    editingText = true;
  }

  useEffect(() => {
    if (activeObj.remotingsType === 'text') {
      activeObj.on('selection:changed', () => {
        if (textSelectionInterval) {
          clearInterval(textSelectionInterval);
        }
        textSelectionInterval = setInterval(() => selectedTextEvent(), 500);
      });
    }
    return () => {
      editingText = false;
      clearInterval(textSelectionInterval);
      textSelectionInterval = null;
    };
  }, []);

  useEffect(() => {
    const onObjMovingE = () => onObjMoving(setMenuOpen);
    activeObj.on('moving', onObjMovingE);
    const onObjMovedE = e => onObjMoved(e, board, calcPos, setMenuOpen);
    activeObj.on('moved', onObjMovedE);
    const onObjScalingE = e => onObjScaling(e, setMenuOpen);
    activeObj.on('mousemove', onObjScalingE);
    const onObjScaledE = e => onObjScaled(e, board, calcPos);
    activeObj.on('mouseup', onObjScaledE);
    const onBoardZoomE = () =>
      onBoardZoom(board, activeObj, calcPos, setMenuOpen);
    board.on('mouse:wheel', onBoardZoomE);
    board.on('customZoom', onBoardZoomE);
    const documentBody = document.getElementsByTagName('body')[0];
    documentBody.style.overflow = 'hidden';
    setMenuOpen(null);
    return () => {
      activeObj.off('moving', onObjMovingE);
      activeObj.off('moved', onObjMovedE);
      activeObj.off('mousemove', onObjScalingE);
      activeObj.off('mouseup', onObjScaledE);
      board.off('mouse:wheel', onBoardZoomE);
      board.off('customZoom', onBoardZoomE);
      documentBody.style.overflow = '';
    };
  }, [activeObj]);

  const handleMenuOpen = name => {
    if (menuOpen === name) {
      setMenuOpen(false);
    } else {
      setMenuOpen(name);
    }
  };

  const getDropDownClass = (
    name,
    dropDown,
    dropDownClose,
    buttonMenuOpen,
    buttonMenuClosed
  ) => {
    if (menuOpen === name) {
      return { menu: dropDown, button: buttonMenuOpen };
    } else {
      return { menu: dropDownClose, button: buttonMenuClosed };
    }
  };

  const getActiveObject = () => {
    if (activeObj.oldGroup) {
      return activeObj.oldGroup;
    } else {
      return activeObj;
    }
  };

  /*
   * ###########################################################################
   * #                                                                         #
   * #                            EVENTS FUNCTIONS                             #
   * #                                                                         #
   * ###########################################################################
   */

  const selectedTextEvent = () => {
    activeTextSelection = [];
    clearInterval(textSelectionInterval);
    if (activeObj.getSelectionStyles) {
      for (const char of activeObj.getSelectionStyles()) {
        if (Object.keys(char).length > 0) {
          activeTextSelection = activeObj.getSelectionStyles();
          break;
        } else {
          activeTextSelection = false;
        }
      }
      textSelectionInterval = false;
      setTextSelection(activeTextSelection);
    }
  };

  /*
   * ###########################################################################
   * #                                                                         #
   * #                                 RENDER                                  #
   * #                                                                         #
   * ###########################################################################
   */

  const fbHeight = 45;
  const fbWidth = calcWidthFb(activeObj.fbButtons);
  const { top: fbTop, left: fbLeft } = calcPos(
    getActiveObject(),
    { clientWidth: fbWidth, clientHeight: fbHeight },
    board
  );
  const buttons = renderButtons(
    activeObj,
    board,
    {
      handleMenuOpen,
      getDropDownClass,
      groupObjectsFuncs,
      deleteItems,
      bringToFrontOrBack,
      calcMenuPos: (buttonPos, menuSize) =>
        calcMenuPos(board, { fbLeft, fbTop }, buttonPos, menuSize, {
          top: 17,
          left: 13
        }),
      calcButtonPosLeft: buttonName =>
        calcButtonPosLeft(activeObj.fbButtons, buttonName),
      updatePackage: { updated, setUpdated }
    },
    menuOpen,
    language
  );
  return (
    <Box
      id="floatingBar"
      style={{
        zIndex: 101,
        position: 'absolute',
        left: fbLeft,
        top: fbTop,
        visibility: 'visible'
      }}
    >
      <ButtonGroup
        style={{
          height: fbHeight,
          backgroundColor: '#FFFFFF',
          boxShadow: '3px 2px 9px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
          paddingTop: '5px',
          paddingLeft: '3px',
          paddingRight: '3px'
        }}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
};

/*
 * ###########################################################################
 * #                                                                         #
 * #                             STYLE FUNCTIONS                             #
 * #                                                                         #
 * ###########################################################################
 */

const newMenuPos = (threshold, pos) => {
  if (threshold > 0) {
    return pos - threshold;
  } else {
    return pos;
  }
};
const calcMenuPos = (
  board,
  { fbLeft, fbTop },
  { topPos, leftPos },
  { menuHeight, menuWidth },
  limit
) => {
  const { tl, br, bl } = board.vptCoords;
  const [zoom] = board.viewportTransform;
  const newTlY = tl.y * zoom;
  const newBlY = bl.y * zoom;
  const newBrX = br.x * zoom;
  const newBlX = bl.x * zoom;

  const thresholdY =
    fbTop + topPos + menuHeight + limit.top - (newBlY - newTlY);
  const thresholdX =
    fbLeft + leftPos + menuWidth + limit.left - (newBrX - newBlX);

  return {
    top: newMenuPos(thresholdY, topPos),
    left: newMenuPos(thresholdX, 0)
  };
};

const calcButtonPosLeft = (autorizer, buttonName) => {
  let leftPos = 0;
  autorizer.every(btn => {
    if (buttonName === btn) {
      return false;
    }
    if (btn === 'fontFamily') {
      leftPos += 130;
    } else if (btn === 'utility') {
      leftPos += 160;
    } else if (['moreOptions', 'lock', 'groupObjects'].includes(btn)) {
      leftPos += 40;
    } else {
      leftPos += 45;
    }
    return true;
  });
  return leftPos;
};

const calcWidthFb = availableButtons => {
  let width = 0;
  availableButtons.forEach(el => {
    if (el === 'fontFamily') {
      width += 130;
    } else if (el === 'utility') {
      width += 160;
    } else {
      width += 45;
    }
  });
  return width;
};

const calcLeft = (target, floatingBarWidth, board) => {
  const { width, left } = target.getBoundingRect();
  const { clientLeft, clientWidth } = document.getElementById('leftbar');
  const [zoom, , , , offsetX] = board.viewportTransform;
  const { tl, tr } = board.vptCoords;
  const paddingRight = 10;
  const paddingLeft = clientLeft + clientWidth + 10;
  const limitLeft = tl.x * zoom + paddingLeft;
  const limitRight = tr.x * zoom - paddingRight - floatingBarWidth;
  const boundingRectLeft = left + tl.x * zoom;
  const normalLeft = boundingRectLeft + (width - floatingBarWidth) / 2;
  return Math.max(limitLeft, Math.min(limitRight, normalLeft)) + offsetX;
};

const calcTop = (target, floatingBarHeight, board) => {
  const { height, top } = target.getBoundingRect();
  const [zoom, , , , , offsetY] = board.viewportTransform;
  const { tl, bl } = board.vptCoords;
  const sidePadding = 50;
  const offsetAboveObj = 100;
  const offsetBelowObj = 57;

  const maxMenuHeight = 100;
  const limitTop = tl.y * zoom + sidePadding;
  const limitBottom =
    bl.y * zoom - sidePadding - floatingBarHeight - maxMenuHeight;
  const boundingRectTop = top + tl.y * zoom;
  const fbAboveObj = boundingRectTop - floatingBarHeight - offsetAboveObj;
  const fbBelowObj =
    boundingRectTop + height + floatingBarHeight + offsetBelowObj;

  let newTop = fbAboveObj;
  if (newTop < limitTop) {
    newTop = fbBelowObj;
    if (newTop > limitBottom) {
      newTop = limitTop;
    }
  }

  return newTop + offsetY;
};

const calcPos = (target, { clientWidth, clientHeight }, board) => {
  const left = calcLeft(target, clientWidth, board);
  const top = calcTop(target, clientHeight, board);
  return { left, top };
};

/*
 * ###########################################################################
 * #                                                                         #
 * #                           BUTTONS FUNCTIONS                             #
 * #                                                                         #
 * ###########################################################################
 */

const setStyle = (
  board,
  obj,
  target,
  style,
  value,
  { updated, setUpdated }
) => {
  if (target.type !== 'activeSelection') {
    setObjStyle(board, obj, target, style, value);
  } else {
    let subTarget;
    if (style === 'fill' && Array.isArray(value)) {
      /**
       * specificity for opacity that which is inside the rgba code
       * rgb code that is not necessarily the same foreach item
       */
      value.forEach((newFill, index) => {
        const object = target._objects[index];
        if (object.type === 'group') {
          subTarget = object.item(0);
        } else {
          subTarget = object;
        }
        setObjStyle(board, object, subTarget, style, newFill);
      });
    } else {
      target._objects.forEach(object => {
        if (object.type === 'group') {
          subTarget = object.item(0);
        } else {
          subTarget = object;
        }
        setObjStyle(board, object, subTarget, style, value);
      });
    }
  }
  document.getElementsByClassName('upper-canvas')[0].click();
  setUpdated(!updated);
};

const adaptGroupOnStrokeWidthChange = (style, value, obj) => {
  if (style === 'strokeWidth' && obj.type === 'group') {
    const [shape, text] = obj._objects;
    const { width, height } = shape;
    const { verticalAlign } = text;
    const strokeWidthToCount = value / 2;
    const top = -(height / 2 + strokeWidthToCount);
    const left = -(width / 2 + strokeWidthToCount);
    const textTopPadding = text.calcPadding(height, value);
    const textLeftPadding = text.calcPadding(width, value);
    obj.set({ width: width + value, height: height + value });
    shape.set({ left, top });
    text.set({
      left: left + textLeftPadding,
      width: width + value - textLeftPadding * 2
    });
    if (verticalAlign === 'bottom') {
      text.set('top', -top - text.getBoundingRect().height - textTopPadding);
    } else if (verticalAlign === 'middle') {
      text.set('top', -text.getBoundingRect().height / 2);
    } else {
      text.set('top', top + textTopPadding);
    }
  }
};

const setObjStyle = (board, obj, target, style, value) => {
  if (target.remotingsType === 'arrowshape' && style === 'stroke') {
    target.set('fill', value);
  }
  adaptGroupOnStrokeWidthChange(style, value, obj);
  if (
    target.remotingsType !== 'text' ||
    ['verticalAlign', 'textAlign'].includes(style)
  ) {
    target.set(style, value);
  } else {
    const selectionLength = target.getSelectionStyles().length;

    if (selectionLength > 0 && selectionLength !== target._text.length) {
      target.setSelectionStyles({ [style]: value });
      let maxWidth = target.width;
      target.__lineWidths.forEach(
        lineWidth => (maxWidth = Math.max(maxWidth, lineWidth))
      );

      target.set('width', maxWidth);
    } else {
      target.set(style, value);
    }
  }
  board.renderAll();
  board.fire('object:modified', { target: obj });
};

const changeActiveObject = (obj, board) => {
  if (!editingText) {
    obj.fire('mousedblclick');
    editingText = true;
  } else {
    board.discardActiveObject();
    const boardObjects = board._objects;
    const last = boardObjects[boardObjects.length - 1];
    board.setActiveObject(last);
    editingText = false;
  }
};

const checkTextSelection = (target, field, obj) => {
  let itemFieldValue;
  let nextIndex;

  if (activeTextSelection.length === 1) {
    nextIndex = 0;
  } else {
    nextIndex = 1;
  }

  if (activeTextSelection.length > 0) {
    activeTextSelection.forEach(char => {
      if (
        char.hasOwnProperty(field) &&
        char[field] !== undefined &&
        activeTextSelection[nextIndex].hasOwnProperty(field)
      ) {
        itemFieldValue = char[field];
        if (activeTextSelection[nextIndex][field] !== char[field]) {
          if (nextIndex !== activeTextSelection.length - 1) {
            nextIndex++;
          }

          itemFieldValue = 'Mul';
        }
      } else if (
        !char.hasOwnProperty(field) &&
        activeTextSelection[nextIndex].hasOwnProperty(field)
      ) {
        itemFieldValue = 'Mul';
      } else {
        itemFieldValue = target[field];
      }
    });
  } else if (
    ![
      'textAlign',
      'fontStyle',
      'underline',
      'linethrough',
      'fontWeight'
    ].includes(field) &&
    obj.remotingsType === 'text' &&
    target.styles[0] !== undefined &&
    activeTextSelection.length === 0
  ) {
    Object.entries(target.styles[0]).every(char => {
      if (char[1].hasOwnProperty(field) && char[1][field] !== target[field]) {
        itemFieldValue = 'Mul';
        return false;
      } else {
        itemFieldValue = target[field];
      }
      return true;
    });
  } else {
    if (field !== 'lockState') {
      itemFieldValue = target[field];
    } else {
      itemFieldValue = obj[field];
    }
  }

  return itemFieldValue;
};

const checkActiveSelectionField = (selection, field, buttonType) => {
  let currentValue;
  if (field === 'lockState') {
    currentValue = selection._objects.some(object => object[field]);
  } else {
    let firstObjValue;
    let defaultValue;
    if (selection._objects[0].type === 'group') {
      firstObjValue = selection._objects[0].item(0)[field];
    } else {
      firstObjValue = selection._objects[0][field];
    }
    switch (field) {
      case 'fill':
        if (buttonType === 'fontColor') {
          if (selection._objects.every(obj => obj[field] === firstObjValue)) {
            currentValue = firstObjValue;
          } else {
            currentValue = '';
          }
        } else {
          /**
           * if there are multiple rgba codes
           * codes are splitted in array
           * else stay as a string
           */
          currentValue = [];
          selection._objects.forEach(obj => {
            let value;
            if (obj.type === 'group') {
              value = obj.item(0)[field];
            } else {
              value = obj[field];
            }
            if (!currentValue.includes(value)) {
              currentValue.push(value);
            }
          });
          if (!currentValue[1]) {
            currentValue = currentValue[0];
          }
        }
        break;
      case 'stroke':
      case 'strokeDashArray':
      case 'strokeWidth':
      case 'groupIndex':
        defaultValue = {
          fill: 'rgba(0, 0, 0, 1)',
          stroke: 'rgba(0, 0, 0, 1)',
          strokeWidth: 1,
          strokeDashArray: [],
          groupIndex: 'Mul'
        };
        if (
          selection._objects.every(obj => {
            if (obj.type === 'group') {
              return obj.item(0)[field] === firstObjValue;
            } else {
              return obj[field] === firstObjValue;
            }
          })
        ) {
          currentValue = firstObjValue;
        } else {
          currentValue = defaultValue[field];
        }
        break;
      case 'underline':
      case 'linethrough':
      case 'fontWeight':
      case 'fontStyle':
      case 'textAlign':
      case 'fontSize':
      case 'fontFamily':
        /**
         * text only fields
         */
        defaultValue = {
          underline: false,
          linethrough: false,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textAlign: 'left',
          fontSize: 'Mul',
          fontFamily: 'Mul'
        };
        if (selection._objects.every(obj => obj[field] === firstObjValue)) {
          currentValue = firstObjValue;
        } else {
          currentValue = defaultValue[field];
        }
        break;
      default:
        break;
    }
  }
  return currentValue;
};

const createButton = (
  buttonType,
  { target, obj },
  board,
  {
    calcMenuPos: calcMenuPosClbk,
    calcButtonPosLeft: calcButtonPosLeftClbk,
    handleMenuOpen,
    getDropDownClass,
    groupObjectsFuncs,
    bringToFrontOrBack,
    deleteItems,
    updatePackage
  },
  menuOpen,
  language,
  index
) => {
  const currentValue = {};
  const buttonNameFieldAssociation = {
    backgroundColor: ['fill'],
    fontColor: ['fill'],
    fontSize: ['fontSize'],
    fontFamily: ['fontFamily'],
    fontStyle: ['underline', 'linethrough', 'fontWeight', 'fontStyle'],
    textAlign: ['textAlign'],
    verticalAlign: ['verticalAlign'],
    strokeWidth: ['strokeWidth'],
    strokeColor: ['stroke'],
    dashAndColour: ['strokeDashArray', 'stroke'],
    groupObjects: ['groupIndex'],
    lock: ['lockState'],
    editText: [],
    aspectRatio: [],
    export: [],
    moreOptions: [],
    utility: []
  };
  buttonNameFieldAssociation[buttonType].forEach(field => {
    if (target.type !== 'activeSelection') {
      if (obj.remotingsType === 'text' && obj.getSelectionStyles().length > 0) {
        obj.getSelectionStyles().map(char => {
          if (char.hasOwnProperty(field)) {
            activeTextSelection = obj.getSelectionStyles();
          }
        });
      }
      currentValue[field] = checkTextSelection(target, field, obj);
    } else {
      currentValue[field] = checkActiveSelectionField(obj, field, buttonType);
    }
  });

  const props = {
    language,
    currentValue,
    key: `${buttonType}key`,
    coord: board.vptCoords,
    setStyle: (style, value) =>
      setStyle(board, obj, target, style, value, updatePackage)
  };
  const propsForMenuBtn = {
    menuOpen,
    getDropDownClass,
    buttonName: buttonType,
    calcMenuPos: calcMenuPosClbk,
    calcButtonPosLeft: calcButtonPosLeftClbk,
    handleMenuOpen: () => handleMenuOpen(buttonType)
  };
  let button;
  switch (buttonType) {
    case 'backgroundColor':
      const opacity =
        obj.remotingsType === 'rectshape' ||
        obj.remotingsType === 'circleshape' ||
        obj.opacityFriendly;
      button = (
        <ButtonBackgroundColor
          opacity={opacity}
          {...props}
          {...propsForMenuBtn}
        />
      );
      break;
    case 'fontColor':
      button = <ButtonFontColor {...props} {...propsForMenuBtn} />;
      break;
    case 'fontSize':
      button = (
        <ButtonFontSize
          {...props}
          {...propsForMenuBtn}
          autoFontSize={obj.autoFontSize}
          setVerticalAlign={target.setVerticalAlign}
        />
      );
      break;
    case 'fontFamily':
      button = <ButtonFontFamily {...props} {...propsForMenuBtn} />;
      break;
    case 'fontStyle':
      button = <ButtonFontStyle {...props} {...propsForMenuBtn} />;
      break;
    case 'textAlign':
      button = <ButtonTextAlign {...props} {...propsForMenuBtn} />;
      break;
    case 'verticalAlign':
      button = (
        <ButtonVerticalAlign
          {...props}
          {...propsForMenuBtn}
          setVerticalAlign={target.setVerticalAlign}
        />
      );
      break;
    case 'strokeWidth':
      button = <ButtonStrokeWidth {...props} {...propsForMenuBtn} />;
      break;
    case 'lock':
      button = (
        <ButtonLock
          {...props}
          setLock={obj.setLock}
          isFirst={index === 0}
          setUpdated={updatePackage.setUpdated}
          updated={updatePackage.updated}
        />
      );
      break;
    case 'emoji':
      button = <ButtonEmoji {...props} />;
      break;
    case 'aspectRatio':
      const { setFrameType, typeArray } = obj;
      button = (
        <ButtonAspectRatio
          {...props}
          {...propsForMenuBtn}
          setFrameType={setFrameType}
          typeArray={typeArray}
        />
      );
      break;
    case 'export':
      button = (
        <ButtonExport
          {...props}
          {...propsForMenuBtn}
          exportFile={obj.exportFile}
        />
      );
      break;
    case 'dashAndColour':
      button = <ButtonDashAndColour {...props} {...propsForMenuBtn} />;
      break;
    case 'editText':
      button = (
        <ButtonEditText
          editingText={editingText}
          setText={() => changeActiveObject(obj, board)}
          key={props.key}
          getDropDownClass={getDropDownClass}
        />
      );
      break;
    case 'utility':
      button = (
        <UtliltyButtons
          {...props}
          bringToFrontOrBack={bringToFrontOrBack}
          deleteItems={deleteItems}
        />
      );
      break;
    case 'groupObjects':
      button = (
        <ButtonGroupObjects
          {...props}
          {...propsForMenuBtn}
          target={target}
          groupObjectsFuncs={groupObjectsFuncs}
        />
      );
      break;
    case 'moreOptions':
      button = (
        <ButtonMoreOptions
          {...props}
          {...propsForMenuBtn}
          bringToFrontOrBack={bringToFrontOrBack}
          deleteItems={deleteItems}
        />
      );
      break;
    default:
      break;
  }
  return button;
};

const renderButtons = (obj, board, callbacks, menuOpen, language) => {
  const newButtons = [];
  const { remotingsType, type, fbButtons } = obj;
  let target;
  /**
   * text / lineshape are directly the targetted obj of caracteristics change
   *
   * stickynote / rectshape / circleshape / arrowshape are groups
   *    with, as target, their first item
   */
  switch (remotingsType) {
    case 'rectshape':
    case 'circleshape':
    case 'stickynote':
      target = obj.item(0);
      break;
    case 'text':
    case 'arrowshape':
    case 'lineshape':
    case 'imageshape':
    case 'draw':
      target = obj;
      break;
    default:
      if (type === 'activeSelection') {
        target = obj;
      }
      break;
  }
  fbButtons.forEach((buttonType, index) => {
    newButtons.push(
      createButton(
        buttonType,
        { target, obj },
        board,
        callbacks,
        menuOpen,
        language,
        index
      )
    );
  });
  return newButtons;
};

export default FloatingBar;
