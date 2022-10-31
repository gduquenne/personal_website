import { fabric } from 'fabric';
import { lockItem, limitPosToBoard } from './Events';
import { setZindex } from '../Utils/ZIndexHandler';

const LineShape = ({ board, data, _id }) => {
  const line = new fabric.Line(data.linePoints, {
    _id,
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    customControls: [],
    lockMovementX: false,
    lockMovementY: false,
    lockState: false,
    objectCaching: false,
    perPixelTargetFind: true,
    remotingsType: 'lineshape',
    moveWithArrowKeys,
    setCustomControlsVisibility: visible =>
      setCustomControlsVisibility(visible, line, board),
    update: newDatas => update(board, line, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, line),
    resetPosForMessage: activeSelection =>
      resetPosForMessage(activeSelection, line),
    updatePoints: () =>
      line.set(
        calcNewPoints(line, line.left, line.top, line.width, line.height)
      ),
    setLock: () => {
      lockItem(line, board);
      updateLineFocus(line, board);
    },
    setFocusByOther: isFocusedByOther =>
      line.set('selectable', !isFocusedByOther),
    ...data,
    fbButtons: [
      'strokeWidth',
      'dashAndColour',
      'lock',
      'moreOptions',
      'groupObjects'
    ]
  });

  line.on('mousedown', handleMouseDown);
  line.on('mouseup', e => handleMouseUp(e, board));
  line.on('moving', e => handleMove(e, board));

  line.setControlsVisibility({
    bl: false,
    br: false,
    mb: false,
    ml: false,
    mr: false,
    mt: false,
    tl: false,
    tr: false,
    mtr: false
  });

  setZindex(line, board);
  board.add(line);
};

const moveWithArrowKeys = (obj, { posName, sizeName, max, value }) => {
  obj.set(posName, limitPosToBoard(obj[posName] + value, obj[sizeName], max));
  const { x1, y1, x2, y2, left, top, width, height, customControls } = obj;
  obj.set(calcNewPoints({ x1, y1, x2, y2 }, left, top, width, height));
  if (customControls.length !== 0) {
    customControls.forEach(control => {
      control.updateControl(
        null,
        obj[`x${control.index}`],
        obj[`y${control.index}`]
      );
    });
  }
};

/**
 * items are in activeSelection have left and top set compared
 * to the center of this lattest, so we need to convert datas
 * and updat ethe linePoints Array
 * @param {*} activeSelection is the selection in which the line is in
 * @param {*} line is the line
 */
const updatePosForMessage = (activeSelection, line) => {
  const {
    left: asLeft,
    top: asTop,
    width: asWidth,
    height: asHeight
  } = activeSelection;
  const { left, top, width, height } = line;
  let { x1, y1, x2, y2 } = line;
  line.pointsInSelection = calcNewPoints(
    { x1, y1, x2, y2 },
    left,
    top,
    width,
    height
  );
  const newLeft = asLeft + asWidth / 2 + left;
  const newTop = asTop + asHeight / 2 + top;
  ({ x1, y1, x2, y2 } = calcNewPoints(
    { x1, y1, x2, y2 },
    newLeft,
    newTop,
    width,
    height
  ));
  line.set({ x1, y1, x2, y2, left: newLeft, top: newTop });
};

const resetPosForMessage = ({ left, top }, line) => {
  const { x1, y1, x2, y2 } = line.pointsInSelection;
  line.set({ left, top, x1, y1, x2, y2 });
};

const handleMouseDown = e => {
  e.target.customControls.forEach(control => control.set('visible', false));
};

const handleMouseUp = (e, board) => {
  const { target } = e;
  if (!target.lockState) {
    target.customControls.forEach(control => {
      control.set('visible', true);
      control.updateControl(board.getZoom());
      board.setActiveObject(control);
    });
  }
};

const updateLineFocus = (line, board) => {
  const activeObj = board.getActiveObject();
  if (activeObj === line || activeObj.customControlTarget === line) {
    line.setCustomControlsVisibility(!line.lockState, line, board);
    line.setCoords();
    if (line.lockState) {
      board.setActiveObject(line);
    } else {
      line.customControls.forEach(control => {
        control.set('visible', true);
        control.updateControl(board.getZoom());
        board.setActiveObject(control);
      });
    }
  }
};

