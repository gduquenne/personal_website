import { fabric } from 'fabric';
import { lockItem } from './Events';
import { setZindex } from '../Utils/ZIndexHandler';

const getX1Y1X2Y2 = ({ points }) => {
  return {
    x1: points[0].x,
    y1: points[0].y,
    x2: points[1].x,
    y2: points[1].y
  };
};
// TODO: add moveWithArrowKeys

const ArrowShape = ({ board, data, _id }) => {
  const [x1, y1, x2, y2] = data.linePoints;
  const arrowPoints = setArrowPoints({ x1, y1, x2, y2 });
  const arrow = new fabric.Polyline(arrowPoints, {
    _id,
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    customControls: [],
    objectCaching: false,
    lockState: false,
    perPixelTargetFind: true,
    remotingsType: 'arrowshape',
    setCustomControlsVisibility: visible =>
      setCustomControlsVisibility(visible, arrow, board),
    update: newDatas => update(board, arrow, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, arrow),
    resetPosForMessage: pos => resetPosForMessage(pos, arrow),
    updatePoints: () =>
      arrow.set(
        calcNewPoints(
          getX1Y1X2Y2(arrow),
          arrow.left,
          arrow.top,
          arrow.width,
          arrow.height
        )
      ),
    setLock: () => {
      lockItem(arrow, board);
      updateLineFocus(arrow, board);
    },
    setFocusByOther: isFocusedByOther =>
      arrow.set('selectable', !isFocusedByOther),
    ...data,
    fbButtons: [
      'strokeWidth',
      'dashAndColour',
      'lock',
      'moreOptions',
      'groupObjects'
    ]
  });

  arrow.on('mousedown', handleMouseDown);
  arrow.on('mouseup', e => handleMouseUp(e, board));
  arrow.on('moving', handleMove);
  arrow.on('moved', e => handleMoved(e, board));

  arrow.setControlsVisibility({
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

  setZindex(arrow, board);
  board.add(arrow);
};

const handleMoved = (e, board) => {
  const { target, transform } = e;
  const { left: originalLeft, top: originalTop } = transform.original;
  const leftDiff = target.left - originalLeft;
  const topDiff = target.top - originalTop;
  const { points } = target;
  const x1 = points[0].x + leftDiff;
  const y1 = points[0].y + topDiff;
  const x2 = points[1].x + leftDiff;
  const y2 = points[1].y + topDiff;
  target.set({
    points: setArrowPoints({ x1, y1, x2, y2 }),
    left: target.startCoords[0],
    top: target.startCoords[1]
  });
  board.requestRenderAll();
};

const setArrowPoints = ({ x1, y1, x2, y2 }) => {
  const angle = calcNewAngle({ x1, y1, x2, y2 });
  const headlen = 8;
  return [
    {
      x: x1,
      y: y1
    },
    {
      x: x2,
      y: y2
    },
    {
      x: x2 - headlen * Math.cos(angle - Math.PI / 2),
      y: y2 - headlen * Math.sin(angle - Math.PI / 2)
    },
    {
      x: x2 + headlen * Math.cos(angle),
      y: y2 + headlen * Math.sin(angle)
    },
    {
      x: x2 - headlen * Math.cos(angle + Math.PI / 2),
      y: y2 - headlen * Math.sin(angle + Math.PI / 2)
    },
    {
      x: x2,
      y: y2
    }
  ];
};

const calcNewAngle = ({ x1, y1, x2, y2 }) => {
  const width = Math.abs(Math.max(x1, x2) - Math.min(x1, x2));
  const height = Math.abs(Math.max(y1, y2) - Math.min(y1, y2));
  let theta;
  if (x1 < x2 && y1 < y2) {
    theta = Math.atan(height / width);
  } else if (x1 < x2 && y1 >= y2) {
    theta = Math.atan(-height / width);
  } else if (x1 >= x2 && y1 < y2) {
    theta = Math.abs(Math.atan(height / width) - Math.PI);
  } else {
    theta = Math.abs(Math.atan(-height / width) - Math.PI);
  }
  return theta;
};

/**
 * items are in activeSelection have left and top set compared
 * to the center of this lattest, so we need to convert datas
 * and updat ethe linePoints Array
 * @param {*} activeSelection is the selection in which the arrow is in
 * @param {*} arrow is the arrow
 */
const updatePosForMessage = (activeSelection, arrow) => {
  const {
    left: asLeft,
    top: asTop,
    width: asWidth,
    height: asHeight
  } = activeSelection;
  const { left, top, width, height } = arrow;
  let { x1, y1, x2, y2 } = getX1Y1X2Y2(arrow);
  arrow.pointsInSelection = calcNewPoints(
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
  arrow.set({
    points: setArrowPoints({ x1, y1, x2, y2 }),
    left: newLeft,
    top: newTop
  });
};

const resetPosForMessage = ({ left, top }, arrow) => {
  const { x1, y1, x2, y2 } = arrow.pointsInSelection;
  arrow.set({ points: setArrowPoints({ x1, y1, x2, y2 }), left, top });
};

const handleMouseDown = e => {
  e.target.customControls.forEach(control => control.set('visible', false));
};

const updateControls = (target, board) => {
  target.customControls.forEach(control => {
    control.set('visible', true);
    control.updateControl(board.getZoom());
    board.setActiveObject(control);
  });
};

const handleMouseUp = (e, board) => {
  const { target } = e;
  if (!target.lockState) {
    updateControls(target, board);
  }
};

const setCustomControlsVisibility = (visible, obj, board) => {
  if (visible) {
    if (!obj.lockState) {
      obj.customControls = initCustomTransformer(board, obj);
      obj.customControls.forEach(control => {
        board.add(control);
        board.setActiveObject(control);
      });
    }
  } else {
    obj.customControls.forEach(control => board.remove(control));
    obj.customControls = [];
  }
};

const updateLineFocus = (obj, board) => {
  const activeObj = board.getActiveObject();
  if (activeObj === obj || activeObj.customControlTarget === obj) {
    obj.setCustomControlsVisibility(!obj.lockState);
    obj.setCoords();
    if (obj.lockState) {
      board.setActiveObject(obj);
    } else {
      updateControls(obj, board);
    }
  }
};

const handleTransform = (e, arrow, board) => {
  const { target } = e.transform;
  const { index, radius } = target;
  const mousePos = board.getPointer(e);
  target.set('left', mousePos.x - radius);
  target.set('top', mousePos.y - radius + arrow.strokeWidth / 2);
  const points = arrow.points;
  points[index].x = mousePos.x;
  points[index].y = mousePos.y;
  arrow.set('points', setArrowPoints(getX1Y1X2Y2({ points })));
  board.fire('object:modified', { target: arrow });
};

const initCustomTransformer = (board, arrow) => {
  const zoom = board.getZoom();
  const controls = [];
  const radius = 5;
  for (let i = 0; i <= 1; i += 1) {
    const { x, y } = arrow.points[i];
    const control = new fabric.Circle({
      index: i,
      radius: radius / zoom,
      left: x - radius / zoom,
      top: y - radius / zoom + arrow.strokeWidth / 2,
      fill: 'white',
      stroke: '#869ee3',
      strokeWidth: 1 / zoom,
      customControlTarget: arrow,
      remotingsType: 'customControl',
      objectCaching: false,
      hasBorders: false,
      updateControl: newZoom =>
        control.set({
          radius: radius / newZoom,
          left: arrow.points[i].x - radius / newZoom,
          top: arrow.points[i].y - radius / newZoom + arrow.strokeWidth / 2,
          strokeWidth: 1 / newZoom
        })
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
    control.on('moving', e => handleTransform(e, arrow, board));
    controls.push(control);
  }
  return controls;
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
const handleMove = e => {
  const { target } = e.transform;
  const [maxX, maxY] = [3810, 2130];
  const { left: unreworkLeft, top: unreworkedTop, width, height } = target;
  const left = Math.min(maxX - width, Math.max(-maxX, unreworkLeft));
  const top = Math.min(maxY - height, Math.max(-maxY, unreworkedTop));
  target.set({ left, top });
};

const update = (board, obj, data) => {
  const [x1, y1, x2, y2] = data.linePoints;
  obj.set({ ...data, points: setArrowPoints({ x1, y1, x2, y2 }) });
  board.requestRenderAll();
};

export default ArrowShape;
