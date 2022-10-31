import { fabric } from 'fabric';
import {
  createControl,
  resizeHeight,
  resizeWidth,
  resizeWidthHeight
} from './GlobalControls';

const { controlsUtils } = fabric;

/*
 * #########################################################################
 * #                                                                       #
 * #                       CIRCLESHAPE CUSTOM CONTROLS                     #
 * #                                                                       #
 * #########################################################################
 */

const resizeWidthHeightCircleObjects = group => {
  resizeWidthCircleObjects(group);
  resizeHeightCircleObjects(group);
};

const resizeWidthCircleObjects = group => {
  const { width } = group;
  const [ellipse, text] = group._objects;
  const widthToAdd = ellipse.strokeWidth / 2;
  const ellipseWidth = Math.max(width - widthToAdd, 0);
  const ellipseLeft = -(width + widthToAdd) / 2;
  const textLeftPadding = text.calcPadding(ellipseWidth, ellipse.strokeWidth);

  ellipse.set('rx', ellipseWidth / 2);
  ellipse.set('left', ellipseLeft);
  text.set('width', ellipseWidth + ellipse.strokeWidth - textLeftPadding * 2);
  text.set('left', ellipseLeft + textLeftPadding);
  text.set('top', recalcTextTopCountingVerticalAlign(text, ellipse));
};

const resizeHeightCircleObjects = group => {
  const { height } = group;
  const [ellipse, text] = group._objects;
  const heightToAdd = ellipse.strokeWidth / 2;
  const ellipseHeight = Math.max(height - heightToAdd, 0);
  const ellipseTop = -(height + heightToAdd) / 2;

  ellipse.set('ry', ellipseHeight / 2);
  ellipse.set('top', ellipseTop);
  text.set('top', recalcTextTopCountingVerticalAlign(text, ellipse));
};

const resizeWidthHeightCircle = (transform, { x, y }) => {
  resizeWidthHeight(null, transform, x, y);
  resizeWidthHeightCircleObjects(transform.target);
};

const resizeWidthCircle = (transform, { x, y }) => {
  resizeWidth(null, transform, x, y);
  resizeWidthCircleObjects(transform.target);
};

const resizeHeightCircle = (transform, { x, y }) => {
  resizeHeight(null, transform, x, y);
  resizeHeightCircleObjects(transform.target);
};

/*
 * #########################################################################
 * #                                                                       #
 * #                 RECTSHAPE & STICKYNOTE CUSTOM CONTROLS                #
 * #                                                                       #
 * #########################################################################
 */

/**
 * Stickynotes and Rectshapes have the same objects insides
 * to know :
 *   - _objects[0] = rect
 *   - _objects[1] = text
 * there are two differences between them :
 *   - stickynote keeps its width / height ratio
 *   - rectshape resize doesn't affect fontsize
 */

const resizeWidthHeightStickyObjects = (group, prevWidth) => {
  resizeFontTextSticky(group, prevWidth);
  resizeWidthHeightRectObjects({ ...group, height: group.width });
};

const resizeWidthHeightRectObjects = group => {
  resizeWidthRectObjects(group);
  resizeHeightRectObjects(group);
};

const resizeWidthRectObjects = group => {
  const { width } = group;
  const [rect, text] = group._objects;
  const widthToAdd = rect.strokeWidth / 2;
  const rectWidth = Math.max(width - widthToAdd, 0);
  const rectLeft = -(width + widthToAdd) / 2;
  const textLeftPadding = text.calcPadding(rectWidth, rect.strokeWidth);

  rect.set('width', rectWidth);
  rect.set('left', rectLeft);
  text.set('width', rectWidth + rect.strokeWidth - textLeftPadding * 2);
  text.set('left', rectLeft + textLeftPadding);
  text.set('top', recalcTextTopCountingVerticalAlign(text, rect));
};

const resizeHeightRectObjects = group => {
  const { height } = group;
  const [rect, text] = group._objects;
  const heightToAdd = rect.strokeWidth / 2;
  const rectHeight = Math.max(height - heightToAdd, 0);
  const rectTop = -(height + heightToAdd) / 2;

  rect.set('height', rectHeight);
  rect.set('top', rectTop);
  text.set('top', recalcTextTopCountingVerticalAlign(text, rect));
};