const calcNewPoints = ({ x1, y1, x2, y2 }, left, top, width, height) => {
  if (x1 < x2) {
    /**
     * means x1 left
     */
    x1 = left;
    x2 = left + width;
  } else {
    /**
     * means x2 left
     */
    x1 = left + width;
    x2 = left;
  }
  if (y1 < y2) {
    /**
     * means y1 top
     */
    y1 = top;
    y2 = top + height;
  } else {
    /**
     * means y2 top
     */
    y1 = top + height;
    y2 = top;
  }
  return { x1, y1, x2, y2 };
};

/**
 * basically only change left and top
 */
const handleMove = (e, board) => {
  const [maxX, maxY] = [3810, 2130];
  const { target } = e.transform;
  const {
    left: unreworkLeft,
    top: unreworkedTop,
    width,
    height,
    strokeWidth,
    customControls
  } = target;
  let { x1, y1, x2, y2 } = target;
  const left = Math.min(maxX - width, Math.max(-maxX, unreworkLeft));
  const top = Math.min(maxY - height, Math.max(-maxY, unreworkedTop));
  ({ x1, y1, x2, y2 } = calcNewPoints(
    { x1, y1, x2, y2 },
    left,
    top,
    width,
    height
  ));
  target.set({ x1, y1, x2, y2 });
  const radius = 5 / board.getZoom();
  customControls.forEach(control => {
    const { index } = control;
    control.set({
      visible: false,
      left: target[`x${index}`] - radius,
      top: target[`y${index}`] - radius + strokeWidth / 2
    });
  });
};

const setCustomControlsVisibility = (visible, line, board) => {
  if (visible) {
    if (!line.lockState) {
      line.customControls = initCustomTransformer(board, line);
      line.customControls.forEach(control => {
        board.add(control);
        board.setActiveObject(control);
      });
    }
  } else {
    line.customControls.forEach(control => board.remove(control));
    line.customControls = [];
  }
};

const initCustomTransformer = (board, line) => {
  const zoom = board.getZoom();
  const controls = [];
  const radius = 5;
  for (let i = 1; i <= 2; i += 1) {
    const control = new fabric.Circle({
      index: i,
      radius: radius / zoom,
      left: line[`x${i}`] - radius / zoom,
      top: line[`y${i}`] - radius / zoom + line.strokeWidth / 2,
      fill: 'white',
      stroke: '#869ee3',
      strokeWidth: 1 / zoom,
      customControlTarget: line,
      remotingsType: 'customControl',
      objectCaching: false,
      hasBorders: false,
      updateControl: (newZoom, newX, newY) => {
        if (!newZoom) {
          newZoom = zoom;
        }
        if (!newX) {
          newX = line[`x${i}`];
        }
        if (!newY) {
          newY = line[`y${i}`];
        }
        control.set({
          radius: radius / newZoom,
          left: newX - radius / newZoom,
          top: newY - radius / newZoom + line.strokeWidth / 2,
          strokeWidth: 1 / newZoom
        });
      }
    });
    control.setControlsVisibility({
      bl: false,
      br: false,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: false,
      tr: false,
      mtr: false
    });
    control.on('moving', e => handleTransform(e, line, board));
    controls.push(control);
  }
  return controls;
};

const handleTransform = (e, line, board) => {
  const { target } = e.transform;
  const { index, radius } = target;
  const mousePos = board.getPointer(e);
  target.set('left', mousePos.x - radius);
  target.set('top', mousePos.y - radius + line.strokeWidth / 2);
  line.set(`x${index}`, mousePos.x);
  line.set(`y${index}`, mousePos.y);
  board.fire('object:modified', { target: line });
};

const update = (board, obj, data) => {
  const [x1, y1, x2, y2] = data.linePoints;
  obj.set({ ...data, x1, y1, x2, y2 });
  board.requestRenderAll();
};

export default LineShape;
