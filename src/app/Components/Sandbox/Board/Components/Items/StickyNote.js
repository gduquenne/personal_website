import { fabric } from 'fabric';
import { _wrapLine } from '../FabricPrototypes/initTextBox';
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

const StickyNote = ({ board, data, _id }) => {
  fabric.util.object.extend(fabric.Textbox.prototype, { _wrapLine });
  fabric.util.object.extend(fabric.Group.prototype, { controls });
  const shadow = new fabric.Shadow({
    color: 'rgba(0, 0, 0, 0.4)',
    offsetX: 0,
    offsetY: 10,
    blur: 5
  });
  let timeout = null;
  const rect = new fabric.Rect({
    shadow,
    rx: 3,
    ry: 3,
    fill: 'rgba(243, 254, 122, 1)',
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    selectable: false,
    objectCaching: false,
    ...data?.objects[0]
  });
  const textLeftPadding = (5 * rect.width) / 150;
  const textTopPadding = (5 * rect.height) / 150;
  const text = new fabric.Textbox('', {
    top: textTopPadding,
    left: textLeftPadding,
    width: rect.width - textLeftPadding * 2,
    fontSize: 4,
    prevFont: data?.objects[1]?.fontSize,
    fill: 'rgba(0,0,0,1)',
    verticalAlign: 'middle',
    setVerticalAlign: () => {
      text.set('top', calcTopCountingVerticalAlign(rect, text));
      board.requestRenderAll();
    },
    breakWords: true,
    textAlign: 'center',
    fontFamily: 'arial',
    hasControls: true,
    hasBorders: false,
    calcPadding,
    remotingsType: 'text',
    inGroup: true,
    autoFontSize: true,
    objectCaching: false,
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
  rect.on('mousedown', () => board.setActiveObject(rect.group));
  text.setVerticalAlign();
  text.onKeyDown = e => handleTextKeyDown(e, board, [rect, text]);
  text.onKeyUp = () => handleTextKeyUp(board, [rect, text]);
  text.on('editing:entered', () => enterEditingEmptyTextOptions(text));
  text.on('editing:exited', () => {
    regroup(board, [rect, text], _id, initGroup);
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
  const group = initGroup(board, [rect, text], data, _id);
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
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    remotingsType: 'stickynote',
    newControlOrigin: [],
    objectCaching: false,
    lockMovementX: false,
    lockMovementY: false,
    hasControls: true,
    lockScaling: false,
    lockRotation: false,
    lockState: false,
    moveWithArrowKeys,
    enterEdit: () => group.fire('mousedblclick', { target: group }),
    setLock: () => lockItem(group, board),
    setFocusByOther: isFocusedByOther =>
      setGroupFocusedByOther(board, group, isFocusedByOther),
    update: newDatas => updateGroup(board, group, items, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, group),
    resetPosForMessage: ({ left, top }) => group.set({ left, top }),
    snapAngle: 45,
    snapThreshold: 10,
    ...data,
    fbButtons: [
      'backgroundColor',
      'lock',
      'utility',
      'moreOptions',
      'groupObjects'
    ]
  });
  group.setControlsVisibility({
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

export default StickyNote;