const recalcTextTopCountingVerticalAlign = (text, rect) => {
  const { height, top, strokeWidth } = rect;
  const { verticalAlign, __lineHeights } = text;
  const textTopPadding = text.calcPadding(height, strokeWidth);
  let textHeight = 0;
  __lineHeights.forEach(lineHeight => (textHeight += lineHeight));
  if (verticalAlign === 'bottom') {
    return -top - textHeight - textTopPadding;
  } else if (verticalAlign === 'middle') {
    return -textHeight / 2;
  } else {
    return top + textTopPadding;
  }
};

const resizeWidthHeightSticky = (transform, { x, y }) => {
  const { target } = transform;
  const { width, height } = target;
  resizeWidthHeight(null, transform, x, y, width / height);
  resizeWidthHeightStickyObjects({ ...target, height: target.width }, width);
};

const resizeFontTextSticky = (group, prevWidth) => {
  const { width, _objects } = group;
  const [, text] = _objects;
  const { fontSize, styles, autoFontSize } = text;
  if (autoFontSize) {
    const fontSizeMultiplicator = width / prevWidth;
    text.set('fontSize', fontSize * fontSizeMultiplicator);
    Object.keys(styles).forEach(lineIndex => {
      const styledLine = styles[lineIndex];
      Object.keys(styledLine).forEach(charIndex => {
        const styledChar = styledLine[charIndex];
        if (styledChar.hasOwnProperty('fontSize')) {
          styledChar.fontSize *= fontSizeMultiplicator;
        }
      });
    });
  }
};

const resizeWidthHeightRect = (transform, { x, y }) => {
  resizeWidthHeight(null, transform, x, y);
  resizeWidthHeightRectObjects(transform.target);
};

const resizeWidthRect = (transform, { x, y }) => {
  resizeWidth(null, transform, x, y);
  resizeWidthRectObjects(transform.target);
};

const resizeHeightRect = (transform, { x, y }) => {
  resizeHeight(null, transform, x, y);
  resizeHeightRectObjects(transform.target);
};

/*
 * #########################################################################
 * #                                                                       #
 * #                       SELECTION CUSTOM CONTROLS                       #
 * #                                                                       #
 * #########################################################################
 */

const resizeWidthHeightSelection = (transform, { x, y }) => {
  const { target } = transform;
  const { width, height } = target;
  if (!target.newControlOrigin) {
    target.newControlOrigin = [];
  }
  resizeWidthHeight(null, transform, x, y, width / height);
  const { width: newWidth, height: newHeight } = target;
  const scaleX = newWidth / width;
  const scaleY = newHeight / height;
  target._objects.forEach(obj => {
    obj.set('left', obj.left * scaleX);
    obj.set('top', obj.top * scaleY);
    switch (obj.remotingsType) {
      case 'stickynote':
        const stickyPrevWidth = obj.width;
        obj.set('height', obj.height * scaleY);
        obj.set('width', obj.width * scaleX);
        resizeWidthHeightStickyObjects(obj, stickyPrevWidth);
        break;
      case 'rectshape':
        obj.set('height', obj.height * scaleY);
        obj.set('width', obj.width * scaleX);
        resizeWidthHeightRectObjects(obj);
        break;
      case 'circleshape':
        obj.set('height', obj.height * scaleY);
        obj.set('width', obj.width * scaleX);
        resizeWidthHeightCircleObjects(obj);
        break;
      case 'text':
        obj.set('width', obj.width * scaleX);
        obj.set('fontSize', Math.max(4, obj.fontSize * scaleX));
        break;
      case 'imageshape':
      case 'draw':
        obj.set('scaleX', obj.scaleX * scaleX);
        obj.set('scaleY', obj.scaleY * scaleY);
        break;
      default:
        break;
    }
  });
};

