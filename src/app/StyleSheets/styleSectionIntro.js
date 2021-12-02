// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';

const styleSectionIntro = () => {
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      height: window.innerHeight,
      padding: '70px 20%',
      '& > div': {
        maxHeight: 'fit-content',
        fontFamily: FONTFAMILIES.sans,
        '& > h1': {
          margin: '0 0 30px 0',
          color: COLORS.green,
          fontWeight: 400,
          fontSize: FONTSIZES.md,
          fontFamily: FONTFAMILIES.mono
        },
        '& > h2': {
          margin: 0,
          color: COLORS.lightestSlate,
          fontWeight: 600,
          fontSize: FONTSIZES.title
        },
        '& > h3': {
          margin: '10px 0 0 0',
          color: COLORS.slate,
          fontWeight: 600,
          fontSize: FONTSIZES.title
        },
        '& > p': {
          maxWidth: 500,
          margin: '20px 0 0 0',
          color: COLORS.slate,
          fontWeight: 400,
          fontSize: FONTSIZES.xl
        }
      }
    }
  };
};

export default styleSectionIntro;
