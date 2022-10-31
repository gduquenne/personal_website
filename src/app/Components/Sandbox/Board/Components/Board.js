// Import Core
import { fabric } from 'fabric';
import React, { useEffect, useState, useMemo } from 'react';

// Import Fabric Prototypes
import { toObject } from './FabricPrototypes/toJSON';

// Import Components from Material-UI
import { Fab, Tooltip } from '@material-ui/core';
import MouseCursor from './MouseCursor';

// Import Components
import {
  ArrowShape,
  LineShape,
  ImageShape,
  CircleShape,
  RectShape,
  StickyNote,
  Text,
  FrameShape,
  Draw
} from './Items/Items';
import LeftBar from './LeftBar';
import FloatingBar from './FloatingBar/FloatingBar';
import { initMiniMap, updateMiniMapVP, updateMiniMap } from './MiniMap';

// Import Utils
import { copyItems, pasteItems } from './Utils/CopyPasteHandler';
import { thumbnailCreation } from './Utils/thumbnailCreation';
import {
  bringToFrontOrBack,
  sortBoardFromArray,
  sortBoardZindexWithUpdate
} from './Utils/ZIndexHandler';
import {
  updateZoom,
  initPan,
  updatePan,
  clampViewport,
  setZoom
} from './Utils/ZoomAndPan';
import {
  customControlsVisibilityStuffOnSelectionUpdate,
  customControlsVisibilityStuffOnSelectionClear,
  customControlsVisibilityStuffOnSelectionCreation,
  updateLinePointsOnSelectionCleared
} from './Utils/CustomControls/LineControls';
import { setCursor } from './Utils/Cursor';
import { setSelectionControlsVisibility } from './Utils/CustomControls/ActiveSelectionControlsVisibility';
import {
  startDimensionningItem,
  dimensionningItem,
  endDimensionningItem
} from './Utils/ItemDimensionning';

// Import Icons
// import { grid20, grid40, grid80, grid160 } from './Icons/grids';
import grid20 from '../../../../../../public/img/board/grid/grid-20.png';
import grid40 from '../../../../../../public/img/board/grid/grid-40.png';
import grid80 from '../../../../../../public/img/board/grid/grid-80.png';
import grid160 from '../../../../../../public/img/board/grid/grid-160.png';
import grid1602 from '../../../../../../public/img/board/grid/grid-1602.png';
import grid1603 from '../../../../../../public/img/board/grid/grid-1603.png';
import fullScreen from '../../../../../../public/img/board/full-screen.svg';
import expandMiniMap from '../../../../../../public/img/board/expand-minimap.svg';
import plus from '../../../../../../public/img/board/plus.svg';
import minus from '../../../../../../public/img/board/minus.svg';
import closeMiniMap from '../../../../../../public/img/board/close-minimap.svg';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Styles
// import '../../../App/styles.scss';
import styleBoard from './StyleSheets/styleBoard.jss';

const useStyles = makeStyles(styleBoard);

let itemCreation;
let dragging = false;
let _clipboard;
let currentGridSize;
let timeoutZoom;
let intervalWebSocket;
let intervalUsers;
let timeoutZIndex;
let focusArray = [];
let showGrid = true;
let miniMap;
let lastIdCreated;
let followedUser = null;
let firstLaunch = 0;
const mousePos = { x: 0, y: 0 };
const grids = [
  new fabric.Pattern({ source: grid20 }),
  new fabric.Pattern({ source: grid40 }),
  new fabric.Pattern({ source: grid80 }),
  new fabric.Pattern({ source: grid160 }),
  new fabric.Pattern({ source: grid1602 }),
  new fabric.Pattern({ source: grid1603 })
];
let currentMaxId = -1;

const getNextId = () => {
  ++currentMaxId;
  return currentMaxId;
}

const getBoardDimensions = () => {
  let width, height;
  width = 1200;
  height = 900;
  return {width, height};
}

