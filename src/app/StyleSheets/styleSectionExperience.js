// Import Utils
import COLORS from '../Utils/Style/Colors';
import FONTFAMILIES from '../Utils/Style/FontFamilies';
import FONTSIZES from '../Utils/Style/FontSizes';
import TRANSITIONS from '../Utils/Style/Transitions';

const styleSectionExperience = ({ tabOpen, nbTabs }) => {
  const leftbarTabHeight = 40;
  const tabsClasses = calcTabClasses(tabOpen, nbTabs, leftbarTabHeight);
  return {
    section: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: window.innerHeight,
      padding: '70px 20%',
      fontWeight: 400,
      fontSize: FONTSIZES.md,
      fontFamily: FONTFAMILIES.mono
    },
    leftbar: {
      display: 'flex',
      flexDirection: 'column',
      borderLeft: `2px solid ${COLORS.lightestNavy}`
    },
    slidePartLeftbar: {
      position: 'absolute',
      height: leftbarTabHeight,
      width: 2,
      borderRadius: 4,
      backgroundColor: COLORS.green,
      transform: `translateY(${tabOpen * leftbarTabHeight}px)`,
      transition: 'transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s'
    },
    ...tabsClasses,
    tabsContentContainer: {
      width: 600,
      display: 'block',
      marginLeft: 20,
      color: COLORS.lightSlate
    },
    expContentHead: {
      fontWeight: 600,
      fontSize: FONTSIZES.header,
      fontFamily: FONTFAMILIES.sans,
      marginBottom: 4
    },
    expTitle: { color: COLORS.lightSlate },
    expCompany: {
      color: COLORS.green
    },
    expDate: {
      fontSize: FONTSIZES.sm,
      fontWeight: 400,
      marginBottom: 4
    },
    expPara: {
      whiteSpace: 'pre-wrap',
      fontFamily: FONTFAMILIES.mono,
      fontSize: FONTSIZES.md
    }
  };
};

const calcTabClasses = (tabOpen, nbTabs, leftbarTabHeight) => {
  const tabsClasses = {};
  for (let i = 0; i <= nbTabs; i += 1) {
    let specs = {};
    if (tabOpen === i) {
      specs = {
        color: COLORS.green
      };
    } else {
      specs = {
        color: COLORS.slate
      };
    }
    tabsClasses[`leftbarTab${i}`] = {
      ...specs,
      height: leftbarTabHeight,
      backgroundColor: COLORS.navy,
      border: 'none',
      textAlign: 'left',
      transition: TRANSITIONS.all,
      fontWeight: 400,
      fontSize: FONTSIZES.md,
      fontFamily: FONTFAMILIES.mono,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: COLORS.lightNavy,
        color: COLORS.green
      },
      '&:focus': {
        backgroundColor: COLORS.lightNavy,
        color: COLORS.green
      }
    };
  }
  return tabsClasses;
};

export default styleSectionExperience;
