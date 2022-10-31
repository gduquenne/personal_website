import imageIcon from '../../../../../../../public/img/board/install-icons/installer-image.svg';
import stickyIcon from '../../../../../../../public/img/board/install-icons/installer-stickynote.svg';
import textIcon from '../../../../../../../public/img/board/install-icons/installer-text.svg';

/**
 * This file contains function used in the board to
 * set the cursor style
 */

const setCursor = (board, type) => {
  let cursor;
  /**
   * each item has its own cursor
   */
  switch (type) {
    case 'stickynote':
      cursor = `url(${stickyIcon}), auto`;
      break;
    case 'text':
      cursor = `url(${textIcon}), auto`;
      break;
    case 'imageshape':
      cursor = `url(${imageIcon}), auto`;
      break;
    case 'rectshape':
    case 'circleshape':
    case 'lineshape':
    case 'arrowshape':
    case 'frameshape':
      cursor = 'crosshair';
      break;
    case 'drag':
      cursor = 'grab';
      break;
    case 'dragging':
      cursor = 'grabbing';
      break;
    default:
      cursor = 'default';
      break;
  }
  board.set('defaultCursor', cursor);
  board.requestRenderAll();
};

export { setCursor };
