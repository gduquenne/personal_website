import { fabric } from 'fabric';
import COLORS from './Colors';

const MIN_STICKY = [20, 20];
const STANDARD_STICKY = [160, 160];
const MIN_RECT = [10, 10];
const STANDARD_RECT = [160, 160];
const MIN_CIRCLE = [5, 5];
const STANDARD_CIRCLE = [80, 80];
const STANDARD_TEXT = 32;
const MIN_IMAGE = [100, 100];
const STANDARD_IMAGE = [160, 160];
const AVAILABLE_FONTSIZE = [
  4,
  6,
  8,
  10,
  12,
  14,
  18,
  24,
  32,
  36,
  48,
  64,
  80,
  144,
  288
];

/**
 * createRectDimensioner creates a fabric rect
 * @param {*} specProps is an object containing properties to be specified
 * @returns a fabric rect
 */
const createRectDimensioner = specProps => {
  return new fabric.Rect({
    ...specProps,
    width: 0,
    height: 0,
    startLeft: specProps.left,
    startTop: specProps.top,
    isDimensioner: true
  });
};

/**
 * startDimensionningItem is the 1/3 step of pre dimensionning an item
 * creates the ephemeral shape for pre dimensionning and add it to the board
 * @param {*} board is the board
 * @param {*} itemCreation is an object containing
 */
const startDimensionningItem = (board, itemCreation) => {
  if (itemCreation?.remotingsType) {
    const { remotingsType, type } = itemCreation;
    const black = 'rgba(0,0,0,1)';
    const transparent = 'rgba(0,0,0,0)';
    let { x: left, y: top } = board.getPointer();
    left = Math.round(left);
    top = Math.round(top);
    board.selection = false;
    switch (remotingsType) {
      case 'stickynote':
        board.add(
          createRectDimensioner({
            remotingsType,
            left,
            top,
            fill: type
          })
        );
        break;
      case 'rectshape':
        board.add(
          createRectDimensioner({
            remotingsType,
            left,
            top,
            fill: COLORS.white,
            stroke: COLORS.christmasblue,
            strokeWidth: 2
          })
        );
        break;
      case 'imageshape':
      case 'text':
        board.add(
          createRectDimensioner({
            remotingsType,
            left,
            top,
            fill: transparent,
            stroke: black,
            strokeWidth: 1
          })
        );
        break;
      case 'frameshape':
        board.add(
          createRectDimensioner({
            remotingsType,
            left,
            top,
            type,
            fill: transparent,
            stroke: COLORS.remotingsBlue,
            strokeWidth: 1
          })
        );
        break;
      case 'circleshape':
        board.add(
          new fabric.Ellipse({
            remotingsType,
            left,
            top,
            fill: COLORS.white,
            stroke: COLORS.christmasblue,
            strokeWidth: 2,
            rx: 0,
            ry: 0,
            originX: 'center',
            originY: 'center',
            isDimensioner: true
          })
        );
        break;
      case 'lineshape':
      case 'arrowshape':
        board.add(
          new fabric.Line([left, top, left, top], {
            remotingsType,
            stroke: COLORS.christmasblue,
            strokeWidth: 2,
            strokeDashArray: [],
            isDimensioner: true
          })
        );
        break;
      default:
        break;
    }
  }
};

const dimensionningText = ({ x, y }, dimensioner, minHeight) => {
  let { height: preCalculatedHeight, top, left } = dimensionningBasicRect(
    { x, y },
    dimensioner,
    [minHeight * 10, minHeight]
  );
  const { startTop, startLeft } = dimensioner;
  const height = Math.min(
    (3840 - left) / 10,
    Math.max(preCalculatedHeight, minHeight)
  );
  const width = height * 10;
  if (top !== startTop) {
    top = startTop - height;
  }
  if (left !== startLeft) {
    left = startLeft - width;
  }

  return { left, top, width, height };
};

