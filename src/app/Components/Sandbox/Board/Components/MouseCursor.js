import React from 'react';
import Cursor from './Icons/Cursor';
import mouseCursorStyle from './StyleSheets/mouseCursorStyle.jss';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(mouseCursorStyle);

const MouseCursor = function ({ name, color, fontColor, isHostOrPro }) {
  const classes = useStyles();

  let border;

  if (isHostOrPro) {
    border = '1px solid rgb(16, 37, 66)';
  }
  return (
    <div className={classes.root}>
      <Cursor fill={color} isHostOrPro={isHostOrPro} />
      {name && (
        <div
          className={`${classes.name} ${classes.safariOnly}`}
          style={{ backgroundColor: color, color: fontColor, border }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default MouseCursor;
