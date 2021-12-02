// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';

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
        fontSize: FONTSIZES.md,
        fontFamily: FONTFAMILIES.mono,
        '&:hover': { color: COLORS.green }
      }
    }
  };
};

export default styleScrollToButton;
