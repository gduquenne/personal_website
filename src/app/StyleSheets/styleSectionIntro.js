// Import Utils
import COLORS from '../Utils/Colors';

const styleSectionIntro = () => {
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      height: window.innerHeight,
      padding: '70px 20%',
      '& > div': {
        maxHeight: 'fit-content',
        '& > h1': {
          margin: '0 0 30px 0',
          color: COLORS.green,
          fontWeight: 400,
          fontSize: 16,
          fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace'
        },
        '& > h2': {
          margin: 0,
          color: COLORS.lightestSlate,
          fontWeight: 600,
          fontSize: 80,
          fontFamily:
            'Calibre, Inter, San Francisco, SF Pro Text, -apple-system,system-ui,sans-serif'
        },
        '& > h3': {
          margin: '10px 0 0 0',
          color: COLORS.slate,
          fontWeight: 600,
          fontSize: 80,
          fontFamily:
            'Calibre, Inter, San Francisco, SF Pro Text, -apple-system,system-ui,sans-serif'
        },
        '& > p': {
          maxWidth: 500,
          margin: '20px 0 0 0',
          color: COLORS.slate,
          fontWeight: 400,
          fontSize: 20,
          fontFamily:
            'Calibre, Inter, San Francisco, SF Pro Text, -apple-system,system-ui,sans-serif'
        }
      }
    }
  };
};

export default styleSectionIntro;
