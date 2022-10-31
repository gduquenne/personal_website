const thumbnailCreation = (board, sendNewThumbnail, grids, currentGridSize) => {
  board.backgroundColor = 'white';
  let left = 3840;
  let top = 2160;
  let maxX = -3840;
  let maxY = -2160;
  board.getObjects().forEach(elem => {
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
  let width = maxX + Math.abs(maxX * 0.1) - left;
  let height = maxY + Math.abs(maxY * 0.1) - top;
  left -= Math.abs(0.1 * left);
  top -= Math.abs(0.1 * top);
  if (width / 16 > height / 9) {
    const newHeight = (width / 16) * 9;
    const diff = height - newHeight;
    top += diff / 2;
    height = newHeight;
  } else {
    const newWidth = (height / 9) * 16;
    const diff = width - newWidth;
    left += diff / 2;
    width = newWidth;
  }
  const vpt = [...board.viewportTransform];
  board.viewportTransform = [1, 0, 0, 1, 0, 0];
  let quality = 0.1;
  sendNewThumbnail(
    board.toDataURL({
      left,
      top,
      width,
      height,
      quality,
      format: 'jpeg'
    })
  );
  board.viewportTransform = vpt;
  board.backgroundColor = grids[currentGridSize];
};

export { thumbnailCreation };
