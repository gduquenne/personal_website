import {
  createControl,
  resizeHeight,
  resizeWidth,
  resizeWidthHeight
} from './GlobalControls';

/*
 * #########################################################################
 * #                                                                       #
 * #                         FRAME CUSTOM CONTROLS                         #
 * #                                                                       #
 * #########################################################################
 */

const resizeWidthHeightFrameRatio = (_, transform, x, y) => {
  const { width, height } = transform.target;
  resizeWidthHeight(null, transform, x, y, width / height);
  return true;
};

/*
 * #########################################################################
 * #                                                                       #
 * #                                  INIT                                 #
 * #                                                                       #
 * #########################################################################
 */

const controls = {
  ml: createControl(-0.5, 0, resizeWidth),
  mr: createControl(0.5, 0, resizeWidth),
  mb: createControl(0, 0.5, resizeHeight),
  mt: createControl(0, -0.5, resizeHeight),
  tl: createControl(-0.5, -0.5, resizeWidthHeight),
  tr: createControl(0.5, -0.5, resizeWidthHeight),
  bl: createControl(-0.5, 0.5, resizeWidthHeight),
  br: createControl(0.5, 0.5, resizeWidthHeight)
};

const keepRatioControls = {
  tl: createControl(-0.5, -0.5, resizeWidthHeightFrameRatio),
  tr: createControl(0.5, -0.5, resizeWidthHeightFrameRatio),
  bl: createControl(-0.5, 0.5, resizeWidthHeightFrameRatio),
  br: createControl(0.5, 0.5, resizeWidthHeightFrameRatio)
};

export { controls, keepRatioControls };
