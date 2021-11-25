// Import Utils
import COLORS from '../Utils/Colors';

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
          fontSize: 16,
          fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
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
      fontSize: 16,
      fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace'
    }
  };
};

export default styleLanguageSelect;