const dimensionningCircle = (
  { x, y },
  { left, top },
  [minWidth, minHeight]
) => {
  return {
    rx: Math.max(minWidth, Math.abs(x - left)),
    ry: Math.max(minHeight, Math.abs(y - top))
  };
};

/**
 * @param {*} param0 coords of mouse in the board coordinates system
 * @param {*} dimensioner simple shape used to show dimensions of the future item
 * @param {*} minSize the minimum sizes ([width, height]) of the shape
 * @returns {*} {width, height, left, top}
 */
const dimensionningBasicRect = (
  { x, y },
  dimensioner,
  [minWidth, minHeight]
) => {
  const { startLeft, startTop } = dimensioner;
  let left;
  let width;
  let top;
  let height;
  if (x < startLeft) {
    if (x >= startLeft - minWidth) {
      left = startLeft - minWidth;
      width = minWidth;
    } else {
      left = x;
      width = Math.abs(startLeft - x);
    }
  } else {
    left = startLeft;
    if (x <= startLeft + minWidth) {
      width = minWidth;
    } else {
      width = Math.abs(x - startLeft);
    }
  }
  if (y < startTop) {
    if (y >= startTop - minHeight) {
      top = startTop - minHeight;
      height = minHeight;
    } else {
      top = y;
      height = Math.abs(startTop - y);
    }
  } else {
    top = startTop;
    if (y <= startTop + minHeight) {
      height = minHeight;
    } else {
      height = Math.abs(y - startTop);
    }
  }
  return { left, top, width, height };
};

/**
 * stickynotes have the spec to be a square, so height and width are similar
 * @param {*} param0 coords of mouse in the board coordinates system
 * @param {*} dimensioner simple shape used to show dimensions of the future item
 * @param {*} minSize the minimum sizes ([width, height]) of the shape
 * @returns {*} {width, height, left, top}
 */
const dimensionningSquare = ({ x, y }, dimensioner, minSize) => {
  let { left, top, width, height } = dimensionningBasicRect(
    { x, y },
    dimensioner,
    minSize
  );
  const { startTop, startLeft } = dimensioner;
  if (width > height) {
    height = width;
    if (top !== startTop) {
      top = startTop - height;
    }
  } else {
    width = height;
    if (left !== startLeft) {
      left = startLeft - width;
    }
  }
  return { left, top, width, height };
};

const dimensionningFrame = ({ x, y }, dimensioner, minSize) => {
  switch (dimensioner.type) {
    case 0:
      return dimensionningBasicRect({ x, y }, dimensioner, minSize);
    case 1:
      return dimensionningSquare({ x, y }, dimensioner, minSize);
    case 3:
      return dimensionningKeepingRatio(
        { x, y },
        dimensioner,
        minSize[0],
        16 / 9
      );
    default:
      return {};
  }
};

const dimensionningKeepingRatio = ({ x, y }, dimensioner, minWidth, ratio) => {
  const minHeight = minWidth / ratio;
  const { startLeft, startTop } = dimensioner;
  let left;
  let width;
  let top;
  let height;
  if (x < startLeft) {
    if (x >= startLeft - minWidth) {
      left = startLeft - minWidth;
      width = minWidth;
      height = minHeight;
    } else {
      left = x;
      width = Math.abs(startLeft - x);
      height = width / ratio;
    }
  } else {
    left = startLeft;
    if (x <= startLeft + minWidth) {
      width = minWidth;
      height = minHeight;
    } else {
      width = Math.abs(x - startLeft);
      height = width / ratio;
    }
  }
  if (y < startTop) {
    if (y >= startTop - minHeight) {
      top = startTop - minHeight;
    } else {
      top = startTop - height;
    }
  } else {
    top = startTop;
  }
  return { left, top, width, height };
};