const Board = ({
  // width,
  // template,
  // height,
  // saveUpdate,
  // getNextId,
  // getWSUpdates,
  // getZIndexUpdates,
  // openFacilitatorPanel,
  // sendUsersUpdate,
  // getUsersUpdate,
  // getFocusUpdate,
  // sendFocusUpdate,
  // sendZIndexModif,
  // sendNewThumbnail,
  // setShowPopup
}) => {
  const {width, height} = getBoardDimensions();
  fabric.util.object.extend(fabric.Object.prototype, { toObject });
  const classes = useStyles();
  const [board, setBoard] = useState();
  const [selection, setSelection] = useState({
    selected: null,
    updated: false
  });
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);
  const [viewport, setViewport] = useState([]);

  // useEffect(() => {
  //   if (selection.selected?.type === 'activeSelection') {
  //     const ownFocus = [];
  //     selection.selected._objects.forEach(obj => {
  //       if (obj._id) {
  //         ownFocus.push(obj._id);
  //       }
  //     });
  //     sendFocusUpdate(ownFocus);
  //   } else if (!selection.selected) {
  //     sendFocusUpdate([]);
  //   } else {
  //     if (selection.selected?._id) {
  //       sendFocusUpdate([selection.selected._id]);
  //     } else if (selection.selected?.customControlTarget) {
  //       sendFocusUpdate([selection.selected.customControlTarget._id]);
  //     } else {
  //       sendFocusUpdate([selection.selected.oldGroup._id]);
  //     }
  //   }
  // }, [selection]);

  useEffect(() => {
    if (board) {
      if (showGrid) {
        board.backgroundColor = grids[currentGridSize];
      } else {
        board.backgroundColor = 'rgba(255, 255, 255, 1)';
      }
      board.requestRenderAll();
    }
  }, [showGrid]);

  useEffect(() => {
    const { canvas, cleanclbk } = initBoard();
    setBoard(canvas);
    return () => {
      clearInterval(intervalWebSocket);
      clearInterval(intervalUsers);
      cleanclbk();
      itemCreation = undefined;
      dragging = false;
      _clipboard = undefined;
      currentGridSize = undefined;
      timeoutZoom = undefined;
      intervalWebSocket = undefined;
      intervalUsers = undefined;
      focusArray = [];
      showGrid = true;
      lastIdCreated = undefined;
      followedUser = null;
      mousePos.x = 0;
      mousePos.y = 0;
    };
  }, []);

  useEffect(() => {
    const activeObj = board?.getActiveObject();
    if (activeObj) {
      activeObj.customControlTarget?.customControls.forEach(control =>
        control.updateControl(viewport[0])
      );
    }
  }, [viewport]);

  // useEffect(() => {
  //   let timeOutThumbnail;
  //   if (!template) {
  //     if (board) {
  //       timeOutThumbnail = setTimeout(() => {
  //         thumbnailCreation(board, sendNewThumbnail, grids, currentGridSize);
  //       }, 30000);
  //       setViewport(board.viewportTransform);
  //     }
  //   }
  //   return () => clearTimeout(timeOutThumbnail);
  // }, [board]);

  useEffect(() => {
    if (board) {
      board.setWidth(width);
    }
  }, [width]);

  useEffect(() => {
    return () => {
      firstLaunch = 0;
    };
  }, []);

  useEffect(() => {
    if (board) {
      board.setHeight(height);
    }
  }, [height]);

  // useEffect(() => {
  //   if (board) {
  //     const activeObj = board.getActiveObject();
  //     activeObj?.customControlTarget?.setCustomControlsVisibility(false);
  //     board.discardActiveObject().requestRenderAll();
  //   }
  // }, [openFacilitatorPanel]);

  useEffect(() => {
    focusArray.forEach(focus => {
      const match = board
        .getObjects()
        .filter(boardObj => boardObj._id === focus._id)[0];
      if (match) {
        drawBoundingRectBorder(board, match, focus.color);
      }
    });
  }, [focusArray]);

  const initBoard = () => {
    currentGridSize = computeGridSize(width, 1);
    const canvas = new fabric.Canvas('board', {
      height,
      width,
      mousePos,
      centeredRotation: true,
      backgroundColor: grids[currentGridSize],
      freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 })
    });
    miniMap = initMiniMap(canvas, setViewport);

    canvas.on('mouse:down', opt => handleMouseDown(opt, canvas));
    canvas.on('mouse:move', opt => handleMouseMove(opt, canvas, setViewport));
    canvas.on('mouse:wheel', opt =>
      handleMouseWheel(opt.e, canvas, setViewport)
    );
    canvas.on('mouse:up', () => handleMouseUp(canvas, getNextId));
    canvas.on('selection:created', e =>
      handleSelectionCreated(e, canvas, selection, setSelection)
    );
    canvas.on('selection:updated', e =>
      handleSelectionUpdated(e, canvas, selection, setSelection)
    );
    canvas.on('selection:cleared', e =>
      handleSelectionCleared(e, selection, setSelection)
    );
    canvas.on('object:added', e =>
      handleObjectAdded(e, canvas, { saveUpdate, getNextId })
    );
    canvas.on('object:removed', e =>
      handleObjectRemoved(e, canvas, saveUpdate)
    );
    canvas.on('object:modified', e =>
      handleObjectModified(e, canvas, saveUpdate)
    );
    // canvas.on('zIndex:updated', e => sendZIndexModif(e.target));
    canvas.on('after:render', () => updateFocusedBorders(canvas, focusArray));
    const handleKeyDownE = e =>
      handleKeyDown(e, canvas, selection, setSelection);
    const handleKeyUpE = e => handleKeyUp(e, canvas);
    const handleMouseWheelE = e => handleMouseWheel(e, canvas, setViewport);
    const copyItemsE = () => (_clipboard = copyItems(canvas));
    const pasteItemsE = () =>
      pasteItems(canvas, _clipboard, mousePos, createItem, getNextId);
    window.addEventListener('keydown', handleKeyDownE);
    window.addEventListener('keyup', handleKeyUpE);
    window.addEventListener('copy', copyItemsE);
    window.addEventListener('paste', pasteItemsE);
    const root = document.getElementById('root');
    root.addEventListener('wheel', handleMouseWheelE);
    const cleanclbk = () => {
      window.removeEventListener('keydown', handleKeyDownE);
      window.removeEventListener('keyup', handleKeyUpE);
      root.removeEventListener('wheel', handleMouseWheelE);
      window.removeEventListener('copy', copyItemsE);
      window.removeEventListener('paste', pasteItemsE);
    };

    // intervalWebSocket = setInterval(() => {
    //   updateItems(canvas, getWSUpdates);
    //   updateZIndex(canvas, getZIndexUpdates);
    //   updateFocus(canvas, getFocusUpdate);
    // }, 500);
    // intervalUsers = setInterval(() => {
    //   sendInfoUpdate(canvas, sendUsersUpdate, width, height);
    //   setUsersInfo(getUsersUpdate());
    //   if (followedUser) {
    //     const viewPortToFollow = [...followedUser.userInfo.viewport];
    //     const widthQuot = followedUser.userInfo.screenSize.width / width; // 2560 / 1366
    //     const heightQuot = followedUser.userInfo.screenSize.height / height; // 1440 / 768
    //     if (widthQuot >= heightQuot) {
    //       viewPortToFollow[0] /= widthQuot;
    //       viewPortToFollow[3] /= widthQuot;
    //       viewPortToFollow[4] /= widthQuot;
    //       viewPortToFollow[5] /= widthQuot;
    //     } else {
    //       viewPortToFollow[0] /= heightQuot;
    //       viewPortToFollow[3] /= heightQuot;
    //       viewPortToFollow[4] /= heightQuot;
    //       viewPortToFollow[5] /= heightQuot;
    //     }
    //     canvas.setViewportTransform(viewPortToFollow);
    //     setViewport(viewPortToFollow);
    //     updateMiniMapVP(miniMap, canvas);
    //   }
    // }, 125);
    return { canvas, cleanclbk };
  };

  /*
   * #########################################################################
   * #                                                                       #
   * #                                  RENDER                               #
   * #                                                                       #
   * #########################################################################
   */

  const boardRender = useMemo(() => displayBoard(), [board]);
  const userMouseRender = useMemo(
    () => displayUserMouse(usersInfo, viewport, classes),
    [usersInfo, viewport]
  );
  const minimapRender = useMemo(() => displayMiniMap(classes, showMiniMap), [
    showMiniMap
  ]);
  const leftBarRender = useMemo(() => displayLeftBar(board), [board, dragging]);
  const floatingBarRender = useMemo(
    () => displayFloatingBar(board, selection),
    [selection, board]
  );
  // const bubblesRender = useMemo(
  //   () => displayBubbles(classes, usersInfo, setShowPopup),
  //   [usersInfo]
  // );
  const zoomAndMapPanelRender = useMemo(
    () =>
      displayZoomAndMapPanel(
        board,
        viewport,
        setViewport,
        classes,
        showMiniMap,
        setShowMiniMap
      ),
    [board, showMiniMap, board, viewport]
  );

  return (
    <>
      {boardRender}
      {userMouseRender}
      {minimapRender}
      {leftBarRender}
      {floatingBarRender}
      {/* {bubblesRender} */}
      {/* {zoomAndMapPanelRender} */}
    </>
  );
};

