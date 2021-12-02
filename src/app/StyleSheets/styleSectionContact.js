// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';
import TRANSITIONS from '../Utils/Style/Transitions';

const styleSectionContact = () => {
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: window.innerHeight - 140,
      padding: '70px 20%',
      '& > div': {
        maxWidth: 540,
        display: 'flex',
        flexDirection: 'column',
        color: COLORS.slate,
        fontSize: FONTSIZES.xl,
        lineHeight: 1.8,
        fontFamily: FONTFAMILIES.sans,
        textAlign: 'center',
        '& > p': {
          marginBottom: 40
        }
      }
    },
    buttonMailLink: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      height: 40,
      padding: '10px 15px',
      width: 'fit-content',
      backgroundColor: COLORS.navy,
      border: `1px solid ${COLORS.green}`,
      borderRadius: 4,
      color: COLORS.green,
      fontSize: FONTSIZES.xl,
      fontWeight: 600,
      fontFamily: FONTFAMILIES.mono,
      transition: TRANSITIONS.all,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: COLORS.greenTint
      }
    }
  };
};

export default styleSectionContact;
