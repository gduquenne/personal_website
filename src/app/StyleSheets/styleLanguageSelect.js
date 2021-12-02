// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';

const styleLanguageSelect = () => {
  return {
    select: {
      height: 30.75,
      '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        '& > div > span': {
          color: COLORS.green
        }
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        '& > span': {
          textTransform: 'none',
          fontSize: FONTSIZES.md,
          fontFamily: FONTFAMILIES.mono,
          color: COLORS.slate
        }
      },
      '& > svg[data-testid="ArrowDropDownIcon"]': {
        fill: COLORS.slate
      },
      '& > fieldset': {
        border: 'none'
      }
    },
    iconMenuItem: {
      marginRight: 10
    },
    textMenuItem: {
      textTransform: 'none',
      fontSize: FONTSIZES.md,
      fontFamily: FONTFAMILIES.mono
    }
  };
};

export default styleLanguageSelect;
