import { fabric } from 'fabric';
import { jsPDF } from 'jspdf';
import COLORS from '../Utils/Colors';
import {
  keepRatioControls,
  controls
} from '../Utils/CustomControls/FrameControls';
import { resetNewControlOrigin, moveWithArrowKeys } from './Events';

const FrameShape = ({ board, data, type }) => {
  if (type === 0) {
    fabric.util.object.extend(fabric.Rect.prototype, { controls });
  } else {
    fabric.util.object.extend(fabric.Rect.prototype, {
      controls: keepRatioControls
    });
  }
  const typeArray = [
    { name: 'Custom' },
    { width: 150, height: 150, name: '1:1' },
    { width: 160, height: 120, name: '4:3' },
    { width: 160, height: 90, name: '16:9' }
  ];
  const shadow = new fabric.Shadow({
    color: 'rgba(0, 0, 0, 0)',
    offsetX: 0,
    offsetY: 5,
    blur: 5
  });
  const rect = new fabric.Rect({
    shadow,
    typeArray,
    left: data.left - typeArray[type].width / 2,
    top: data.top - typeArray[type].height / 2,
    width: typeArray[type].width,
    height: typeArray[type].height,
    padding: 7,
    cornerStrokeColor: '#869ee3',
    cornerSize: 10,
    cornerColor: 'white',
    transparentCorners: false,
    cornerStyle: 'circle',
    hasBorders: false,
    fill: 'transparent',
    strokeWidth: 1,
    stroke: COLORS.remotingsBlue,
    hoverCursor: 'pointer',
    moveCursor: 'grabbing',
    remotingsType: 'frame',
    newControlOrigin: [],
    lockState: true,
    fbButtons: ['export', 'aspectRatio'],
    moveWithArrowKeys,
    setFrameType: frameType => setFrameType(board, rect, typeArray, frameType),
    exportFile: exportType => exportFile(board, rect, exportType),
    ...data
  });
  rect.on('mouseup', resetNewControlOrigin);
  board.add(rect);
  board.discardActiveObject();
  board.setActiveObject(rect);
  return rect;
};

const exportFile = (board, frame, exportType) => {
  let fileFormat;
  let fileName;
  const zoom = board.getZoom();
  const { strokeWidth, padding } = frame;
  const { tl, tr, bl } = frame.lineCoords;
  const zoomedStrokeWidth = strokeWidth * zoom;
  frame.set('strokeWidth', 0);
  const leftFrame = tl.x + padding + zoomedStrokeWidth;
  const topFrame = tl.y + padding + zoomedStrokeWidth;
  const widthFrame = tr.x - tl.x - (padding + zoomedStrokeWidth) * 2;
  const heightFrame = bl.y - tl.y - (padding + zoomedStrokeWidth) * 2;

  if (exportType === 'SVG') {
    const svgFile = board.toSVG({
      viewBox: {
        x: leftFrame,
        y: topFrame,
        width: widthFrame,
        height: heightFrame
      }
    });

    const svgBlob = new Blob([svgFile], {
      exportType: 'image/svg+xml;charset=utf-8'
    });
    fileFormat = URL.createObjectURL(svgBlob);
    fileName = 'remotings-image.svg';
  } else if (exportType === 'PDF') {
    fileFormat = board.toDataURL({
      left: leftFrame,
      top: topFrame,
      width: widthFrame,
      height: heightFrame
    });
  } else {
    fileFormat = board.toDataURL({
      left: leftFrame,
      top: topFrame,
      width: widthFrame,
      height: heightFrame
    });
    fileName = 'remotings-image.png';
  }

  if (exportType === 'PDF') {
    const pdf = new jsPDF();
    pdf.addImage(fileFormat, 'JPEG', 0, 0, widthFrame, heightFrame);
    pdf.save('remotings-image.pdf');
  } else {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileFormat;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  frame.set('strokeWidth', strokeWidth);
};

const setFrameType = (board, rect, typeArray, frameType) => {
  if (frameType === 0) {
    fabric.util.object.extend(fabric.Rect.prototype, { controls });
    rect.set('keepRatio', false);
    rect.setControlsVisibility({
      bl: true,
      br: true,
      mb: true,
      ml: true,
      mr: true,
      mt: true,
      tl: true,
      tr: true,
      mtr: false
    });
  } else {
    fabric.util.object.extend(fabric.Rect.prototype, {
      controls: keepRatioControls
    });
    const { width: aspectWidth, height: aspectHeight } = typeArray[frameType];
    const { width, height } = rect;
    if (width >= height) {
      rect.set('height', (width * aspectHeight) / aspectWidth);
    } else {
      rect.set('width', (height * aspectWidth) / aspectHeight);
    }
    rect.setControlsVisibility({
      bl: true,
      br: true,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: true,
      tr: true,
      mtr: false
    });
    rect.set('keepRatio', true);
  }
  board.requestRenderAll();
};

export default FrameShape;
