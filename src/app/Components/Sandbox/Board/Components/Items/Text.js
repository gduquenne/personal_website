import { fabric } from 'fabric';
import { _wrapLine } from '../FabricPrototypes/initTextBox';
import { controls } from '../Utils/CustomControls/TextboxControls';
import { setZindex } from '../Utils/ZIndexHandler';
import {
  resetNewControlOrigin,
  handleMove,
  lockItem,
  updatePosForMessage,
  moveWithArrowKeys
} from './Events';

const Text = ({ board, data, _id }) => {
  fabric.util.object.extend(fabric.Textbox.prototype, { _wrapLine });
  fabric.util.object.extend(fabric.Textbox.prototype, { controls });
  const text = new fabric.Textbox('', {
    _id,
    fontFamily: 'arial',
    calcPadding: newWidth => (5 * newWidth) / 150,
    breakWords: true,
    padding: 7,
    centerTransform: true,
    cornerStrokeColor: '#869ee3',
    cornerSize: 10,
    cornerColor: 'white',
    transparentCorners: false,
    cornerStyle: 'circle',
    lockMovementX: false,
    lockMovementY: false,
    hasControls: true,
    editable: true,
    lockScaling: false,
    lockRotation: false,
    lockState: false,
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    remotingsType: 'text',
    objectCaching: false,
    snapAngle: 45,
    snapThreshold: 10,
    newControlOrigin: [],
    moveWithArrowKeys,
    enterEdit: () => text.enterEditing(),
    setLock: () => lockItem(text, board),
    setFocusByOther: isFocusedByOther =>
      text.set('selectable', !isFocusedByOther),
    update: newDatas => update(board, text, newDatas),
    updatePosForMessage: activeSelection =>
      updatePosForMessage(activeSelection, text),
    resetPosForMessage: ({ left, top }) => text.set({ left, top }),
    ...data,
    fbButtons: [
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontStyle',
      'textAlign',
      'lock',
      'utility',
      'moreOptions',
      'groupObjects'
    ]
  });

  text.setControlsVisibility({
    bl: true,
    br: true,
    mb: false,
    ml: true,
    mr: true,
    mt: false,
    tl: true,
    tr: true,
    mtr: true
  });
  text.on('editing:exited', () => {
    text.set('editable', false);
    if (text.text === '') {
      board.remove(text);
    }
    if (board.getActiveObject()._id === _id) {
      text.isCurrentFocus = true;
    }
  });
  text.on('mousedblclick', () => {
    text.set('editable', true);
    if (!text.isEditing) {
      text.enterEditing();
    }
  });
  text.on('moving', e => {
    handleMove(e, board);
    text.isCurrentFocus = false;
  });
  text.on('mouseup', e => {
    resetNewControlOrigin(e);
    if (board.getActiveObject()._id === _id && !text.isEditing) {
      if (!text.isCurrentFocus) {
        text.isCurrentFocus = true;
      } else {
        if (!e.transform.corner) {
          text.set('editable', true);
          text.enterEditing();
          text.isCurrentFocus = false;
        }
      }
    }
  });
  setZindex(text, board);
  board.add(text);
  return text;
};

const update = (board, object, data) => {
  object.set({ ...data });
  board.requestRenderAll();
};

export default Text;
