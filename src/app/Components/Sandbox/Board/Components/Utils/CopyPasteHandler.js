const copyItems = board => {
  let clone;
  const objects = board.getActiveObject();
  if (
    !objects ||
    (objects.remotingsType === 'text' && objects.isEditing === true)
  ) {
    return undefined;
  }
  if (objects.type === 'activeSelection') {
    clone = [];
    objects._objects.forEach(item => {
      const newItem = { ...item.toJSON(), remotingsType: item.remotingsType };
      clone.push(newItem);
    });
  } else {
    if (objects.customControlTarget) {
      clone = {
        ...objects.customControlTarget.toJSON(),
        remotingsType: objects.customControlTarget.remotingsType
      };
    } else {
      clone = { ...objects.toJSON(), remotingsType: objects.remotingsType };
    }
    clone.top = 0;
    clone.left = 0;
    clone = [clone];
  }
  return clone;
};

const pasteItems = (board, _clipboard, position, createItem, getNextId) => {
  const active = board.getActiveObject();
  if (
    _clipboard &&
    (!active ||
      active.remotingsType !== 'text' ||
      (active.remotingsType === 'text' && active.isEditing === false))
  ) {
    _clipboard.forEach(item => {
      const { left, width, scaleX, top, height, scaleY } = item;
      const newLeft = left + position.x - (width * scaleX) / 2;
      const newTop = top + position.y - (height * scaleY) / 2;
      const newItem = { ...item, left: newLeft, top: newTop };
      if (['lineshape', 'arrowshape'].includes(item.remotingsType)) {
        let { x1, y1, x2, y2 } = item;
        if (x1 < x2) {
          x1 = newLeft;
          x2 = newLeft + width * scaleX;
        } else {
          x1 = newLeft + width * scaleX;
          x2 = newLeft;
        }
        if (y1 < y2) {
          y1 = newTop;
          y2 = newTop + height * scaleY;
        } else {
          y1 = newTop + height * scaleY;
          y2 = newTop;
        }
        newItem.linePoints = [x1, y1, x2, y2];
      }
      createItem(board, newItem, getNextId, true);
    });
  }
};

export { copyItems, pasteItems };