/*
 * #########################################################################
 * #                                                                       #
 * #                           DISPLAY COMPONENTS                          #
 * #                                                                       #
 * #########################################################################
 */

const displayBoard = () => {
  return (
    <div>
      <canvas id="board" />
    </div>
  );
};

const displayUserMouse = (usersInfo, [zoom, , , , x, y], classes) => {
  return usersInfo.map(user => {
    const { mousePos: userMousePos } = user.userInfo;
    return (
      <div
        key={`mousePos${user._id}`}
        style={{
          position: 'absolute',
          left: userMousePos.x * zoom + x,
          top: userMousePos.y * zoom + y
        }}
      >
        <MouseCursor
          name={user.username}
          color="blue"
          fontColor="white"
          class={classes.userMouse}
          isHostPro={false}
        />
      </div>
    );
  });
};

const displayMiniMap = (classes, showMiniMap) => {
  const { mapContainer, mapContainerCollapse } = classes;
  let mapContainerClassName = {};
  if (!showMiniMap) {
    mapContainerClassName = `${mapContainer} ${mapContainerCollapse}`;
  } else {
    mapContainerClassName = mapContainer;
  }
  return (
    <>
      <div
        style={{ top: 'calc(90% - 92px)' }}
        className={mapContainerClassName}
      >
        <canvas id="miniMap" />
      </div>
    </>
  );
};

const displayZoomAndMapPanel = (
  board,
  viewport,
  setViewport,
  classes,
  showMiniMap,
  setShowMiniMap
) => {
  let zoom;
  let offsetX;
  let offsetY;
  if (viewport[0] === undefined) {
    zoom = 1;
    offsetX = window.innerWidth / 2;
    offsetY = window.innerHeight / 2;
  } else {
    zoom = viewport[0];
    offsetX = board.width / 2;
    offsetY = board.height / 2;
  }
  return (
    <div className={classes.zoomAndMapPanel}>
      {displayZoomButton(
        board,
        classes,
        { offsetX, offsetY, zoomValue: 1, imgSrc: minus, specProps: {} },
        setViewport
      )}
      <div
        className={classes.zoomAndMapPanelPart}
        style={{ width: 40, paddingTop: 2 }}
        onClick={() => {
          followedUser = null;
          setZoom(board, 1);
          stuffAfterZoomUpdate(board, setViewport);
          board.fire('customZoom');
        }}
      >
        {Math.floor(zoom * 100)}%
      </div>
      {displayZoomButton(
        board,
        classes,
        {
          offsetX,
          offsetY,
          zoomValue: -1,
          imgSrc: plus,
          specProps: {
            borderRight: '1px solid rgba(196, 196, 196, 1)'
          }
        },
        setViewport
      )}
      <Tooltip title="Full Screen" placement="bottom" arrow>
        <div
          style={{ width: '38px' }}
          onClick={handleFullScreen}
          className={classes.zoomAndMapPanelPart}
        >
          <img src={`/${fullScreen}`} />
        </div>
      </Tooltip>
      {displayMiniMapButton(classes, showMiniMap, setShowMiniMap)}
    </div>
  );
};

const displayZoomButton = (
  board,
  classes,
  { offsetX, offsetY, zoomValue, imgSrc, specProps },
  setViewport
) => {
  return (
    <div
      className={classes.zoomAndMapPanelPart}
      style={{ width: 30, fontSize: '20px', ...specProps }}
      onClick={() => {
        followedUser = null;
        updateZoom(board, zoomValue, offsetX, offsetY);
        stuffAfterZoomUpdate(board, setViewport);
        board.fire('customZoom');
      }}
    >
      <img src={`/${imgSrc}`} />
    </div>
  );
};