const dimensionningItem = board => {
  const dimensioner = board.getObjects().filter(obj => obj.isDimensioner)[0];
  if (dimensioner) {
    const { remotingsType } = dimensioner;
    const { x, y } = board.getPointer();
    let data;
    switch (remotingsType) {
      case 'rectshape':
        data = dimensionningBasicRect({ x, y }, dimensioner, MIN_RECT);
        break;
      case 'imageshape':
        data = dimensionningBasicRect({ x, y }, dimensioner, MIN_IMAGE);
        break;
      case 'frameshape':
        data = dimensionningFrame({ x, y }, dimensioner, MIN_IMAGE);
        break;
      case 'text':
        data = dimensionningText({ x, y }, dimensioner, AVAILABLE_FONTSIZE[0]);
        break;
      case 'stickynote':
        data = dimensionningSquare({ x, y }, dimensioner, MIN_STICKY);
        break;
      case 'circleshape':
        data = dimensionningCircle({ x, y }, dimensioner, MIN_CIRCLE);
        break;
      case 'lineshape':
      case 'arrowshape':
        data = { x2: Math.round(x), y2: Math.round(y) };
        break;
      default:
        break;
    }
    if (data.left) {
      data.left = Math.round(data.left);
      data.top = Math.round(data.top);
    }
    dimensioner.set({ ...data });
    board.requestRenderAll();
  }
};

const endDimensionningBasicRect = (
  dimensioner,
  [minWidth, minHeight],
  [standardWidth, standardHeight]
) => {
  const { width: currentWidth, height: currentHeight, left, top } = dimensioner;
  let width;
  let height;
  if (
    currentWidth < minWidth ||
    currentHeight < minHeight ||
    (currentWidth === minWidth && currentHeight === minHeight)
  ) {
    /**
     * means that user simple clicked to add the item
     */
    width = standardWidth;
    height = standardHeight;
  } else {
    width = Math.round(currentWidth);
    height = Math.round(currentHeight);
  }
  const { finalLeft, finalTop } = getFinalPos(
    width === standardWidth && height === standardHeight,
    { left, top, width, height }
  );
  return { width, height, left: finalLeft, top: finalTop };
};

const endDimensionningGroupObjects = (
  width,
  height,
  fill,
  fontSize,
  fontColor,
  specRectProps
) => [
  { width, height, fill, ...specRectProps },
  { fontSize, fill: fontColor }
];

const endDimensionningGroupRect = (
  dimensioner,
  min,
  [standardWidth, standardHeight],
  fontColor,
  specRectProps
) => {
  const { width, height, left, top } = endDimensionningBasicRect(
    dimensioner,
    min,
    [standardWidth, standardHeight]
  );
  const fontSize = calcFontSize(standardWidth, standardHeight, width, height);
  return {
    left,
    top,
    width,
    height,
    objects: endDimensionningGroupObjects(
      width,
      height,
      dimensioner.fill,
      fontSize,
      fontColor,
      specRectProps
    )
  };
};

const endDimensionningText = (dimensioner, standardHeight) => {
  const { height: currentHeight, left, top } = dimensioner;
  let height;
  if (currentHeight <= AVAILABLE_FONTSIZE[0]) {
    height = standardHeight;
  } else {
    height = currentHeight;
  }
  /**
   * 10px width for 1px fontSize
   */
  height = Math.round(Math.min((3840 - left) / 10, height));
  const width = height * 10;
  const { finalLeft, finalTop } = getFinalPos(height === standardHeight, {
    left,
    top,
    width,
    height
  });
  return {
    width,
    fontSize: height,
    left: finalLeft,
    top: finalTop
  };
};

const getFinalPos = (
  conditionToMiddleMousePos,
  { left, top, width, height }
) => {
  if (conditionToMiddleMousePos) {
    return {
      finalLeft: Math.round(left - width / 2),
      finalTop: Math.round(top - height / 2)
    };
  } else {
    return { finalLeft: left, finalTop: top };
  }
};

const calcFontSize = (standardWidth, standardHeight, width, height) => {
  const fontSizeRatio = 36 / (standardWidth * standardHeight);
  const calculatedFontSize = Math.floor(fontSizeRatio * (width * height));
  const closestToCalculated = AVAILABLE_FONTSIZE.reduce((prev, curr) => {
    if (
      Math.abs(curr - calculatedFontSize) < Math.abs(prev - calculatedFontSize)
    ) {
      return curr;
    } else {
      return prev;
    }
  });
  return Math.max(closestToCalculated, AVAILABLE_FONTSIZE[0]);
};

