import { fabric } from 'fabric';

const { controlsUtils } = fabric;
/*
 * #########################################################################
 * #                                                                       #
 * #                        GLOBAL CUSTOM CONTROLS                         #
 * #                                                                       #
 * #########################################################################
 */

const calcLocalPoint = (transform, [originX, originY], x, y) => {
  const { target, corner } = transform;
  const control = target.controls[corner];
  const zoom = target.canvas.getZoom();
  const padding = target.padding / zoom;
  let localPoint = target.toLocalPoint(
    new fabric.Point(x, y),
    originX,
    originY
  );
  if (localPoint.x < 0 && originX === 'left') {
    originX = 'right';
  }
  if (localPoint.x > 0 && originX === 'right') {
    originX = 'left';
  }
  if (localPoint.y < 0 && originY === 'top') {
    originY = 'bottom';
  }
  if (localPoint.y > 0 && originY === 'bottom') {
    originY = 'top';
  }

  target.newControlOrigin = [originX, originY];
  localPoint = target.toLocalPoint(new fabric.Point(x, y), originX, originY);

  if (localPoint.x >= padding) {
    localPoint.x -= padding;
  }
  if (localPoint.x <= -padding) {
    localPoint.x += padding;
  }
  if (localPoint.y >= padding) {
    localPoint.y -= padding;
  }
  if (localPoint.y <= padding) {
    localPoint.y += padding;
  }
  localPoint.x -= control.offsetX;
  localPoint.y -= control.offsetY;
  return localPoint;
};

const limitSize = (
  origin,
  currentSize,
  newSize,
  pos,
  [min, max],
  [sideModiyingPos, sideNotModifiyingPos]
) => {
  if (origin === sideNotModifiyingPos && pos + newSize > max) {
    return [max - pos, true];
  }
  if (origin === sideModiyingPos && pos - newSize + currentSize < min) {
    return [currentSize, true];
  }
  return [newSize, false];
};

const adaptSizesToEachOther = (
  finalOrigin,
  [height, width],
  [left, top],
  [newHeight, newWidth],
  [heightLimited, widthLimited],
  ratio
) => {
  do {
    if (!heightLimited && !widthLimited) {
      const newRatio = newWidth / newHeight;
      if (newRatio > ratio) {
        [newHeight, heightLimited] = limitSize(
          finalOrigin[1],
          height,
          newWidth / ratio,
          top,
          [-2130, 2130],
          ['bottom', 'top']
        );
      } else {
        [newWidth, widthLimited] = limitSize(
          finalOrigin[0],
          width,
          newHeight * ratio,
          left,
          [-3810, 3810],
          ['right', 'left']
        );
      }
    } else if (heightLimited && !widthLimited) {
      [newWidth, widthLimited] = limitSize(
        finalOrigin[0],
        width,
        newHeight * ratio,
        left,
        [-3810, 3810],
        ['right', 'left']
      );
      heightLimited = false;
    } else if (!heightLimited && widthLimited) {
      [newHeight, heightLimited] = limitSize(
        finalOrigin[1],
        height,
        newWidth / ratio,
        top,
        [-2130, 2130],
        ['bottom', 'top']
      );
      widthLimited = false;
    } else {
      if (newWidth < newHeight) {
        [newHeight, heightLimited] = limitSize(
          finalOrigin[1],
          height,
          newWidth / ratio,
          top,
          [-2130, 2130],
          ['bottom', 'top']
        );
        widthLimited = false;
      } else {
        [newWidth, widthLimited] = limitSize(
          finalOrigin[0],
          width,
          newHeight * ratio,
          left,
          [-3810, 3810],
          ['right', 'left']
        );
        heightLimited = false;
      }
    }
  } while (heightLimited || widthLimited);
  return [newHeight, newWidth];
};

const resizeWidthHeight = (_, transform, x, y, ratio) => {
  const { target, originX, originY } = transform;
  const {
    width,
    height,
    left,
    top,
    angle,
    strokeWidth,
    newControlOrigin
  } = target;
  const finalOrigin = [];
  if (newControlOrigin.length !== 0) {
    finalOrigin.push(...newControlOrigin);
  } else {
    finalOrigin.push(originX, originY);
  }
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
  if (ratio) {
    [newHeight, newWidth] = adaptSizesToEachOther(
      finalOrigin,
      [height, width],
      [left, top],
      [newHeight, newWidth],
      [heightLimited, widthLimited],
      ratio
    );
  }
  newWidth = Math.round(newWidth);
  newHeight = Math.round(newHeight);
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
    target.set('left', Math.round(newLeft));
    target.set('top', Math.round(newTop));
  }
  if (finalOrigin[1] === 'bottom') {
    newLeft += (height - newHeight) * vy.x;
    newTop += (height - newHeight) * vy.y;
    target.set('left', Math.round(newLeft));
    target.set('top', Math.round(newTop));
  }
  target.set('width', newWidth);
  target.set('height', newHeight);
  return true;
};

const resizeWidth = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { width, left, top, angle, strokeWidth, newControlOrigin } = target;
  const finalOrigin = [];
  if (newControlOrigin.length !== 0) {
    finalOrigin.push(...newControlOrigin);
  } else {
    finalOrigin.push(originX, originY);
  }
  const { x: localPointX } = calcLocalPoint(transform, finalOrigin, x, y);
  let [newSize] = limitSize(
    finalOrigin[0],
    width,
    Math.max(Math.abs(localPointX) - strokeWidth, 1),
    left,
    [-3810, 3810],
    ['right', 'left']
  );
  newSize = Math.round(newSize);
  if (finalOrigin[0] === 'right') {
    target.set(
      'left',
      Math.round(left + (width - newSize) * Math.cos((angle * Math.PI) / 180))
    );
    target.set(
      'top',
      Math.round(top + (width - newSize) * Math.sin((angle * Math.PI) / 180))
    );
  }
  target.set('width', newSize);
  return true;
};

const resizeHeight = (_, transform, x, y) => {
  const { target, originX, originY } = transform;
  const { height, top, left, angle, strokeWidth, newControlOrigin } = target;
  const finalOrigin = [];
  if (newControlOrigin.length !== 0) {
    finalOrigin.push(...newControlOrigin);
  } else {
    finalOrigin.push(originX, originY);
  }
  const { y: localPointY } = calcLocalPoint(transform, finalOrigin, x, y);
  let [newSize] = limitSize(
    finalOrigin[1],
    height,
    Math.max(Math.abs(localPointY) - strokeWidth, 1),
    top,
    [-2130, 2130],
    ['bottom', 'top']
  );
  newSize = Math.round(newSize);
  if (finalOrigin[1] === 'bottom') {
    target.set(
      'top',
      Math.round(
        top + (height - newSize) * Math.sin(((angle + 90) * Math.PI) / 180)
      )
    );
    target.set(
      'left',
      Math.round(
        left + (height - newSize) * Math.cos(((angle + 90) * Math.PI) / 180)
      )
    );
  }
  target.set('height', newSize);
  return true;
};

const createControl = (x, y, actionHandler) => {
  return new fabric.Control({
    x,
    y,
    actionHandler,
    actionName: 'customScaling',
    cursorStyleHandler: controlsUtils.scaleSkewCursorStyleHandler
  });
};

export {
  createControl,
  resizeHeight,
  resizeWidth,
  resizeWidthHeight,
  limitSize,
  adaptSizesToEachOther,
  calcLocalPoint
};
