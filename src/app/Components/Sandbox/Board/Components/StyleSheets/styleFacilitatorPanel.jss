const styleFacilitatorPanel = theme => {
  const defaultBackgroundColor = 'rgba(255,255,255,0.8)';
  const defaultFontColor = 'rgba(16, 37, 66, 1)';
  const defaultFontColorLowOpacity = 'rgba(16, 37, 66, 0.8)';
  const textHoverColor = 'rgba(248, 112, 96, 1)';
  return {
    panel: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      background: defaultBackgroundColor,
      borderLeft: '2px solid rgb(16, 37, 66)',
      transitionProperty: 'width',
      transitionDuration: '250ms'
    },
    panelWrapper: {
      display: 'block',
      padding: '5%'
    },
    panelTitle: {
      fontSize: '20px',
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: '23.44px',
      letterSpacing: '-0.015em'
    },
    rightMenuTransition: {
      transitionProperty: 'width, opacity, left',
      transitionDuration: '250ms, 100ms, 250ms'
    },
    wsMenuOpen: {
      transition: '0.2s',
      height: '100%',
      top: 0,
      right: 0,
      opacity: 1,
      [theme.breakpoints.down('lg')]: {
        width: '384px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '512px'
      },
      [theme.breakpoints.up('xl')]: {
        width: '512px'
      }
    },
    wsMenuClose: {
      transition: '0.2s',
      opacity: 0,
      width: '0',
      height: 0,
      overflow: 'hidden'
    },

    sectionWrapper: {
      padding: '2%'
    },
    sectionTitle: {
      color: defaultFontColor,
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '18.75px',
      letterSpacing: '-0.015em'
    },
    buttonWrapper: {
      padding: '2%',
      display: 'block'
    },
    sectionButton: {
      display: 'flex',
      alignItems: 'baseline',
      [theme.breakpoints.down('lg')]: {
        margin: '0% 2% 2% 2%'
      },
      [theme.breakpoints.up('lg')]: {
        margin: '0% 2% 2% 2%'
      },
      [theme.breakpoints.up('xl')]: {
        margin: '0% 2% 2% 2%'
      }
    },
    textButton: {
      fontSize: '16px',
      color: defaultFontColorLowOpacity,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '17.58px',
      letterSpacing: '-0.015em',
      '&:hover': {
        color: textHoverColor,
        textDecorationLine: 'underline',
        fontWeight: 'normal',
        cursor: 'pointer'
      },
      [theme.breakpoints.down('lg')]: {
        width: '242px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '242px'
      },
      [theme.breakpoints.up('xl')]: {
        width: '242px'
      }
    },
    iconButton: {
      position: 'relative',
      top: '4px',
      textAlign: 'center',
      [theme.breakpoints.down('lg')]: {
        width: '30px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '30px'
      },
      [theme.breakpoints.up('xl')]: {
        width: '30px'
      }
    },
    comingSoon: {
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: '13px',
      lineHeight: '16px',
      letterSpacing: '-1.5%',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 1)',
      background: 'rgba(248, 112, 96, 0.8)',
      borderRadius: '2px',
      [theme.breakpoints.down('lg')]: {
        width: '121px'
      },
      [theme.breakpoints.up('lg')]: {
        width: '121px'
      },
      [theme.breakpoints.up('xl')]: {
        width: '121px'
      }
    },
    menu: {
      display: 'block',
      padding: '2%',
      height: 'auto',
      opacity: 1,
      boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, 0.80)',
      background: 'rgba(246, 249, 248, 1)',
      borderRadius: '2px'
    },
    menuTitle: {
      color: defaultFontColor,
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '21.09px',
      letterSpacing: '-0.015em'
    },
    menuButtonWrapper: {
      padding: '2%'
    },
    emailValue: {
      display: 'flex',
      overflow: 'hidden'
    },
    emailList: {
      width: '100%',
      maxHeight: '70px',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingBottom: '2px'
    },
    emailValueText: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '21px',
      letterSpacing: '-0.015em',
      textDecorationLine: 'underline',
      color: defaultFontColorLowOpacity,
      overflow: 'hidden',
      width: '95%'
    },
    participantEmailText: {
      '&:hover': {
        cursor: 'pointer',
        color: textHoverColor
      }
    },
    emailValueDelete: {
      width: '5%',
      paddingLeft: '6px',
      float: 'right',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    workshopLinkPass: {
      border: '1px solid rgba(16, 37, 66, 0.4)',
      borderRadius: '2px',
      padding: '2%',
      background: defaultBackgroundColor,
      overflowWrap: 'break-word',
      '& > p': {
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '16px',
        letterSpacing: '-0.015em',
        color: defaultFontColorLowOpacity,
        fontSize: '14px'
      }
    },
    menuButton: {
      height: '30px',
      width: '91px',
      border: '1px solid rgba(248, 112, 96, 1)',
      background: 'rgba(255, 255, 255, 1)',
      borderRadius: '2px',
      fontWeight: 'normal',
      fontSize: '13px',
      letterSpacing: '-0.015em',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      boxSizing: 'border-box',
      [theme.breakpoints.down('lg')]: {
        margin: `2% 2% 2% 67%`
      },
      [theme.breakpoints.up('lg')]: {
        margin: `2% 2% 2% 75%`
      },
      [theme.breakpoints.up('xl')]: {
        margin: `2% 2% 2% 75%`
      }
    },
    lastMenuButton: {
      marginBottom: '-2%'
    },
    notice: {
      border: '1px solid rgba(16, 37, 66, 0.4)',
      borderRadius: '2px',
      padding: '2%',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2%'
    },
    blueNotice: {
      background: 'rgba(232,244,253,1)',
      color: 'rgba(13,60,97,1)'
    },
    redNotice: {
      background: 'rgba(253,236,234,1)',
      color: 'rgba(102,17,17,1)'
    },
    noticeIcon: {
      width: '16%',
      height: '22px',
      textAlign: 'center',
      marginLeft: '-2%'
    },
    noticeText: {
      width: '82%',
      textAlign: 'justify',
      fontSize: '14px',
      lineHeight: '16.41px',
      letterSpacing: '-1.5%',
      fontStyle: 'normal',
      fontWeight: '400'
    },
    closeMenuButton: {
      position: 'absolute',
      top: '15px',
      width: '20px',
      height: '20px',
      '&:hover': {
        cursor: 'pointer'
      },
      [theme.breakpoints.down('lg')]: {
        left: '346px'
      },
      [theme.breakpoints.up('lg')]: {
        left: '474px'
      },
      [theme.breakpoints.up('xl')]: {
        left: '474px'
      }
    },
    bubble: {
      color: 'rgba(255, 255, 255, 1)',
      width: '40px',
      height: '40px',
      margin: '0 -8px 0 0',
      fontWeight: 'bold',
      transitionProperty: 'top',
      transitionDuration: '250ms',
      '&:hover': {
        top: -5,
        zIndex: 1000
      }
    },
    addBubble: {
      backgroundColor: 'rgba(16, 37, 66, 1)',
      fontWeight: 'normal',
      fontSize: '30px',
      padding: '10px 10px 13px 11px',
      '&:hover': {
        backgroundColor: 'rgba(16, 37, 66, 1)'
      }
    },
    facilitatorBubble: {
      backgroundColor: 'rgba(248,112,96,1)',
      '&:hover': {
        backgroundColor: 'rgba(248,112,96,1)'
      }
    },
    participantBubble: {
      backgroundColor: 'rgba(16, 37, 66, 1)',
      '&:hover': {
        backgroundColor: 'rgba(16, 37, 66, 1)'
      }
    },
    ownerBubble: {
      backgroundColor: 'rgba(248,112,96,1)',
      border: '1px solid rgba(16, 37, 66, 0.5)',
      '&:hover': {
        backgroundColor: 'rgba(248,112,96,1)',
        border: '1px solid rgba(16, 37, 66, 0.5)'
      }
    },
    bubblesContainer: {
      margin: '14px 0 0 10px'
    },
    formControl: {
      width: '150px!important'
    }
  };
};

export default styleFacilitatorPanel;
