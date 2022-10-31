import { fabric } from 'fabric';
import { controls } from '../Utils/CustomControls/ImageControls';
import { setZindex } from '../Utils/ZIndexHandler';
import {
  resetNewControlOrigin,
  handleMove,
  lockItem,
  updatePosForMessage,
  moveWithArrowKeys
} from './Events';

const ImageShape = ({ board, data, _id }) => {
  fabric.util.object.extend(fabric.Image.prototype, { controls });
  if (data?.src) {
    initImage(data.src, board, data, _id);
  } else {
    createFileInput(board, data, _id);
  }
};
const createFileInput = (board, data, _id) => {
  const div = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/jpeg, image/png';
  input.style.display = 'none';
  input.addEventListener('change', e => {
    if (
      ['image/jpg', 'image/jpeg', 'image/png'].includes(e.target.files[0].type)
    ) {
      handleFileLoad(input, board, data, _id);
    }
  });
  input.addEventListener('click', () =>
    document.addEventListener(
      'focus',
      () => document.getElementById('root').removeChild(div),
      { once: true }
    )
  );
  div.appendChild(input);
  document.getElementById('root').appendChild(div);
  input.click();
};

const handleFileLoad = (input, board, data, _id) => {
  const { files } = input;
  const reader = new FileReader();
  reader.onload = () => {
    const src = reader.result;
    initImage(src, board, data, _id);
  };
  reader.readAsDataURL(files[0]);
};

const initImage = (src, board, data, _id) => {
  const image = new window.Image();
  localStorage.setItem('imgData', src);
  image.src = src;
  image.addEventListener('load', () => handleLoad(image, board, data, _id));
};

const handleLoad = (image, board, data, _id) => {
  fabric.Image.fromObject(image, img => {
    let scaleX, scaleY;
    if (!data.src) {
      ({ scaleX, scaleY } = limitMaxWidthHeight(
        img,
        calcSizeWithDataRequestedByUser(img, [data.width, data.height])
      ));
      delete data.height;
      delete data.width;
    }
    const imageShape = img.set({
      _id,
      scaleX,
      scaleY,
      padding: 7,
      cornerStrokeColor: '#869ee3',
      cornerSize: 10,
      cornerColor: 'white',
      transparentCorners: false,
      cornerStyle: 'circle',
      lockScaling: false,
      lockRotation: false,
      lockState: false,
      moveWithArrowKeys,
      setLock: () => lockItem(imageShape, board),
      setFocusByOther: isFocusedByOther =>
        imageShape.set('selectable', !isFocusedByOther),
      hoverCursor: 'pointer',
      moveCursor: 'grabbing',
      remotingsType: 'imageshape',
      newControlOrigin: [],
      objectCaching: false,
      snapAngle: 45,
      snapThreshold: 10,
      update: newDatas => update(board, imageShape, newDatas),
      updatePosForMessage: activeSelection =>
        updatePosForMessage(activeSelection, imageShape),
      resetPosForMessage: ({ left, top }) => imageShape.set({ left, top }),
      ...data,
      fbButtons: ['lock', 'utility', 'moreOptions', 'groupObjects']
    });
    setZindex(imageShape, board);
    imageShape.on('moving', e => handleMove(e, board));
    imageShape.on('mouseup', resetNewControlOrigin);
    board.add(imageShape);
  });
};

const update = (board, imageShape, data) => {
  imageShape.set({ ...data });
  board.requestRenderAll();
};

const calcSizeWithDataRequestedByUser = (
  image,
  [requestedWidth, requestedHeight]
) => {
  const { width: imgWidth, height: imgHeight } = image;
  const defaultWidth = 50;
  const defaultHeight = 50;
  if (requestedWidth !== defaultWidth && requestedHeight !== defaultHeight) {
    const imgSizeRatio = imgWidth / imgHeight;
    const dataSizeRatio = requestedWidth / requestedHeight;
    const ratioMultiplicator = imgSizeRatio / dataSizeRatio;
    if (requestedWidth > requestedHeight) {
      return [requestedWidth, requestedHeight / ratioMultiplicator];
    } else {
      return [requestedWidth * ratioMultiplicator, requestedHeight];
    }
  } else {
    return [imgWidth, imgHeight];
  }
};

const limitMaxWidthHeight = (image, [width, height]) => {
  const { width: naturalWidth, height: naturalHeight } = image;
  const maxWidth = 7640;
  const maxHeight = 4280;
  let widthDiffRatio = -1;
  let heightDiffRatio = -1;
  let matched = false;
  let scaleX = 1;
  let scaleY = 1;
  if (width > maxWidth) {
    widthDiffRatio = (width - maxWidth) / maxWidth;
    matched = true;
  }
  if (height > maxHeight) {
    heightDiffRatio = (height - maxHeight) / maxHeight;
    matched = true;
  }
  if (matched) {
    if (widthDiffRatio >= heightDiffRatio) {
      const ratio = maxWidth / width;
      width = width * ratio;
      height = height * ratio;
    } else {
      const ratio = maxHeight / height;
      width = width * ratio;
      height = height * ratio;
    }
  }
  scaleX = width / naturalWidth;
  scaleY = height / naturalHeight;
  return { width: naturalWidth, height: naturalHeight, scaleX, scaleY };
};

export default ImageShape;