const displayMiniMapButton = (classes, showMiniMap, setShowMiniMap) => {
  let icon;
  let tooltipText;
  if (!showMiniMap) {
    icon = <img src={`/${expandMiniMap}`} />;
    tooltipText = 'Expand minimap';
  } else {
    icon = <img src={`/${closeMiniMap}`} />;
    tooltipText = 'Hide minimap';
  }
  return (
    <Tooltip title={tooltipText} placement="bottom" arrow>
      <div
        style={{ width: 25 }}
        className={classes.zoomAndMapPanelPart}
        onClick={() => setShowMiniMap(!showMiniMap)}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

const displayLeftBar = board => {
  let rightPosition;
  let topPosition;
  if (window.innerWidth < 1800 && window.innerWidth > 1500) {
    topPosition = '6%';
  } else if (window.innerWidth < 1500 && window.innerWidth > 1200) {
    rightPosition = '5px';
    topPosition = '4%';
  } else if (window.innerWidth < 1199) {
    rightPosition = '0';
    topPosition = '0';
  } else {
    topPosition = '15%';
    rightPosition = '10px';
  }

  if (board) {
    return (
      <div
        style={{
          position: 'absolute',
          left: rightPosition,
          top: topPosition
        }}
      >
        <LeftBar
          board={board}
          dragging={dragging}
          setSelected={slct => setSelected(board, slct)}
          setDragging={() => setDragging(board)}
          setDrawSize={fontSize => (board.freeDrawingBrush.width = fontSize)}
        />
      </div>
    );
  } else {
    return undefined;
  }
};

const displayFloatingBar = (board, { selected }) => {
  if (selected) {
    return (
      <FloatingBar
        bringToFrontOrBack={option =>
          bringToFrontOrBack(selected, board, option)
        }
        groupObjectsFuncs={{
          selectGroupObjects: groupIndex =>
            selectGroupObjects(board, groupIndex),
          verifyGroupConsistence: groupIndex =>
            verifyGroupConsistence(board, groupIndex),
          getNewGroupIndex: () => getNewGroupIndex(board)
        }}
        deleteItems={() => deleteItems(board, selected)}
        activeObj={selected.customControlTarget || selected}
        board={board}
      />
    );
  } else {
    return undefined;
  }
};

// const displayBubbles = (classes, usersInfo, setShowPopup) => {
//   return (
//     <div style={{ position: 'absolute', left: '150px', top: '15px' }}>
//       {usersInfo.map((usr, index) => (
//         <Fab
//           key={index}
//           aria-label="participantBubble"
//           className={classes.fab}
//           onClick={() => {
//             if (usr.userInfo?.viewport) {
//               followedUser = usr;
//             }
//           }}
//         >
//           {usr.username.slice(0, 2)}
//         </Fab>
//       ))}
//       <Fab
//         className={`${classes.fab} ${classes.addBubble} ${classes.safariOnly}`}
//         onClick={() => setShowPopup(true)}
//       >
//         +
//       </Fab>
//     </div>
//   );
// };

/*
 * #########################################################################
 * #                                                                       #
 * #                             BOARD EVENTS                              #
 * #                                                                       #
 * #########################################################################
 */

const handleMouseDown = (opt, board) => {
  followedUser = null;
  startDimensionningItem(board, itemCreation);
  if (dragging === true) {
    initPan(
      board,
      opt.e.clientX || opt.pointer.x,
      opt.e.clientY || opt.pointer.y
    );
  }
};

const handleMouseMove = (opt, board, setViewport) => {
  dimensionningItem(board);
  const { x, y } = board.getPointer(opt);
  mousePos.x = x;
  mousePos.y = y;
  if (board.isDragging) {
    board.setCursor('grabbing');
    handleTimeOut();
    updatePan(
      board,
      opt.e.clientX || opt.pointer.x,
      opt.e.clientY || opt.pointer.y
    );
    setViewport(board.viewportTransform);
    updateMiniMapVP(miniMap, board);
  }
};

const handleMouseUp = (board, getNextId) => {
  const data = endDimensionningItem(board);
  createItem(board, data, getNextId);
  handleTimeOut();
  board.setViewportTransform(board.viewportTransform);
  board.isDragging = false;
  board.selection = true;
};

const handleMouseWheel = (e, board, setViewport) => {
  e.preventDefault();
  e.stopPropagation();
  /**
   * means if you're not drawing
   */
  if (!(e.buttons === 1 && board.isDrawingMode)) {
    followedUser = null;
    handleTimeOut();
    updateZoom(board, e.deltaY, e.clientX, e.clientY);
    stuffAfterZoomUpdate(board, setViewport);
  }
};

const handleSelectionCreated = (e, board, selection, setSelection) => {
  checkLockItemsOnSelectionCreated(e, board);
  customControlsVisibilityStuffOnSelectionCreation(e);
  setSelectionControlsVisibility(board, e.target);
  setSelection({
    selected: board.getActiveObject(),
    updated: !selection.updated
  });
};

const handleSelectionUpdated = (e, board, selection, setSelection) => {
  updateIsCurrentFocus(e.deselected);
  customControlsVisibilityStuffOnSelectionUpdate(e, board);
  checkLockItemsOnSelectionUpdated(e, board);
  setSelectionControlsVisibility(board, e.target);
  setSelection({
    selected: board.getActiveObject(),
    updated: !selection.updated
  });
};

const handleSelectionCleared = (e, selection, setSelection) => {
  updateIsCurrentFocus(e.deselected);
  updateLinePointsOnSelectionCleared(e);
  customControlsVisibilityStuffOnSelectionClear(e);
  setSelection({ selected: null, updated: !selection.updated });
};

const handleObjectAdded = (e, board, { saveUpdate, getNextId }) => {
  const { _id, type } = e.target;
  if (type === 'path' && _id === undefined) {
    itemCreation = { remotingsType: 'draw' };
    createItem(board, e.target, getNextId);
    board.remove(e.target);
    board.requestRenderAll();
  }
  if (_id && _id === lastIdCreated) {
    // saveUpdate(_id, 'create', e.target);
    sortBoardZindexWithUpdate(board);
  }
  updateMiniMap(miniMap, board);
};

const handleObjectRemoved = (e, board, saveUpdate) => {
  if (e.target._id && !e.target.fromBack) {
    // saveUpdate(e.target._id, 'delete', e.target);
    sortBoardZindexWithUpdate(board);
  }
  updateMiniMap(miniMap, board);
};

const handleObjectModified = (e, board, saveUpdate) => {
  const object = e.target;
  if (object.type === 'activeSelection') {
    object._objects.forEach(obj => {
      const { left, top } = obj;
      obj.updatePosForMessage(object);
      // saveUpdate(obj._id, 'update', obj);
      obj.resetPosForMessage({ left, top });
    });
  } else {
    if (object._id) {
      const { group } = object;
      if (group?.type === 'activeSelection') {
        const { left, top } = object;
        object.updatePosForMessage(group);
        // saveUpdate(object._id, 'update', object);
        object.resetPosForMessage({ left, top });
      } else {
        // saveUpdate(object._id, 'update', object);
      }
    }
  }
  updateMiniMap(miniMap, board);
};

const handleKeyDown = (e, board, selection, setSelection) => {
  const activeObj = board.getActiveObject();
  if (e.shiftKey && !activeObj) {
    board.skipTargetFind = true;
  }
  const isBoardFocus =
    !document.activeElement.className.includes('Mui') &&
    document.activeElement.type !== 'text';
  switch (e.key) {
    case 's':
      if (!activeObj && isBoardFocus) {
        /**
         * the type is actually retrieved from the leftbar icon
         */
        itemCreation = {
          remotingsType: 'stickynote',
          type: document
            .getElementById('LbBtnStickyKey')
            .getElementsByTagName('path')[0].attributes[1].value
        };
        setCursor(board, 'stickynote');
      }
      break;
    case 't':
      if (!activeObj && isBoardFocus) {
        itemCreation = { remotingsType: 'text' };
        setCursor(board, 'text');
      }
      break;
    case 'i':
      if (!activeObj && isBoardFocus) {
        itemCreation = { remotingsType: 'imageshape' };
        setCursor(board, 'imageshape');
      }
      break;
    case 'a':
      if (e.ctrlKey && !activeObj && isBoardFocus) {
        e.preventDefault();
        board.discardActiveObject();
        const sel = new fabric.ActiveSelection(
          board
            .getObjects()
            .filter(
              obj =>
                !obj.customControlTarget &&
                focusArray.every(focused => focused._id !== obj._id)
            ),
          {
            canvas: board
          }
        );
        board.setActiveObject(sel);
        board.requestRenderAll();
      }
      break;
    case 'Escape':
      followedUser = null;
      board.discardActiveObject();
      itemCreation = null;
      setCursor(board, null);
      break;
    case 'Delete':
    case 'Backspace':
      if (
        activeObj?.remotingsType === 'text' &&
        activeObj?.isEditing === true
      ) {
        break;
      }
      if (activeObj && isBoardFocus) {
        deleteItems(board, activeObj);
      }
      break;
    case 'g':
      if (!activeObj && isBoardFocus) {
        showGrid = !showGrid;
      }
      break;
    case 'v':
      if (!activeObj && isBoardFocus && !e.ctrlKey) {
        setDragging(board);
      }
      break;
    case 'ArrowRight':
      moveWithArrowKeys(
        activeObj,
        {
          posName: 'left',
          sizeName: 'width',
          scaleName: 'scaleX',
          max: 3810,
          value: calcArrowKeyMoveValueDependingOnZoom(board.getZoom())
        },
        activeObj && isBoardFocus,
        board,
        selection,
        setSelection
      );
      break;
    case 'ArrowLeft':
      moveWithArrowKeys(
        activeObj,
        {
          posName: 'left',
          sizeName: 'width',
          scaleName: 'scaleX',
          max: 3810,
          value: -calcArrowKeyMoveValueDependingOnZoom(board.getZoom())
        },
        activeObj && isBoardFocus,
        board,
        selection,
        setSelection
      );
      break;
    case 'ArrowUp':
      moveWithArrowKeys(
        activeObj,
        {
          posName: 'top',
          sizeName: 'height',
          scaleName: 'scaleY',
          max: 2130,
          value: -calcArrowKeyMoveValueDependingOnZoom(board.getZoom())
        },
        activeObj && isBoardFocus,
        board,
        selection,
        setSelection
      );
      break;
    case 'ArrowDown':
      moveWithArrowKeys(
        activeObj,
        {
          posName: 'top',
          sizeName: 'height',
          scaleName: 'scaleY',
          max: 2130,
          value: calcArrowKeyMoveValueDependingOnZoom(board.getZoom())
        },
        activeObj && isBoardFocus,
        board,
        selection,
        setSelection
      );
      break;
    case '-':
    case '+':
      if (e.ctrlKey) {
        e.preventDefault();
      }
      break;
    default:
      break;
  }
};

const calcArrowKeyMoveValueDependingOnZoom = zoom => {
  if (zoom < 0.5) {
    return 10;
  } else if (zoom < 1) {
    return 5;
  } else {
    return 1;
  }
};

const moveWithArrowKeys = (
  target,
  stuff,
  condition,
  board,
  selection,
  setSelection
) => {
  if (condition && !(target.remotingsType === 'text' && target.isEditing)) {
    if (target.customControlTarget) {
      target = target.customControlTarget;
    }
    target.moveWithArrowKeys(target, stuff);
    board.fire('object:modified', { target });
    setSelection({
      selected: board.getActiveObject(),
      updated: !selection.updated
    });
  }
};

const handleKeyUp = (e, board) => {
  if (!e.shiftKey && !dragging) {
    board.skipTargetFind = false;
  }
};

/*
 * #########################################################################
 * #                                                                       #
 * #                                 UTILS                                 #
 * #                                                                       #
 * #########################################################################
 */

/**
 * createItem is used to create new items
 * the global var itemCreation needs a value to know which item to create
 * the global var itemCreation is resetted at the end of the function
 * the item add itself to the board
 * @param {*} board is the board
 * @param {*} e is the event param from mouse down
 * @param {*} data is the data package to add during items' init
 */
const createItem = (board, data, getNextId, fromCopy) => {
  if (itemCreation || fromCopy) {
    let remotingsType, type, obj;
    if (fromCopy) {
      remotingsType = data.remotingsType;
    } else {
      remotingsType = itemCreation.remotingsType;
      type = itemCreation.type;
    }
    let _id;
    if (data?._id) {
      _id = data._id;
    } else {
      _id = getNextId();
      lastIdCreated = _id;
    }
    switch (remotingsType) {
      case 'stickynote':
        obj = StickyNote({ board, data, _id });
        break;
      case 'text':
        obj = Text({ board, data, _id });
        break;
      case 'rectshape':
        obj = RectShape({ board, data, _id });
        break;
      case 'circleshape':
        obj = CircleShape({ board, data, _id });
        break;
      case 'imageshape':
        obj = ImageShape({ board, data, _id });
        break;
      case 'lineshape':
        obj = LineShape({ board, data, _id });
        break;
      case 'arrowshape':
        obj = ArrowShape({ board, data, _id });
        break;
      case 'frameshape':
        obj = FrameShape({ board, data, type });
        break;
      case 'draw':
        obj = Draw({ board, data, _id });
        break;
      default:
        break;
    }
    itemCreation = null;
    setCursor(board, null);
    if (
      !data._id &&
      !['text', 'stickynote', 'frameshape'].includes(remotingsType)
    ) {
      board.discardActiveObject();
    }
    if (
      !fromCopy &&
      !data._id &&
      ['text', 'stickynote'].includes(remotingsType)
    ) {
      board.setActiveObject(obj);
      obj.enterEdit();
    }
  }
};

/**
 * deleteItems is used to delete items
 * if the current active objects (cao) is an activeSelection
 *  we go though its prop _objects to delete each item one by one
 *  then we discard the cao to remove the activeSelection rect
 * if the cao is a line or arrow custom control
 *  we remove the customcontrols using the associated func (setCustomControlsVisibility())
 *  then we remove the line / arrow
 * @param {*} board is the board
 * @param {*} activeObj is the current active object
 */

const deleteItems = (board, activeObj, fromBack) => {
  if (fromBack) {
    activeObj = board
      .getObjects()
      .filter(elem => elem._id === activeObj._id)[0];
    activeObj.fromBack = true;
  }
  if (activeObj.type === 'activeSelection') {
    activeObj._objects.forEach(obj => board.remove(obj));
    board.discardActiveObject();
  } else {
    if (activeObj.customControlTarget) {
      activeObj = activeObj.customControlTarget;
      activeObj.setCustomControlsVisibility(false);
    }
    board.remove(activeObj);
  }
};

/**
 * setSelected is used for interactions between board and leftbar
 * @param {*} board is the board
 * @param {*} slct is the type of the action (draw, stickynote, ...)
 */
const setSelected = (board, slct) => {
  if (slct === 'draw') {
    itemCreation = null;
    board.set('isDrawingMode', true);
    setCursor(board, null);
  } else if (!slct) {
    itemCreation = null;
    board.skipTargetFind = false;
    board.set('isDrawingMode', false);
    setCursor(board, null);
  } else {
    board.skipTargetFind = true;
    board.set('isDrawingMode', false);
    itemCreation = slct;
    setCursor(board, itemCreation.remotingsType);
  }
};

const handleFullScreen = () => {
  const elem = document.documentElement;
  if (
    !document.fullScreen &&
    !document.mozFullScreen &&
    !document.webkitIsFullScreen
  ) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
};

/**
 * setDragging is used to set the dragging board boolean to true or false
 * @param {*} board is the board
 */
const setDragging = board => {
  dragging = !dragging;
  board.set('skipTargetFind', dragging);
  if (!dragging) {
    setCursor(board, null);
  } else {
    setCursor(board, 'drag');
  }
  board.set('isDrawingMode', false);
};

/**
 * handleTimeOut is used to regulate time between zoom requests
 */
const handleTimeOut = () => {
  clearTimeout(timeoutZoom);
  fabric.Object.prototype.objectCaching = false;
  timeoutZoom = setTimeout(
    () => (fabric.Object.prototype.objectCaching = true),
    500
  );
};

/**
 * computerGridSize is used to compute which grid image to display
 * @param {*} width is the width of the board view
 * @param {*} zoom is the current board zoom
 */
const computeGridSize = (width, zoom) => {
  const value = Math.round(width / zoom / 960);
  return Math.min(value, 5);
};

const displayAllItemsOnInit = board => {
  const { width, height } = board;
  let left = 3840;
  let top = 2160;
  let maxX = -3840;
  let maxY = -2160;

  board._objects.forEach(elem => {
    if (elem.left < left) {
      left = elem.left;
    }
    if (elem.top < top) {
      top = elem.top;
    }
    if (elem.left + elem.width > maxX) {
      maxX = elem.left + elem.width;
    }
    if (elem.top + elem.height > maxY) {
      maxY = elem.top + elem.height;
    }
  });

  const calcMinMaxZoom = () => {
    if (width <= 1920 && width > 1280) {
      return { min: 0.25, max: 4.004 };
    } else if (width <= 1280) {
      return { min: 0.16, max: 1.4 };
    } else {
      return { min: (width / 1280) * 0.25, max: (width / 1280) * 4.004 };
    }
  };

  let zoom = Math.min(
    width / Math.abs(maxX - left),
    height / Math.abs(maxY - top)
  );
  zoom = Math.min(
    calcMinMaxZoom().max,
    Math.max(calcMinMaxZoom().min, zoom - zoom * 0.25)
  );

  const vpt = board.viewportTransform;

  vpt[0] = zoom;
  vpt[3] = zoom;
  vpt[4] = Math.min(left, maxX) * -1 * zoom + width * 0.1;
  vpt[5] = Math.min(top, maxY) * -1 * zoom + width * 0.1;

  clampViewport(board, width, height);
  if (showGrid) {
    board.backgroundColor = grids[computeGridSize(width, zoom)];
  }
  updateMiniMapVP(miniMap, board);
};

/**
 * updateGrid is used to update the grid if necessary
 * @param {*} board is the board
 */
const updateGrid = board => {
  const newGridSize = computeGridSize(board.width, board.getZoom());
  if (currentGridSize !== newGridSize) {
    currentGridSize = newGridSize;
    if (showGrid) {
      board.backgroundColor = grids[currentGridSize];
    }
  }
};

/**
 * stuffAfterZoomUpdate is used to :
 *   - update grid,
 *   - update viewport state,
 *   - updateMinimap viewport
 * @param {*} board is the board
 * @param {*} setViewport viewport setState
 */
const stuffAfterZoomUpdate = (board, setViewport) => {
  updateGrid(board);
  setViewport(board.viewportTransform);
  updateMiniMapVP(miniMap, board);
};

/**
 * updateItems is used to apply items modification called by the websockets
 * updateItems is called each time the user is messaged by the websockets for item modification
 * @param {*} board is the board
 * @param {*} arrayOfBack is the props updated by boardFabric when websockets are messaged for item modification
 * @param {*} getNextId is the callback to get the id of the next item to be created
 */
const updateItems = (board, getItemsFromBack) => {
  const arrayOfBack = getItemsFromBack();
  if (arrayOfBack.length !== 0) {
    arrayOfBack.forEach(obj => {
      const { method, items, _id } = obj;
      const { remotingsType } = items;
      items._id = _id;
      switch (method) {
        case 'create':
          itemCreation = { remotingsType };
          createItem(board, items, undefined);
          break;
        case 'delete':
          deleteItems(board, items, true);
          break;
        case 'update':
          const itemToUpdate = board.getObjects().filter(o => o._id === _id)[0];
          itemToUpdate.update(items);
          updateMiniMap(miniMap, board);
          break;
        default:
          break;
      }
    });
    board.requestRenderAll();
  }
};

/**
 * check if the current selection has a member of a group
 * if true: select all the group
 * @param {*} board is the board
 * @param {*} groupIndex is the groupIndex of the item currently selected
 */
const selectGroupObjects = (board, groupIndex) => {
  if (groupIndex !== undefined) {
    const toSel = getGroupObjects(board, groupIndex);
    if (toSel.length !== 1) {
      if (board.getActiveObject().type === 'activeSelection') {
        const { _objects: activeObjs } = board.getActiveObject();
        const toAddInSel = toSel.filter(obj => !activeObjs.includes(obj));
        if (toAddInSel.length !== 0) {
          toAddInSel.forEach(obj => board.getActiveObject().addWithUpdate(obj));
        }
      } else {
        const sel = new fabric.ActiveSelection(toSel, { canvas: board });
        board.discardActiveObject();
        board.setActiveObject(sel);
      }
      board.requestRenderAll();
    }
  }
};

/**
 * verifyGroupConsistence is used to check if the group has
 * more than one object inside, if not we kick the last remaining
 * @param {*} board is the board
 * @param {*} groupIndex is the index of the group we are looking for
 */
const verifyGroupConsistence = (board, groupIndex) => {
  const groupMembers = board
    .getObjects()
    .filter(obj => getItemGroupIndex(obj) === groupIndex);
  if (groupMembers.length === 1) {
    if (groupMembers[0].type === 'group') {
      groupMembers[0].item(0).set('groupIndex', undefined);
    } else {
      groupMembers[0].set('groupIndex', undefined);
    }
    board.fire('object:modified', { target: groupMembers[0] });
  }
};

const getNewGroupIndex = board => {
  const groupIndexArr = [];
  board.getObjects().forEach(obj => {
    let groupIndex;
    if (obj.type === 'group') {
      groupIndex = obj.item(0).groupIndex;
    } else {
      groupIndex = obj.groupIndex;
    }
    if (
      groupIndex !== undefined &&
      !isNaN(parseInt(groupIndex, 10)) &&
      !groupIndexArr.includes(groupIndex)
    ) {
      groupIndexArr.push(groupIndex);
    }
  });
  groupIndexArr.sort((a, b) => a - b);
  if (groupIndexArr[0] !== undefined && parseInt(groupIndexArr[0], 10) === 0) {
    for (let i = 0; i < groupIndexArr.length - 1; i++) {
      if (groupIndexArr[i + 1] !== groupIndexArr[i] + 1) {
        return i + 1;
      }
    }
    return groupIndexArr.length;
  } else {
    return 0;
  }
};

/**
 * animate opacity of objs
 * @param {*} board is the board
 * @param {*} objs are the objects to be animate
 */
const startAnimeObjects = (board, objs) => {
  objs.forEach(obj => {
    if (obj.remotingsType !== 'imageshape') {
      opacityAnime(obj, board);
    } else {
      startCustomAnime(obj);
    }
  });
};

/**
 * animate opacity of obj
 * @param {*} board is the board
 * @param {*} obj is the obj to be animate
 */
const opacityAnime = (obj, board) => {
  obj.animate('opacity', 0, {
    from: 1,
    onChange: board.renderAll.bind(board),
    duration: 500,
    onComplete: () =>
      obj.animate('opacity', 1, {
        onChange: board.renderAll.bind(board),
        duration: 500,
        onComplete: () => obj.set('opacity', 1)
      })
  });
};

const startCustomAnime = obj => {
  let customAnime;
  let opacity = 1;
  customAnime = setInterval(() => {
    opacity -= 0.083;
    obj.set({ opacity });
  }, 42);
  setTimeout(() => {
    clearInterval(customAnime);
    customAnime = setInterval(() => {
      opacity += 0.083;
      obj.set({ opacity });
    }, 42);
    setTimeout(() => {
      clearInterval(customAnime);
      obj.set('opacity', 1);
    }, 500);
  }, 500);
};

/**
 * find, in the board, objects with the groupIndex passed as parameter
 * @param {*} board is the board
 * @param {*} groupIndex is the groupIndex of the item currently selected
 * @returns array of objects with the groupIndex passed as parameter
 */
const getGroupObjects = (board, groupIndex) => {
  return board.getObjects().filter(obj => {
    const objGroupIndex = getItemGroupIndex(obj);
    return objGroupIndex !== undefined && objGroupIndex === groupIndex;
  });
};

const getItemGroupIndex = object => {
  if (object.customControlTarget) {
    return object.customControlTarget.groupIndex;
  } else if (object.type === 'group') {
    return object.item(0).groupIndex;
  } else {
    return object.groupIndex;
  }
};

const hasAGroupAndTheSameAs = (objGroupIndex, comparedTo) =>
  objGroupIndex && objGroupIndex === comparedTo;

const getNotFocusedByOthersInSelection = (activeObj, focuss) => {
  if (activeObj.type === 'activeSelection') {
    return activeObj._objects.filter(obj => !focuss.includes(obj._id));
  } else {
    if (
      (activeObj.customControlTarget &&
        !focuss.includes(activeObj.customControlTarget._id)) ||
      !focuss.includes(activeObj._id)
    ) {
      return [activeObj];
    } else {
      return [];
    }
  }
};

/**
 * checkLockItemsOnSelectionCreated is used to remove lock items from selection
 * @param {*} e is the event parameter
 * @param {*} board is the board
 */
const checkLockItemsOnSelectionCreated = (e, board) => {
  const activeObj = board.getActiveObject();
  const firstItemGroupIndex = getItemGroupIndex(e.selected[0]);
  if (
    e.selected.some(
      obj => !hasAGroupAndTheSameAs(getItemGroupIndex(obj), firstItemGroupIndex)
    ) &&
    (activeObj.type === 'activeSelection' ||
      (e.selected[0].lockState && e.e?.shiftKey))
  ) {
    const { _objects: activeObjs } = activeObj;
    const noLockItems = activeObjs.filter(obj => !obj.lockState);
    if (noLockItems.length !== activeObjs.length && noLockItems.length !== 0) {
      if (noLockItems.length > 1) {
        activeObjs.forEach(obj => {
          if (!noLockItems.includes(obj)) {
            board.getActiveObject().removeWithUpdate(obj);
          }
        });
      } else {
        board.discardActiveObject();
        board.setActiveObject(noLockItems[0]);
      }
    }
  }
};

/**
 * isCurrentFocus is used on groups to enable one click edit properly
 * @param {*} deselected are deselected items on selection cleared / updated
 */
const updateIsCurrentFocus = deselected =>
  deselected?.forEach(obj => {
    if (obj._id && ['group', 'textbox'].includes(obj.type)) {
      obj.isCurrentFocus = false;
    }
  });

/**
 * checkLockItemsOnSelectionUpdated is used to remove lock items from selection
 * @param {*} e is the event parameter
 * @param {*} board is the board
 */
const checkLockItemsOnSelectionUpdated = (e, board) => {
  const activeObj = board.getActiveObject();
  if (activeObj?.type === 'activeSelection') {
    const activeObjs = activeObj._objects;
    const firstItemGroupIndex = getItemGroupIndex(activeObjs[0]);
    if (
      e.e?.shiftKey &&
      activeObjs.some(obj => obj.lockState) &&
      activeObjs.some(
        obj =>
          !hasAGroupAndTheSameAs(getItemGroupIndex(obj), firstItemGroupIndex)
      )
    ) {
      let sel;
      if (
        activeObjs.length === 2 &&
        activeObjs.filter(obj => obj !== e.selected[0])[0].lockState
      ) {
        /**
         * means that before update, focus was a locked item only
         * so we change the focus to the new item
         */
        if (e.selected[0].customControlTarget) {
          sel = e.selected[0].customControlTarget;
        } else {
          sel = e.selected[0];
        }
      } else {
        if (e.selected[0]) {
          const selectedGroupIndex = getItemGroupIndex(e.selected[0]);
          if (
            e.selected[0].lockState ||
            activeObjs.some(
              obj => getItemGroupIndex(obj) !== selectedGroupIndex
            )
          ) {
            /**
             * means that the new selected item is locked
             * so we remove it from the selection
             */
            activeObj.removeWithUpdate(e.selected[0]);
            if (activeObjs.length === 1) {
              /**
               * means that there is only one item still in the activeSelection
               * so we focus the item directly
               */
              sel = activeObjs[0];
            }
          }
        }
      }
      if (sel) {
        board.discardActiveObject();
        board.setActiveObject(sel);
      }
    }
  }
};

const updateFocus = (board, getFocusUpdate) => {
  const newFocusArray = getFocusUpdate();
  newFocusArray.forEach(focus => {
    const match = board
      .getObjects()
      .filter(
        obj =>
          obj._id === focus._id &&
          focusArray.every(lastFocus => lastFocus._id !== obj._id)
      )[0];
    if (match) {
      match.setFocusByOther(true);
    }
  });
  const notFocusAnymore = focusArray.filter(lastFocus =>
    newFocusArray.every(newFocus => newFocus._id !== lastFocus._id)
  );
  notFocusAnymore.forEach(obj => {
    const match = board
      .getObjects()
      .filter(boardObj => obj._id === boardObj._id)[0];
    if (match) {
      drawBoundingRectBorder(board, match, 'rgba(0,0,0,0)');
      match.setFocusByOther(false);
    }
  });
  const activeObj = board.getActiveObject();
  if (activeObj) {
    const notFocusedByOthers = getNotFocusedByOthersInSelection(
      activeObj,
      newFocusArray
    );
    if (notFocusedByOthers.length !== 0) {
      if (
        activeObj.type === 'activeSelection' &&
        notFocusedByOthers.length !== activeObj._objects.length
      ) {
        if (notFocusedByOthers.length > 1) {
          activeObj._objects
            .filter(obj => notFocusedByOthers.every(focused => focused !== obj))
            .forEach(notFocused => activeObj.removeWithUpdate(notFocused));
        } else {
          board.discardActiveObject();
          board.setActiveObject(notFocusedByOthers[0]);
        }
      }
    } else {
      board.discardActiveObject();
    }
  }
  focusArray = newFocusArray;
};

const updateFocusedBorders = (board, focuss) => {
  focuss.forEach(focused => {
    const match = board.getObjects().filter(obj => obj._id === focused._id)[0];
    if (match) {
      drawBoundingRectBorder(board, match, focused.color);
    }
  });
};

const drawBoundingRectBorder = (board, obj, color) => {
  board.contextContainer.strokeStyle = color;
  board.contextContainer.lineWidth = 3;
  const corners = obj.calcCoords();
  const { tl, tr, bl, br } = corners;
  const minX = Math.min(tl.x, Math.min(tr.x, Math.min(bl.x, br.x)));
  const minY = Math.min(tl.y, Math.min(tr.y, Math.min(bl.y, br.y)));
  const maxX = Math.max(tl.x, Math.max(tr.x, Math.max(bl.x, br.x)));
  const maxY = Math.max(tl.y, Math.max(tr.y, Math.max(bl.y, br.y)));
  board.contextContainer.strokeRect(minX, minY, maxX - minX, maxY - minY);
  board.requestRenderAll();
};

const firstZIndex = (board, arrayOfZIndex) => {
  const length = board.getObjects().filter(obj => obj._id);
  if (length.length >= arrayOfZIndex.length) {
    if (timeoutZIndex !== 'Done') {
      clearTimeout(timeoutZIndex);
    }
    timeoutZIndex = 'Done';
    sortBoardFromArray(board, arrayOfZIndex);
  } else {
    clearTimeout(timeoutZIndex);
    timeoutZIndex = setTimeout(() => firstZIndex(board, arrayOfZIndex), 200);
  }
};

const updateZIndex = (board, getZIndexUpdates) => {
  const arrayOfZIndex = getZIndexUpdates()?.zIndex;
  if (arrayOfZIndex) {
    if (firstLaunch === 0) {
      displayAllItemsOnInit(board);
    }
    if (timeoutZIndex !== 'Done') {
      firstZIndex(board, arrayOfZIndex);
    } else {
      sortBoardFromArray(board, arrayOfZIndex);
    }
    firstLaunch = 1;
  }
};

const sendInfoUpdate = (board, sendUsersUpdate, width, height) => {
  const vpt = board.viewportTransform;
  const body = {
    mousePos,
    viewport: vpt,
    screenSize: {
      width,
      height
    }
  };
  sendUsersUpdate(body);
};

export default Board;
