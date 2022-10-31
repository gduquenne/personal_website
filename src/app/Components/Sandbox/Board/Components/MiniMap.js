import { fabric } from 'fabric';
import { clampViewport } from './Utils/ZoomAndPan';

/*
 * ###########################################################################
 * #                                                                         #
 * #                           Initialization                                #
 * #                                                                         #
 * ###########################################################################
 */

const initMiniMap = (board, setViewport) => {
  const miniMapValue = {
    selection: false,
    width: 160,
    height: 90
  };
  const miniMap = new fabric.Canvas('miniMap', miniMapValue);

  initMiniMapView(miniMap, board);

  let clickedMinimap = false;

  miniMap.on('mouse:down', e => {
    clickedMinimap = true;
    moveCamera(e, board, miniMap, setViewport);
  });
  miniMap.on('mouse:move', e => {
    if (clickedMinimap === true) {
      moveCamera(e, board, miniMap, setViewport);
    }
  });
  miniMap.on('mouse:up', () => (clickedMinimap = false));

  return miniMap;
};

const initMiniMapView = (miniMap, board) => {
  const newCanvas = createCanvasElement(miniMap, board);
  const backgroundImage = new fabric.Image(newCanvas);
  miniMap.centerObject(backgroundImage);
  miniMap.backgroundColor = 'rgba(246, 249, 248, 1)';
  miniMap.backgroundImage = backgroundImage;
  miniMap.requestRenderAll();

  const zoom = board.getZoom();
  const vpt = board.viewportTransform;
  const { width, height } = miniMap;
  const rectValue = {
    left: computeGregoire(vpt[4], zoom, 7680, width),
    top: computeGregoire(vpt[5], zoom, 4320, height),
    width: (board.width * width) / 7680,
    height: (board.height * height) / 4320,
    fill: 'rgba(0, 0, 255, 0.2)',
    cornerSize: 6,
    transparentCorners: false,
    cornerColor: 'blue',
    strokeWidth: 0,
    selectable: false,
    evented: false
  };
  const miniMapView = new fabric.Rect(rectValue);
  miniMap.add(miniMapView);
};

/*
 * ###########################################################################
 * #                                                                         #
 * #                              Update                                     #
 * #                                                                         #
 * ###########################################################################
 */

const updateMiniMapVP = (miniMap, board) => {
  const view = miniMap.getObjects()[0];
  const zoom = board.getZoom();
  const vpt = board.viewportTransform;
  view.scaleX = 1 / zoom;
  view.scaleY = 1 / zoom;
  view.top = computeGregoire(-vpt[5], zoom, 4320, miniMap.height);
  view.left = computeGregoire(-vpt[4], zoom, 7680, miniMap.width);
  view.width = (board.width * miniMap.width) / 7680;
  view.height = (board.height * miniMap.height) / 4320;
  miniMap.requestRenderAll();
};

const updateMiniMap = (miniMap, board) => {
  const newCanvas = createCanvasElement(miniMap, board);
  miniMap.backgroundImage._element = newCanvas;
  miniMap.requestRenderAll();
};

/*
 * ###########################################################################
 * #                                                                         #
 * #                      Create Image from Board                            #
 * #                                                                         #
 * ###########################################################################
 */

const createCanvasElement = (miniMap, board) => {
  const originalVPT = board.viewportTransform;
  const originalBackground = board.backgroundColor;
  board.viewportTransform = [1, 0, 0, 1, originalVPT[4], originalVPT[5]];
  board.backgroundColor = 'rgba(246, 249, 248, 1)';
  const newCanvas = board.toCanvasElement(
    (miniMap.width / 7640 + miniMap.height / 4280) / 2,
    {
      left: board.viewportTransform[4] - 3840,
      top: board.viewportTransform[5] - 2160,
      width: 7680,
      height: 4320
    }
  );
  board.viewportTransform = originalVPT;
  board.backgroundColor = originalBackground;
  board.renderAll();
  return newCanvas;
};

/*
 * ###########################################################################
 * #                                                                         #
 * #                              Utils                                      #
 * #                                                                         #
 * ###########################################################################
 */

const calcPosFromMiniMapClick = (
  zoom,
  { width, height },
  { width: mWidth, height: mHeight },
  { mouseX, mouseY }
) => {
  const x = changePointCoordinateSystem(mouseX, mWidth, 7680, zoom, width);
  const y = changePointCoordinateSystem(mouseY, mHeight, 4320, zoom, height);
  return { x, y };
};

//TODO: Find an other name
const computeGregoire = (pos, zoom, maxSize, size) =>
  ((pos / zoom + maxSize / 2) * size) / maxSize;

const changePointCoordinateSystem = (
  pos,
  sizeFrom,
  maxSizeTo,
  zoomTo,
  sizeTo
) => ((-(pos - sizeFrom / 2) * maxSizeTo) / sizeFrom) * zoomTo + sizeTo / 2;

const moveCamera = (e, board, miniMap, setViewport) => {
  const pos = calcPosFromMiniMapClick(board.getZoom(), board, miniMap, {
    mouseX: e.pointer.x,
    mouseY: e.pointer.y
  });
  const newPos = [...board.viewportTransform];
  newPos[4] = pos.x;
  newPos[5] = pos.y;
  board.setViewportTransform(newPos);
  clampViewport(board, board.width, board.height);
  updateMiniMapVP(miniMap, board);
  setViewport(board.viewportTransform);
};

export { initMiniMap, updateMiniMapVP, updateMiniMap };
