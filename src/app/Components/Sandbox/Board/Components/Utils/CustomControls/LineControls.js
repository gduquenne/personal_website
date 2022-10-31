import { fabric } from 'fabric';

/**
 * This file contains functions used in the board for
 * 100% line and arrowcustom control compatibility with fabric stuff
 */

/*
 * #########################################################################
 * #                                                                       #
 * #                          LINE CUSTOM CONTROLS                         #
 * #                                                                       #
 * #########################################################################
 */

const customControlsVisibilityStuffOnSelectionCreation = ({ selected }) => {
  if (
    selected.length === 1 &&
    ['lineshape', 'arrowshape'].includes(selected[0].remotingsType)
  ) {
    selected[0].setCustomControlsVisibility(true);
  }
};
const customControlsVisibilityStuffOnSelectionClear = ({ deselected }) => {
  if (deselected?.length === 1 && deselected[0].customControlTarget) {
    deselected[0].customControlTarget.setCustomControlsVisibility(false);
  }
};
const customControlsVisibilityStuffOnSelectionUpdate = (
  { selected, deselected, ...e },
  board
) => {
  if (
    e.e?.shiftKey &&
    !deselected[0] &&
    board.getActiveObject().type === 'activeSelection' &&
    board.getActiveObject()._objects.some(obj => obj.customControlTarget)
  ) {
    /**
     * means that the selection was a line (customControl existing && focused)
     * and the user shift-clicked on a other item
     */
    const customControlTarget = board
      .getActiveObject()
      ._objects.filter(obj => obj.customControlTarget)[0].customControlTarget;
    board.discardActiveObject();
    if (
      customControlTarget === selected[0] ||
      selected[0].customControlTarget
    ) {
      /**
       * means that the other item is :
       *   - the line of the customControl OR
       *   - the other customControl of the line
       * need to override fabric default pattern to select the line only
       * and trigger the custom control display
       */
      customControlTarget.fire('mouseup', { target: customControlTarget });
    } else {
      /**
       * means that the other item is another item
       * need to override fabric default pattern to select the two lines
       * and remove the customControls of the first selected line
       */
      customControlTarget.setCustomControlsVisibility(false);
      board.setActiveObject(
        new fabric.ActiveSelection([customControlTarget, selected[0]], {
          canvas: board
        })
      );
    }
  }
  /**
   * normaly cannot pass through the event selection:updated
   * if coming from a activeSelection or going to an activeSelection
   * but we still check if selected exists because sometimes fabric
   * pass through selection:updated from a activeSelection
   * also when shiftkey pressed while clicking, deselected[0] is null
   * cuz you grow the selection with the item you clicked
   */
  if (selected[0] && deselected[0]) {
    /**
     * if the selection isn't an active selection and the selection is a lineshape
     *    if the deselection isn't a custom control :
     *      - show the selection custom controls
     *    if the deselection is a custom control but isn't a selection's custom control :
     *      - show the selection custom controls
     *      - hide the deselection target custom controls
     *    else
     *      - do nothing more than fabric does
     */
    if (['lineshape', 'arrowshape'].includes(selected[0].remotingsType)) {
      if (!deselected[0].customControlTarget) {
        selected[0].setCustomControlsVisibility(true);
      }
      if (
        deselected[0].customControlTarget &&
        deselected[0].customControlTarget !== selected[0]
      ) {
        selected[0].setCustomControlsVisibility(true);
        deselected[0].customControlTarget.setCustomControlsVisibility(false);
      }
    }

    /**
     * if the selection is a active selection or isn't a lineshape
     * and the deselection is a custom control :
     *    - hide the deselection target custom controls
     */
    if (
      selected[0].remotingsType &&
      !['customControl', 'lineshape', 'arrowshape'].includes(
        selected[0].remotingsType
      ) &&
      deselected[0].customControlTarget
    ) {
      deselected[0].customControlTarget.setCustomControlsVisibility(false);
    }
  }
};

const updateLinePointsOnSelectionCleared = e => {
  e?.deselected?.forEach(obj => {
    if (['lineshape', 'arrowshape'].includes(obj.remotingsType)) {
      obj.pointsInSelection = null;
      obj.updatePoints();
    }
  });
};

export {
  customControlsVisibilityStuffOnSelectionUpdate,
  customControlsVisibilityStuffOnSelectionClear,
  customControlsVisibilityStuffOnSelectionCreation,
  updateLinePointsOnSelectionCleared
};
