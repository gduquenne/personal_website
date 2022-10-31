import { fabric } from 'fabric';
import {
  createControl,
  resizeWidth,
  limitSize,
  calcLocalPoint
} from './GlobalControls';

const { controlsUtils } = fabric;

/*
 * #########################################################################
 * #                                                                       #
 * #                       TEXTBOX CUSTOM CONTROLS                         #
 * #                                                                       #
 * #########################################################################
 */

const resizeWidthHeightText = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const {
    fontSize,
    width,
    left,
    top,
    angle,
    strokeWidth,
    newControlOrigin
  } = target;
  const { height } = target.getBoundingRect();
  const finalOrigin = [];
  if (newControlOrigin.length !== 0) {
    finalOrigin.push(...newControlOrigin);
  } else {
    finalOrigin.push(originX, originY);
  }
  const { x: localPointX } = calcLocalPoint(transform, finalOrigin, x, y);
  const [newWidth] = limitSize(
    finalOrigin[0],
    width,
    Math.max(Math.abs(localPointX) - strokeWidth, 1),
    left,
    [-3810, 3810],
    ['right', 'left']
  );
  const newFontSize = (fontSize * newWidth) / width;
  target.set('fontSize', newFontSize);
  target.set('width', newWidth);
  const { height: newHeight } = target.getBoundingRect();
  const vx = {
    x: Math.cos((angle * Math.PI) / 180),
    y: Math.sin((angle * Math.PI) / 180)
  };
  const vy = {
    x: Math.cos(((angle + 90) * Math.PI) / 180),
    y: Math.sin(((angle + 90) * Math.PI) / 180)
  };
  let newTop = top;
  let newLeft = left;
  if (finalOrigin[0] === 'right') {
    newLeft += (width - newWidth) * vx.x;
    newTop += (width - newWidth) * vx.y;
    target.set('left', newLeft);
    target.set('top', newTop);
  }
  if (finalOrigin[1] === 'bottom') {
    newLeft += (height - newHeight) * vy.x;
    newTop += (height - newHeight) * vy.y;
    target.set('left', newLeft);
    target.set('top', newTop);
  }
  return true;
};

/*
 * #########################################################################
 * #                                                                       #
 * #                                  INIT                                 #
 * #                                                                       #
 * #########################################################################
 */

const controls = {
  ml: createControl(-0.5, 0, resizeWidth),
  mr: createControl(0.5, 0, resizeWidth),
  tl: createControl(-0.5, -0.5, resizeWidthHeightText),
  tr: createControl(0.5, -0.5, resizeWidthHeightText),
  bl: createControl(-0.5, 0.5, resizeWidthHeightText),
  br: createControl(0.5, 0.5, resizeWidthHeightText),
  mtr: new fabric.Control({
    x: 0,
    y: -0.5,
    actionHandler: controlsUtils.rotationWithSnapping,
    actionName: 'rotate',
    cursorStyleHandler: controlsUtils.rotationStyleHandler,
    offsetY: -40,
    withConnection: true
  })
};

export { controls };
