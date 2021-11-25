// Import Utils
import COLORS from '../Utils/Colors';

const styleScrollToButton = ({ selected }) => {
  let color;
  if (selected) {
    color = COLORS.green;
  } else {
    color = COLORS.slate;
  }
  return {
    btn: {
      '&.MuiButton-root': {
        color,
        textTransform: 'none',
        fontSize: 16,
        fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
        '&:hover': { color: COLORS.green }
      }
    }
  };
};

export default styleScrollToButton;
