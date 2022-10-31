import { fabric } from 'fabric';
import { _wrapLine } from '../FabricPrototypes/initTextBox';
import COLORS from '../Utils/Colors';
import { controls } from '../Utils/CustomControls/GroupControls';
import { setZindex } from '../Utils/ZIndexHandler';
import {
  handleMouseDblClick,
  resetNewControlOrigin,
  handleMove,
  handleTextKeyDown,
  handleTextKeyUp,
  regroup,
  lockItem,
  calcTopCountingVerticalAlign,
  updatePosForMessage,
  updateGroup,
  enterEditingEmptyTextOptions,
  exitEditingEmptyTextOptions,
  calcPadding,
  moveWithArrowKeys,
  setGroupFocusedByOther
} from './Events';

const CircleShape = ({ board, data, _id }) => {
  fabric.util.object.extend(fabric.Textbox.prototype, { _wrapLine });
  fabric.util.object.extend(fabric.Group.prototype, { controls });
  const shadow = new fabric.Shadow({
    color: 'rgba(0, 0, 0, 0)',
    offsetX: 0,
    offsetY: 10,
    blur: 5
  });
  let timeout = null;
  const ellipse = new fabric.Ellipse({
    shadow,
    fill: COLORS.remotingsBlue,
    strokeWidth: 1,
    stroke: 'black',
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    selectable: false,
    objectCaching: false,
    ...data?.objects[0]
  });
  const textLeftPadding = (5 * ellipse.width) / 150 + ellipse.strokeWidth;
  const textTopPadding = (5 * ellipse.height) / 150 + ellipse.strokeWidth;
  const text = new fabric.Textbox('', {
    top: textTopPadding,
    left: textLeftPadding,
    width: ellipse.width - textLeftPadding * 2,
    fontSize: 0,
    prevFont: 4,
    breakWords: true,
    textAlign: 'center',
    fontFamily: 'arial',
    hasControls: true,
    hasBorders: false,
    objectCaching: false,
    calcPadding,
    verticalAlign: 'middle',
    setVerticalAlign: () => {
      text.set('top', calcTopCountingVerticalAlign(ellipse, text));
      board.requestRenderAll();
    },
    remotingsType: 'text',
    inGroup: true,
    ...data?.objects[1],
    fbButtons: [
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontStyle',
      'textAlign',
      'verticalAlign'
    ]
  });
  ellipse.on('mousedown', () => board.setActiveObject(ellipse.group));
  text.setVerticalAlign();
  text.onKeyDown = e => handleTextKeyDown(e, board, [ellipse, text]);
  text.onKeyUp = () => handleTextKeyUp(board, [ellipse, text]);
  text.on('editing:entered', () => enterEditingEmptyTextOptions(text));
  text.on('editing:exited', () => {
    regroup(board, [ellipse, text], _id, initGroup);
    exitEditingEmptyTextOptions(text);
  });
  text.on('changed', () => {
    if (timeout === null) {
      board.fire('object:modified', { target: text.oldGroup });
      timeout = setTimeout(() => {
        timeout = null;
      }, 1000);
    }
  });
  const group = initGroup(board, [ellipse, text], data, _id);
  board.add(group);
  return group;
};

const initGroup = (board, items, data, _id) => {
  const group = new fabric.Group(items, {
    _id,
    padding: 7,
    cornerStrokeColor: '#869ee3',
    cornerSize: 10,
    cornerColor: 'white',
    transparentCorners: false,
    cornerStyle: 'circle',
    lockMovementX: false,
    lockMovementY: false,
    hasControls: true,
    lockScaling: false,
    lockRotation: false,
    lockState: false,
    setLock: () => lockItem(group, board),
    setFocusByOther: isFocusedByOther =>
      setGroupFocusedByOther(board, group, isFocusedByOther),
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    remotingsType: 'circleshape',
    objectCaching: false,
    snapAngle: 45,
    snapThreshold: 10,
    newControlOrigin: [],
    moveWithArrowKeys,
    update: newDatas => updateGroup(board, group, items, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, group),
    resetPosForMessage: ({ left, top }) => group.set({ left, top }),
    ...data,
    fbButtons: [
      'backgroundColor',
      'dashAndColour',
      'strokeWidth',
      'lock',
      'utility',
      'moreOptions',
      'groupObjects'
    ]
  });
  setZindex(group, board);
  if (!group.lockState) {
    group.on('mousedblclick', e => handleMouseDblClick(e, board));
  }
  group.on('moving', e => {
    handleMove(e, board);
    group.isCurrentFocus = false;
  });
  group.on('mouseup', e => {
    resetNewControlOrigin(e);
    if (board.getActiveObject()._id === group._id) {
      if (!group.isCurrentFocus) {
        group.isCurrentFocus = true;
      } else {
        if (!e.transform.corner) {
          handleMouseDblClick({ target: group }, board);
          group.isCurrentFocus = false;
        }
      }
    }
  });
  return group;
};

export default CircleShape;