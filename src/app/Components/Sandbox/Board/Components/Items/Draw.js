import { fabric } from 'fabric';
import { lockItem, updatePosForMessage, moveWithArrowKeys } from './Events';
import { setZindex } from '../Utils/ZIndexHandler';

const Draw = ({ board, data, _id }) => {
  const cleanedData = cleanData(data);
  const path = new fabric.Path(cleanedData.stringPath, {
    _id,
    padding: 7,
    cornerStrokeColor: '#869ee3',
    cornerSize: 10,
    cornerColor: 'white',
    transparentCorners: false,
    cornerStyle: 'circle',
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    lockMovementX: false,
    lockMovementY: false,
    perPixelTargetFind: true,
    lockState: false,
    objectCaching: false,
    remotingsType: 'draw',
    moveWithArrowKeys,
    update: newDatas => update(board, path, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, path),
    resetPosForMessage: ({ left, top }) => path.set({ left, top }),
    setLock: () => lockItem(path, board),
    setFocusByOther: isFocusedByOther =>
      path.set('selectable', !isFocusedByOther),
    ...cleanedData,
    fbButtons: [
      'strokeWidth',
      'dashAndColour',
      'lock',
      'moreOptions',
      'groupObjects'
    ]
  });
  path.setControlsVisibility({
    bl: true,
    br: true,
    mb: false,
    ml: false,
    mr: false,
    mt: false,
    tl: true,
    tr: true,
    mtr: true
  });
  setZindex(path, board);
  board.add(path);
};

const cleanData = ({
  left,
  top,
  scaleX,
  scaleY,
  angle,
  strokeLineCap,
  strokeLineJoin,
  strokeWidth,
  stroke,
  path,
  groupIndex
}) => {
  return {
    left,
    top,
    scaleX,
    scaleY,
    angle,
    strokeLineCap,
    strokeLineJoin,
    strokeWidth,
    stroke,
    groupIndex,
    fill: null,
    stringPath: getPathString(path)
  };
};

const getPathString = path => {
  let pathString = '';
  path.forEach(instructArray => (pathString += instructArray.join(' ')));
  return pathString;
};

const update = (board, path, data) => {
  path.set({ ...data });
  board.requestRenderAll();
};

export default Draw;
