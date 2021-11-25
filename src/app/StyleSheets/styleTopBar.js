// Import Utils
import COLORS from '../Utils/Colors';

// fontFamily: 'Calibre, Inter, San Francisco, SF Pro Text, -apple-system,system-ui,sans-serif',

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
      fontSize: 16,
      fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace'
    },
    buttonsContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px'
    },
    buttonContainer: {
      marginRight: 20
    }
  };
};

export default styleTopBar;
