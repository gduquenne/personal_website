import { handleMove } from '../../Items/Events';

/**
 * This file contains functions used in the board to
 * set the controls visibility in case of activeSelection
 */

const setActiveSelectionButtons = objects => {
  const availableForActiveSelection = [];
  [
    'fontFamily',
    'fontSize',
    'fontColor',
    'fontStyle',
    'textAlign',
    'backgroundColor',
    'dashAndColour',
    'strokeWidth',
    'lock',
    'moreOptions',
    'groupObjects'
  ].forEach(field => {
    if (
      objects.every(obj => {
        if (obj.customControlTarget) {
          obj = obj.customControlTarget;
        }
        return obj.fbButtons.includes(field);
      })
    ) {
      availableForActiveSelection.push(field);
    }
  });
  return availableForActiveSelection;
};

const getControllerBorderColor = someObjLocked => {
  if (someObjLocked) {
    return 'red';
  } else {
    return 'rgba(178,204,255,1)';
  }
};

/**
 * setSelectionControlsVisibility is used to display controls on activeSelection
 * first it sets the design of each control
 * then it goes through multiple conditions
 * the order is important, it defines the priority
 * from the more restrictive to the less
 * @param {*} canvas is the board
 * @param {*} param1 is the
 */
const setSelectionControlsVisibility = (canvas, target) => {
  if (canvas.getActiveObject()?.type === 'activeSelection') {
    const activeObjs = canvas.getActiveObject()._objects;
    const someObjLocked = target._objects.some(obj => obj.lockState);
    target.set({
      padding: 7,
      transparentCorners: false,
      cornerSize: 10,
      hasBorders: true,
      cornerStrokeColor: '#869ee3',
      cornerColor: 'white',
      cornerStyle: 'circle',
      borderColor: getControllerBorderColor(someObjLocked),
      fbButtons: setActiveSelectionButtons(target._objects),
      lockMovementX: someObjLocked,
      lockMovementY: someObjLocked,
      lockScaling: someObjLocked,
      lockRotation: someObjLocked,
      hasControls: !someObjLocked,
      opacityFriendly: target._objects.every(obj =>
        ['rectshape', 'circleshape'].includes(obj.remotingsType)
      ),
      setLock: () => {
        /**
         * if they are all unlocked, just lock every one
         * if not, need to lock them all to be at the
         */
        const allUnlocked = target._objects.every(obj => !obj.lockState);
        if (allUnlocked) {
          /**
           * all unlocked, so lock all
           */
          target._objects.forEach(obj => {
            obj.setLock();
            target.set({
              borderColor: getControllerBorderColor(true),
              lockMovementX: true,
              lockMovementY: true,
              lockScaling: true,
              lockRotation: true,
              hasControls: false
            });
          });
        } else {
          /**
           * means that at least one object is locked
           * so unlock each
           */
          target._objects.forEach(obj => {
            obj.lockState = true;
            obj.setLock();
            target.set({
              borderColor: getControllerBorderColor(false),
              lockMovementX: false,
              lockMovementY: false,
              lockScaling: false,
              lockRotation: false,
              hasControls: true
            });
          });
        }
      }
    });
    target.on('moving', e => handleMove(e, canvas));
    /**
     * as line and arrow controls do not work the same way as the others
     * if there is at least one of them in the active selection
     * you cannot resize the selection
     */
    if (
      activeObjs.some(obj =>
        ['lineshape', 'arrowshape'].includes(obj.remotingsType)
      )
    ) {
      target.setControlsVisibility({
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
      /**
       * as stickynote cannot be resize from left, right, top and bottom
       * and image is cropping from left, right, top and bottom
       * if there is at least one of them in the active selection
       * you cannot resize the selection from left, right, top or bottom
       */
    } else if (
      activeObjs.some(obj =>
        ['stickynote', 'imageshape', 'draw'].includes(obj.remotingsType)
      )
    ) {
      target.setControlsVisibility({
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
      /**
       * as text cannot be resize from top and bottom
       * if there is at least one in the active selection
       * you cannot resize the selection from top or bottom
       */
    } else {
      if (activeObjs.some(obj => ['text'].includes(obj.remotingsType))) {
        target.setControlsVisibility({
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
      }
    }
  }
};

export { setSelectionControlsVisibility };
