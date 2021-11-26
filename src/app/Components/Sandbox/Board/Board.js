// Import Core
import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

const Board = () => {
  const [board, setBoard] = useState();
  useEffect(() => {
    setBoard(initBoard());
  }, []);
  const initBoard = () => {
    const canvas = new fabric.Canvas('board', {
      height: 200,
      width: 400,
      centeredRotation: true,
      freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 })
    });
    return canvas;
  };
  return (
    <div>
      <canvas id="board"></canvas>
    </div>
  );
};

export default Board;