const resizeWidthSelection = (transform, { x, y }) => {
  const { target } = transform;
  const { width } = target;
  if (!target.newControlOrigin) {
    target.newControlOrigin = [];
  }
  resizeWidth(null, transform, x, y);
  const { width: newWidth } = target;
  target._objects.forEach(obj => {
    obj.set('left', (obj.left * newWidth) / width);
    obj.set('width', (obj.width * newWidth) / width);
    switch (obj.remotingsType) {
      case 'rectshape':
        resizeWidthRectObjects(obj);
        break;
      case 'circleshape':
        resizeWidthCircleObjects(obj);
        break;
      case 'draw':
      case 'stickynote':
      case 'text':
      case 'imageshape':
      default:
        break;
    }
  });
};

const resizeHeightSelection = (transform, { x, y }) => {
  const { target } = transform;
  const { height } = target;
  if (!target.newControlOrigin) {
    target.newControlOrigin = [];
  }
  resizeHeight(null, transform, x, y);
  const { height: newHeight } = target;
  target._objects.forEach(obj => {
    obj.set('top', (obj.top * newHeight) / height);
    obj.set('height', (obj.height * newHeight) / height);
    switch (obj.remotingsType) {
      case 'rectshape':
        resizeHeightRectObjects(obj);
        break;
      case 'circleshape':
        resizeHeightCircleObjects(obj);
        break;
      case 'draw':
      case 'stickynote':
      case 'text':
      case 'imageshape':
      default:
        break;
    }
  });
};

/*
 * #########################################################################
 * #                                                                       #
 * #                         GROUP CUSTOM CONTROLS                         #
 * #                                                                       #
 * #########################################################################
 */

/**
 * Each group is formed like this :
 * transform.target.type === 'group'
 * transform.target._objects === [array, of, items] composing the group
 *    EX : - stickynote._objects  = [rect,    text]
 *         - circleshape._objects = [ellipse, text]
 * Each items in the group has a position relative to its group.
 *    EX : A group positionned in { 1000, 1000 }
 *      with a size ( width, height ) of ( 100, 200 )
 *      --> items, composing the group, without offset,
 *        are positionned in { -50, -100 }
 */

const resizeWidthHeightGroup = (_, transform, x, y) => {
  const { type, remotingsType } = transform.target;
  if (type === 'activeSelection') {
    resizeWidthHeightSelection(transform, { x, y });
  } else {
    switch (remotingsType) {
      case 'stickynote':
        resizeWidthHeightSticky(transform, { x, y });
        break;
      case 'rectshape':
        resizeWidthHeightRect(transform, { x, y });
        break;
      case 'circleshape':
        resizeWidthHeightCircle(transform, { x, y });
        break;
      case 'text':
      default:
        break;
    }
  }
  return true;
};

const resizeWidthGroup = (_, transform, x, y) => {
  const { target } = transform;
  if (target.type === 'activeSelection') {
    resizeWidthSelection(transform, { x, y });
  } else {
    switch (target.remotingsType) {
      case 'rectshape':
        resizeWidthRect(transform, { x, y });
        break;
      case 'circleshape':
        resizeWidthCircle(transform, { x, y });
        break;
      case 'text':
      case 'stickynote':
      default:
        break;
    }
  }
  return true;
};

const resizeHeightGroup = (_, transform, x, y) => {
  const { target } = transform;
  if (target.type === 'activeSelection') {
    resizeHeightSelection(transform, { x, y });
  } else {
    switch (target.remotingsType) {
      case 'rectshape':
        resizeHeightRect(transform, { x, y });
        break;
      case 'circleshape':
        resizeHeightCircle(transform, { x, y });
        break;
      case 'text':
      case 'stickynote':
      default:
        break;
    }
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
  ml: createControl(-0.5, 0, resizeWidthGroup),
  mr: createControl(0.5, 0, resizeWidthGroup),
  mb: createControl(0, 0.5, resizeHeightGroup),
  mt: createControl(0, -0.5, resizeHeightGroup),
  tl: createControl(-0.5, -0.5, resizeWidthHeightGroup),
  tr: createControl(0.5, -0.5, resizeWidthHeightGroup),
  bl: createControl(-0.5, 0.5, resizeWidthHeightGroup),
  br: createControl(0.5, 0.5, resizeWidthHeightGroup),
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
