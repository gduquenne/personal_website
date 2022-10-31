import { fabric } from 'fabric';
import {
  createControl,
  limitSize,
  adaptSizesToEachOther,
  calcLocalPoint
} from './GlobalControls';

const { controlsUtils } = fabric;

/*
 * #########################################################################
 * #                                                                       #
 * #                          IMAGE CUSTOM CONTROLS                        #
 * #                                                                       #
 * #########################################################################
 */

const rescale = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const {
    width,
    height,
    left,
    top,
    strokeWidth,
    newControlOrigin,
    angle,
    scaleX: lastScaleX,
    scaleY: lastScaleY
  } = target;
  const finalOrigin = [];
  if (newControlOrigin.length !== 0) {
    finalOrigin.push(...newControlOrigin);
  } else {
    finalOrigin.push(originX, originY);
  }
  const ratio = width / height;
  const { x: localPointX, y: localPointY } = calcLocalPoint(
    transform,
    finalOrigin,
    x,
    y
  );
  let [newWidth, widthLimited] = limitSize(
    finalOrigin[0],
    width,
    Math.max(Math.abs(localPointX) - strokeWidth, 1),
    left,
    [-3810, 3810],
    ['right', 'left']
  );
  let [newHeight, heightLimited] = limitSize(
    finalOrigin[1],
    height,
    Math.max(Math.abs(localPointY) - strokeWidth, 1),
    top,
    [-2130, 2130],
    ['bottom', 'top']
  );
  [newHeight, newWidth] = adaptSizesToEachOther(
    finalOrigin,
    [height, width],
    [left, top],
    [newHeight, newWidth],
    [heightLimited, widthLimited],
    ratio
  );
  const scaleX = newWidth / width;
  const scaleY = newHeight / height;

  target.set('scaleX', scaleX);
  target.set('scaleY', scaleY);
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
    newLeft += (width * lastScaleX - newWidth) * vx.x;
    newTop += (width * lastScaleX - newWidth) * vx.y;
    target.set('left', Math.round(newLeft));
    target.set('top', Math.round(newTop));
  }
  if (finalOrigin[1] === 'bottom') {
    newLeft += (height * lastScaleY - newHeight) * vy.x;
    newTop += (height * lastScaleY - newHeight) * vy.y;
    target.set('left', Math.round(newLeft));
    target.set('top', Math.round(newTop));
  }
  return true;
};

const cropFromTop = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { height, naturalHeight, top, left, angle, scaleY, padding } = target;
  const { y: localPointY } = calcLocalPoint(
    transform,
    [originX, originY],
    x,
    y
  );
  if (
    Math.abs(localPointY) / scaleY < naturalHeight &&
    localPointY < -1 + padding
  ) {
    target.set('height', Math.round(Math.abs(localPointY) / scaleY));
    target.set(
      'top',
      Math.round(
        top +
          (height * scaleY - Math.abs(localPointY)) *
            Math.sin(((angle + 90) * Math.PI) / 180)
      )
    );
    target.set(
      'left',
      Math.round(
        left +
          (height * scaleY - Math.abs(localPointY)) *
            Math.cos(((angle + 90) * Math.PI) / 180)
      )
    );
  }
  return true;
};

const cropFromBottom = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { naturalHeight, scaleY, padding } = target;
  const { y: localPointY } = calcLocalPoint(
    transform,
    [originX, originY],
    x,
    y
  );
  if (localPointY / scaleY < naturalHeight && localPointY > 1 - padding) {
    target.set('height', Math.round(localPointY / scaleY));
  }
  return true;
};

const cropFromRight = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { naturalWidth, scaleX, padding } = target;
  const { x: localPointX } = calcLocalPoint(
    transform,
    [originX, originY],
    x,
    y
  );
  if (localPointX / scaleX < naturalWidth && localPointX > 1 - padding) {
    target.set('width', Math.round(localPointX / scaleX));
  }
  return true;
};

const cropFromLeft = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { width, naturalWidth, left, top, angle, scaleX, padding } = target;
  const { x: localPointX } = calcLocalPoint(
    transform,
    [originX, originY],
    x,
    y
  );
  if (
    Math.abs(localPointX) / scaleX < naturalWidth &&
    localPointX < -1 + padding
  ) {
    target.set('width', Math.round(Math.abs(localPointX) / scaleX));
    target.set(
      'left',
      Math.round(
        left +
          (width * scaleX - Math.abs(localPointX)) *
            Math.cos((angle * Math.PI) / 180)
      )
    );
    target.set(
      'top',
      Math.round(
        top +
          (width * scaleX - Math.abs(localPointX)) *
            Math.sin((angle * Math.PI) / 180)
      )
    );
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
  ml: createControl(-0.5, 0, cropFromLeft),
  mr: createControl(0.5, 0, cropFromRight),
  mb: createControl(0, 0.5, cropFromBottom),
  mt: createControl(0, -0.5, cropFromTop),
  tl: createControl(-0.5, -0.5, rescale),
  tr: createControl(0.5, -0.5, rescale),
  bl: createControl(-0.5, 0.5, rescale),
  br: createControl(0.5, 0.5, rescale),
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
