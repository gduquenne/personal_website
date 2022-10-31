// const fireZIndexArray = board => {
//   const objects = board.getObjects().filter(obj => obj._id);
//   const zIndexArray = [];
//   objects.forEach(obj => {
//     const item = {
//       zIndex: obj.zIndex,
//       _id: obj._id
//     };
//     zIndexArray.push(item);
//   });
//   zIndexArray.sort((a, b) => a.zIndex - b.zIndex);
//   board.fire('zIndex:updated', { target: zIndexArray });
// };

const bringToFrontOrBack = (selection, board, option) => {
  if (selection.type !== 'activeSelection') {
    bringToFrontOrBackObject(selection, board, option);
  } else {
    selection._objects.forEach(obj => {
      bringToFrontOrBackObject(obj, board, option);
    });
  }
  if (option === 'sendBackwards') {
    board.discardActiveObject();
  }
  newZindexForObjects(board);
  // fireZIndexArray(board);
};

const bringToFrontOrBackObject = (object, board, option) => {
  if (object.customControlTarget) {
    object = object.customControlTarget;
  }
  if (option === 'bringForward') {
    board.bringToFront(object);
  } else {
    board.sendToBack(object);
  }
};

const sortBoardFromArray = (board, array) => {
  if (array) {
    const objects = board.getObjects();
    array.forEach(item => {
      objects
        ?.filter(obj => obj._id === item._id)[0]
        ?.set('zIndex', item.zIndex);
    });
    sortBoardZindex(board);
  }
};
const sortBoardZindexWithUpdate = board => {
  sortBoardZindex(board);
  // fireZIndexArray(board);
};

const sortBoardZindex = board => {
  board._objects.sort((a, b) => a.zIndex - b.zIndex);
  board.requestRenderAll();
};

const newZindexForObjects = board => {
  board.getObjects().forEach((item, index) => {
    item.set({ zIndex: index });
  });
};

const setZindex = (object, board) => {
  if (object.zIndex === undefined) {
    let max = 0;
    board.getObjects().forEach(item => {
      if (max < item.zIndex) {
        max = item.zIndex;
      }
    });
    object.set({ zIndex: max + 1 });
  }
};

export {
  bringToFrontOrBack,
  sortBoardZindexWithUpdate,
  sortBoardFromArray,
  setZindex
};
