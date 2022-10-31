import { fabric } from 'fabric';

const toFixed = fabric.util.toFixed;

const toObject = function (propertiesToInclude) {
  const NUM_FRACTION_DIGITS = fabric.Object.NUM_FRACTION_DIGITS;
  let object = {
    type: this.type,
    version: fabric.version,
    originX: this.originX,
    originY: this.originY,
    left: toFixed(this.left, NUM_FRACTION_DIGITS),
    top: toFixed(this.top, NUM_FRACTION_DIGITS),
    width: toFixed(this.width, NUM_FRACTION_DIGITS),
    height: toFixed(this.height, NUM_FRACTION_DIGITS),
    fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
    stroke:
      this.stroke && this.stroke.toObject
        ? this.stroke.toObject()
        : this.stroke,
    strokeWidth: toFixed(this.strokeWidth, NUM_FRACTION_DIGITS),
    strokeDashArray: this.strokeDashArray
      ? this.strokeDashArray.concat()
      : this.strokeDashArray,
    strokeLineCap: this.strokeLineCap,
    strokeDashOffset: this.strokeDashOffset,
    strokeLineJoin: this.strokeLineJoin,
    strokeUniform: this.strokeUniform,
    strokeMiterLimit: toFixed(this.strokeMiterLimit, NUM_FRACTION_DIGITS),
    scaleX: toFixed(this.scaleX, NUM_FRACTION_DIGITS),
    scaleY: toFixed(this.scaleY, NUM_FRACTION_DIGITS),
    angle: toFixed(this.angle, NUM_FRACTION_DIGITS),
    flipX: this.flipX,
    flipY: this.flipY,
    opacity: toFixed(this.opacity, NUM_FRACTION_DIGITS),
    shadow:
      this.shadow && this.shadow.toObject
        ? this.shadow.toObject()
        : this.shadow,
    visible: this.visible,
    backgroundColor: this.backgroundColor,
    fillRule: this.fillRule,
    globalCompositeOperation: this.globalCompositeOperation,
    skewX: toFixed(this.skewX, NUM_FRACTION_DIGITS),
    skewY: toFixed(this.skewY, NUM_FRACTION_DIGITS)
  };
  const extendedFields = [
    'lockMovementX',
    'lockMovementY',
    'hasControls',
    'lockScaling',
    'lockRotation',
    'lockState',
    'remotingsType',
    'borderColor',
    'verticalAlign',
    'prevFont'
  ];
  extendedFields.forEach(extendedField => {
    if (this[extendedField] !== undefined) {
      object[extendedField] = this[extendedField];
    }
  });
  if (this.type !== 'group') {
    /**
     * used to delete error, group shouldn't have groupIndex
     */
    object.groupIndex = this.groupIndex;
  }
  if (this.remotingsType === 'lineshape') {
    object.linePoints = [this.x1, this.y1, this.x2, this.y2];
  }
  if (this.remotingsType === 'arrowshape') {
    object.linePoints = [
      this.points[0].x,
      this.points[0].y,
      this.points[1].x,
      this.points[1].y
    ];
  }

  if (this.clipPath) {
    object.clipPath = this.clipPath.toObject(propertiesToInclude);
    object.clipPath.inverted = this.clipPath.inverted;
    object.clipPath.absolutePositioned = this.clipPath.absolutePositioned;
  }

  fabric.util.populateWithProperties(this, object, propertiesToInclude);
  if (!this.includeDefaultValues) {
    object = this._removeDefaultValues(object);
  }

  return { ...object };
};

export { toObject };
