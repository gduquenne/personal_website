// Import Utils
import COLORS from '../Utils/Colors';

const styleSectionAbout = () => {
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: window.innerHeight,
      padding: '0% 20%',
      fontWeight: 400
    },
    content: {
      '& > p': {
        color: COLORS.slate,
        fontFamily:
          'Calibre, Inter, San Francisco, SF Pro Text, -apple-system,system-ui,sans-serif',
        fontSize: 16,
        maxWidth: 540,
        whiteSpace: 'pre-wrap'
      },
      '& > ul': {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(140px, 280px))',
        gap: '0px 10px',
        '& > li': {
          color: COLORS.slate,
          marginBottom: 10,
          fontFamily: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
          fontSize: 13
        }
      }
    }
  };
};

export default styleSectionAbout;