const endDimensionningCircle = (
  dimensioner,
  [minWidth, minHeight],
  [standardWidth, standardHeight]
) => {
  const {
    fill,
    stroke,
    strokeWidth,
    left: currentLeft,
    top: currentTop,
    rx: currentRx,
    ry: currentRy
  } = dimensioner;
  let rx;
  let ry;
  if (
    currentRx < minWidth ||
    currentRy < minHeight ||
    (currentRy === minHeight && currentRx === minWidth)
  ) {
    /**
     * means that user simple clicked to add the item
     */
    rx = standardWidth;
    ry = standardHeight;
  } else {
    rx = Math.round(currentRx);
    ry = Math.round(currentRy);
  }
  const fontSize = calcFontSize(standardWidth, standardHeight, rx, ry);
  const left = currentLeft - rx;
  const top = currentTop - ry;
  const objects = [
    { rx, ry, fill, stroke, strokeWidth },
    { fontSize, fill: COLORS.black }
  ];
  return {
    left,
    top,
    objects
  };
};

const endDimensionningLine = dimensioner => {
  const { x1, y1, y2, stroke, strokeWidth, strokeDashArray } = dimensioner;
  let { x2 } = dimensioner;
  if (Math.abs(x2 - x1) < 5 && Math.abs(y2 - y1) < 5) {
    x2 += 10;
  }
  return {
    linePoints: [x1, y1, x2, y2],
    stroke,
    strokeWidth,
    strokeDashArray
  };
};

const endDimensionningFrame = (dimensioner, minSize, standardSize) => {
  let standardSizeAdaptedToRatio;
  let minSizeAdaptedToRatio;
  switch (dimensioner.type) {
    case 3:
      minSizeAdaptedToRatio = [minSize[0], (minSize[0] * 9) / 16];
      standardSizeAdaptedToRatio = [
        standardSize[0],
        (standardSize[0] * 9) / 16
      ];
      break;
    case 0:
    case 1:
    default:
      minSizeAdaptedToRatio = minSize;
      standardSizeAdaptedToRatio = standardSize;
      break;
  }
  return endDimensionningBasicRect(
    dimensioner,
    minSizeAdaptedToRatio,
    standardSizeAdaptedToRatio
  );
};

const endDimensionningItem = board => {
  const dimensioner = board.getObjects().filter(obj => obj.isDimensioner)[0];
  if (dimensioner) {
    const { remotingsType } = dimensioner;
    let data;
    switch (remotingsType) {
      case 'rectshape':
        data = endDimensionningGroupRect(
          dimensioner,
          MIN_RECT,
          STANDARD_RECT,
          COLORS.black,
          { stroke: dimensioner.stroke, strokeWidth: 2 }
        );
        break;
      case 'stickynote':
        data = endDimensionningGroupRect(
          dimensioner,
          MIN_STICKY,
          STANDARD_STICKY,
          COLORS.black
        );
        break;
      case 'text':
        data = endDimensionningText(dimensioner, STANDARD_TEXT);
        break;
      case 'imageshape':
        data = endDimensionningBasicRect(
          dimensioner,
          MIN_IMAGE,
          STANDARD_IMAGE
        );
        break;
      case 'frameshape':
        data = endDimensionningFrame(dimensioner, MIN_IMAGE, STANDARD_IMAGE);
        break;
      case 'circleshape':
        data = endDimensionningCircle(dimensioner, MIN_CIRCLE, STANDARD_CIRCLE);
        break;
      case 'lineshape':
      case 'arrowshape':
        data = endDimensionningLine(dimensioner);
        break;
      default:
        break;
    }
    board.remove(dimensioner);
    board.skipTargetFind = false;
    return data;
  } else {
    return undefined;
  }
};

export { startDimensionningItem, dimensionningItem, endDimensionningItem };
