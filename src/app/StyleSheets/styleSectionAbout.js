// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';
import LINKFLASH from '../Utils/Style/LinkFlash';

const styleSectionAbout = () => {
  const fontsizes = calcFontsizes();
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: window.innerHeight,
      padding: '70px 20%',
      fontWeight: 400
    },
    content: {
      '& > p': {
        lineHeight: 1.6,
        color: COLORS.slate,
        fontFamily: FONTFAMILIES.sans,
        fontSize: fontsizes.main,
        maxWidth: 540,
        whiteSpace: 'pre-wrap',
        '& > a': {
          color: COLORS.green,
          ...LINKFLASH
        }
      },
      '& > ul': {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(140px, 280px))',
        gap: '0px 10px',
        '& > li': {
          color: COLORS.lightSlate,
          marginBottom: 10,
          fontFamily: FONTFAMILIES.mono,
          fontSize: fontsizes.techno
        }
      }
    },
    profilImg: {
      height: window.innerHeight * 0.6
    }
  };
};

const calcFontsizes = () => {
  const { innerHeight } = window;
  if (innerHeight > 800) {
    return {
      main: FONTSIZES.md,
      techno: FONTSIZES.xs
    };
  } else {
    return {
      main: FONTSIZES.sm,
      techno: FONTSIZES.xxs
    };
  }
};

export default styleSectionAbout;
