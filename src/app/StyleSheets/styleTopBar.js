// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';

const styleTopBar = ({ allocatedWidth }) => {
  return {
    topBar: {
      display: 'flex',
      alignItems: 'center',
      color: '#bbc6e5',
      backgroundColor: 'rgba(10, 25, 47, 0.8)',
      width: allocatedWidth,
      height: 70,
      top: 0,
      position: 'fixed',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.2)'
    },
    nameContainer: {
      padding: '0 10px 0 20px',
      color: COLORS.lightSlate,
      textTransform: 'none',
      fontSize: FONTSIZES.md,
      fontFamily: FONTFAMILIES.mono
    },
    buttonsContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px'
    },
    buttonContainer: {
      marginRight: 20
    },
    icon: {
      stroke: COLORS.green,
      strokeWidth: 2,
      fill: 'none',
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.1)'
      }
    }
  };
};

export default styleTopBar;
