import React from 'react';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import Slider from '@material-ui/core/Slider';

// Style Component
import floatingBarStyles from '../../StyleSheets/styleFloatingBar.js';

// Import Texts
import textRm from '../../../Texts/textFloatingBar';

const useStyles = makeStyles(floatingBarStyles);

const extractOpacityFromRGBA = fill =>
  parseFloat(fill.substring(5).replace(')', '').split(',')[3]);

const OpacityOptions = ({ currentFill, setStyle, language }) => {
  const classes = useStyles();
  const { sliderDiv, sliderLabel, sliderPercent } = classes;
  let currentSize;
  if (Array.isArray(currentFill)) {
    const opacityArray = currentFill.map(fill => extractOpacityFromRGBA(fill));
    if (opacityArray.every(opacity => opacity === opacityArray[0])) {
      currentSize = 100 - Math.trunc(opacityArray[0] * 100);
    } else {
      currentSize = 0;
    }
  } else {
    currentSize = 100 - Math.trunc(extractOpacityFromRGBA(currentFill) * 100);
  }

  return (
    <div className={sliderDiv}>
      <Slider
        value={currentSize}
        onChange={(_, newValue) => {
          const newOpacity = (100 - newValue) / 100;
          if (Array.isArray(currentFill)) {
            setStyle(
              'fill',
              currentFill.map(fill => calcObjOpacity(newOpacity, fill))
            );
          } else {
            setStyle('fill', calcObjOpacity(newOpacity, currentFill));
          }
        }}
        aria-labelledby="input-slider"
      />
      <div className={sliderLabel}>{textRm.transparency[language]}</div>
      <div className={sliderPercent}> {`${currentSize}%`}</div>
    </div>
  );
};

const calcObjOpacity = (newOpacity, currentFill) => {
  const rIndex = 0;
  const gIndex = 1;
  const bIndex = 2;
  const subRgba = 5;
  const rgbWanted = currentFill.substring(subRgba).replace(')', '').split(',');
  const r = parseInt(rgbWanted[rIndex], 10);
  const g = parseInt(rgbWanted[gIndex], 10);
  const b = parseInt(rgbWanted[bIndex], 10);
  return ['rgba(', r, ', ', g, ', ', b, ', ', newOpacity, ')'].join('');
};

export default OpacityOptions;
