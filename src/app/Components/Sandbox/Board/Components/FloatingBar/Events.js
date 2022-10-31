/*
 * #########################################################################
 * #                                                                       #
 * #                         LINKED OBJECTS EVENTS                         #
 * #                                                                       #
 * #########################################################################
 */

const onObjMoving = setMenuOpen => {
  document.getElementById('floatingBar').style.visibility = 'hidden';
  setMenuOpen(null);
};

const onObjMoved = ({ transform }, board, calcPos, setMenuOpen) => {
  const { target } = transform;
  const floatingBarHTML = document.getElementById('floatingBar');
  floatingBarHTML.style.visibility = 'visible';
  const { top, left } = calcPos(target, floatingBarHTML, board);
  floatingBarHTML.style.left = `${left}px`;
  floatingBarHTML.style.top = `${top}px`;
  setMenuOpen(false);
};

const onObjScaling = ({ transform, target }, setMenuOpen) => {
  if (
    transform !== null &&
    ((target.customControlTarget && transform.action === 'drag') ||
      transform.action === 'customScaling')
  ) {
    setMenuOpen(false);
    document.getElementById('floatingBar').style.visibility = 'hidden';
  }
};

const onObjScaled = ({ transform, target }, board, calcPos) => {
  if (transform !== null) {
    const { action } = transform;
    const floatingBarHTML = document.getElementById('floatingBar');
    floatingBarHTML.style.visibility = 'visible';
    let top;
    let left;
    if (target.customControlTarget && action === 'drag') {
      ({ top, left } = calcPos(
        target.customControlTarget,
        floatingBarHTML,
        board
      ));
    }
    if (action === 'customScaling') {
      ({ top, left } = calcPos(target, floatingBarHTML, board));
    }
    floatingBarHTML.style.left = `${left}px`;
    floatingBarHTML.style.top = `${top}px`;
  }
};

const onBoardZoom = (board, activeObj, calcPos, setMenuOpen) => {
  setMenuOpen(false);
  const floatingBarHTML = document.getElementById('floatingBar');
  const { top, left } = calcPos(activeObj, floatingBarHTML, board);
  floatingBarHTML.style.left = `${left}px`;
  floatingBarHTML.style.top = `${top}px`;
};

export { onObjMoving, onObjMoved, onObjScaling, onObjScaled, onBoardZoom };
