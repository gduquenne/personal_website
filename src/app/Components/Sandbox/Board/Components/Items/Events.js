/*
 * #########################################################################
 * #                                                                       #
 * #                                 EVENTS                                #
 * #                                                                       #
 * #########################################################################
 */
const availableFontSize = [
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

const handleMouseDblClick = (e, board) => {
  const { target } = e;
  const { _objects: items } = target;
  ungroup(board, target);
  focusText(board, items[1], 'all');
};

const resetNewControlOrigin = e => {
  e.target.newControlOrigin = [];
};

const moveWithArrowKeys = (
  obj,
  { posName, sizeName, scaleName, max, value }
) => {
  if (!obj.lockState) {
    obj.set(
      posName,
      limitPosToBoard(obj[posName] + value, obj[sizeName] * obj[scaleName], max)
    );
  }
};
const limitPosToBoard = (newPos, size, max) =>
  Math.min(max - size, Math.max(-max, newPos));

const handleMove = (e, board) => {
  /**
   * 30px treshold each side for min max
   */
  const zoom = board.getZoom();
  const [maxX, maxY] = [3810, 2130];
  const { target } = e.transform;
  const { left, top, width, height, padding, scaleX, scaleY } = target;
  let grid;
  if (zoom > 1.3) {
    grid = 40;
  } else if (zoom > 0.8) {
    grid = 80;
  } else {
    grid = 160;
  }

  const boundingWidthInBoard =
    (target.getBoundingRect().width - padding * 2) / zoom;
  const widthDiff = boundingWidthInBoard - width * scaleX;

  const boundingHeightInBoard =
    (target.getBoundingRect().height - padding * 2) / zoom;
  const heightDiff = boundingHeightInBoard - height * scaleY;

  let newLeft;
  let newTop;
  if (
    Math.round((left / grid) * 4) % 4 === 0 &&
    Math.round((top / grid) * 4) % 4 === 0
  ) {
    newLeft = Math.round(left / grid) * grid;
    newTop = Math.round(top / grid) * grid;
  } else {
    newLeft = left;
    newTop = top;
  }

  target.set({
    left: Math.round(
      Math.min(
        maxX - boundingWidthInBoard + widthDiff,
        Math.max(-maxX + widthDiff, newLeft)
      )
    ),
    top: Math.round(
      Math.min(
        maxY - boundingHeightInBoard + heightDiff,
        Math.max(-maxY + heightDiff, newTop)
      )
    )
  });
  target.setCoords();
};

const calcTopCountingVerticalAlign = (shape, text) => {
  const { top, height, strokeWidth } = shape;
  const { verticalAlign, __lineHeights } = text;
  const textTopPadding = text.calcPadding(height, strokeWidth);
  let textHeight = 0;
  __lineHeights.forEach(lineHeight => (textHeight += lineHeight));
  if (verticalAlign === 'bottom') {
    return top + height - textHeight - textTopPadding + strokeWidth;
  } else if (verticalAlign === 'middle') {
    return top + height / 2 - textHeight / 2 + strokeWidth / 2;
  } else {
    return top + textTopPadding;
  }
};

const enterEditingEmptyTextOptions = text => {
  if (text.fontSize === 0) {
    text.set('fontSize', text.prevFont);
  }
};

const exitEditingEmptyTextOptions = text => {
  if (text.text === '') {
    text.set({ fontSize: 0, prevFont: text.fontSize });
  }
};

const handleTextKeyDown = (e, board, [rect, text]) => {
  switch (e.key) {
    case 'ArrowLeft':
      text.moveCursorLeft(() => null);
      break;
    case 'ArrowRight':
      text.moveCursorRight(() => null);
      break;
    case 'ArrowUp':
      text.moveCursorUp(() => null);
      break;
    case 'ArrowDown':
      text.moveCursorDown(() => null);
      break;
    default:
      break;
  }

  text.set('top', calcTopCountingVerticalAlign(rect, text));
  if (e.key === 'Escape') {
    board.discardActiveObject().renderAll();
  }
};

const handleTextKeyUp = (board, [rect, text]) => {
  adaptFontSize(board, rect, text);
  text.set('top', calcTopCountingVerticalAlign(rect, text));
  board.requestRenderAll();
};

const calcPadding = (shapeSize, shapeStrokeWidth) =>
  (5 * shapeSize) / 150 + shapeStrokeWidth;

/*
 * #########################################################################
 * #                                                                       #
 * #                                 UTILS                                 #
 * #                                                                       #
 * #########################################################################
 */

const ungroup = (board, group) => {
  const items = group._objects;
  group._restoreObjectsState();
  items[1].oldGroup = group;
  group.left = -group.width / 2;
  group.top = -group.height / 2;
  const strObjectRemoved = 'object:removed';
  const [eventObjRemoved] = board.__eventListeners[strObjectRemoved];
  board.off(strObjectRemoved);
  board.remove(group);
  board.on(strObjectRemoved, eventObjRemoved);
  items.forEach(item => board.add(item));
  board.renderAll();
};

const regroup = (board, items, _id, initGroup) => {
  const data = { angle: items[0].angle };
  items.forEach(item => {
    board.remove(item);
    item.set({ angle: 0 });
  });
  items[1].oldGroup = null;
  const group = initGroup(board, items, data, undefined);
  board.add(group);
  group._id = _id;
  board.fire('object:modified', { target: group });
};

const focusText = (board, text, caretPos) => {
  board.setActiveObject(text);
  text.enterEditing();
  if (caretPos === 'all') {
    text.selectAll();
  }
};

const setGroupFocusedByOther = (board, group, isFocusedByOther) => {
  if (isFocusedByOther) {
    group.set('selectable', false);
    group.off('mousedblclick');
  } else {
    group.set('selectable', true);
    group.on('mousedblclick', e => handleMouseDblClick(e, board));
  }
};

const lockMouseDblClick = (group, board) => {
  /**
   * if is group, means that there is a text editable
   * which should editable or not depending on lockstate
   */
  if (group.lockState) {
    group.off('mousedblclick');
  } else {
    const mousedblclickEventFuncs = group.__eventListeners['mousedblclick'];
    if (
      !mousedblclickEventFuncs ||
      (mousedblclickEventFuncs && !mousedblclickEventFuncs[0])
    ) {
      group.on('mousedblclick', e => handleMouseDblClick(e, board));
    }
  }
};
const getControllerBorderColor = lockState => {
  if (lockState) {
    return 'red';
  } else {
    return 'rgba(178,204,255,1)';
  }
};

const lockItem = (obj, board) => {
  const lockState = !obj.lockState;
  const lockProperties = {
    lockState,
    lockMovementX: lockState,
    lockMovementY: lockState,
    lockScaling: lockState,
    lockRotation: lockState,
    hasControls: !lockState,
    borderColor: getControllerBorderColor(lockState)
  };
  obj.set({ ...lockProperties });
  if (obj.type === 'group') {
    lockMouseDblClick(obj, board);
  }
  board.requestRenderAll();
  board.fire('object:modified', { target: obj });
};

const adaptFontSize = (board, rect, text) => {
  const maxHeight = rect.height - text.calcPadding(rect.height, 0) * 2;
  let index = availableFontSize.indexOf(text.fontSize);
  if (index === -1) {
    for (let i = 0; i < availableFontSize.length; i += 1) {
      if (text.fontSize < availableFontSize[i]) {
        index = i;
      }
    }
    if (index === -1) {
      index = availableFontSize.length;
    }
  }
  while (text.height > maxHeight && index !== 0) {
    index -= 1;
    text.fontSize = availableFontSize[index];
    board.renderAll();
  }
};

const updatePosForMessage = (activeSelection, obj) => {
  const {
    left: asLeft,
    top: asTop,
    width: asWidth,
    height: asHeight
  } = activeSelection;
  const { left, top } = obj;
  obj.set({
    left: left + asLeft + asWidth / 2,
    top: top + asTop + asHeight / 2
  });
};

const updateGroup = (board, group, items, { objects, ...data }) => {
  items[0].set({ ...objects[0] });
  items[1].set({ ...objects[1] });
  group.set({ ...data });
  if (group.selectable) {
    lockMouseDblClick(group, board);
  }
  board.requestRenderAll();
};

export {
  regroup,
  handleTextKeyUp,
  handleTextKeyDown,
  handleMove,
  resetNewControlOrigin,
  handleMouseDblClick,
  lockItem,
  calcTopCountingVerticalAlign,
  updatePosForMessage,
  updateGroup,
  enterEditingEmptyTextOptions,
  exitEditingEmptyTextOptions,
  calcPadding,
  limitPosToBoard,
  moveWithArrowKeys,
  setGroupFocusedByOther
};
