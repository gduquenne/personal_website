const clampViewport = canvas => {
  const { width, height } = canvas;
  const vpt = canvas.viewportTransform;
  if (vpt[4] / vpt[0] > 3840) {
    vpt[4] = 3840 * vpt[0];
  }
  if (vpt[4] / vpt[0] < -3840 + width / vpt[0]) {
    vpt[4] = (-3840 + width / vpt[0]) * vpt[0];
  }
  if (vpt[5] / vpt[3] > 2160) {
    vpt[5] = 2160 * vpt[3];
  }
  if (vpt[5] / vpt[3] < -2160 + height / vpt[3]) {
    vpt[5] = (-2160 + height / vpt[3]) * vpt[3];
  }
  canvas.setViewportTransform(vpt);
};

const updateZoom = (canvas, delta, x, y) => {
  const { width, height } = canvas;

  let zoom = canvas.getZoom();
  zoom *= 0.95 ** (Math.sign(delta) * 3);
  const minZoomW = width / 7640;
  const minZoomH = height / 4320;
  const maxZoomW = width / 250;
  const maxZoomH = height / 250;
  zoom = Math.max(minZoomW, Math.max(minZoomH, zoom));
  zoom = Math.min(maxZoomW, Math.min(maxZoomH, zoom));

  canvas.zoomToPoint({ x, y }, zoom);
  clampViewport(canvas);
};

const setZoom = (canvas, zoom) => {
  canvas.zoomToPoint(
    { x: canvas.viewportTransform[4], y: canvas.viewportTransform[5] },
    zoom
  );
  clampViewport(canvas);
};

const initPan = (canvas, x, y) => {
  canvas.isDragging = true;
  canvas.selection = false;
  canvas.lastPosX = x;
  canvas.lastPosY = y;
};

const updatePan = (canvas, x, y) => {
  const { width, height } = canvas;
  const vpt = canvas.viewportTransform;
  vpt[4] += x - canvas.lastPosX;
  vpt[5] += y - canvas.lastPosY;
  clampViewport(canvas, width, height);
  canvas.requestRenderAll();
  canvas.lastPosX = x;
  canvas.lastPosY = y;
};

export { initPan, updatePan, updateZoom, clampViewport, setZoom };
