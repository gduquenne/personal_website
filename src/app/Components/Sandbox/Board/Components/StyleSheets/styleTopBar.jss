const styleTopBar = theme => {
  const borderRadius = '3px';
  return {
    topBarContainer: {
      display: 'flex'
    },
    bar: {
      backgroundColor: 'rgba(246, 249, 248, 1)',
      padding: '0 24px',
      borderBottom: '2px solid rgba(16, 37, 66, 0.5)',
      height: '75px'
    },
    logo: {
      height: '40px',
      width: '70px'
    },
    buttonSetting: {
      backgroundColor: 'rgba(144, 164, 174, 1)',
      height: '30px',
      width: '47px',
      borderRadius: borderRadius,
      marginLeft: '9px',
      '&:hover': {
        backgroundColor: 'rgba(115, 131, 139, 1)'
      }
    },
    buttonTitle: {
      width: '230px',
      fontSize: '15px',
      letterSpacing: '-0.015em'
    },
    buttonBoards: {
      width: '54px',
      height: '40px',
      background: 'rgba(205, 215, 214, 0.8)',
      border: '2px solid rgba(205, 215, 214, 1)',
      borderRadius: borderRadius,
      boxSizing: 'border-box'
    },
    buttonInvite: {
      height: '40px',
      width: '91px',
      border: '2px solid rgba(248, 112, 96, 1)',
      background: 'rgba(255, 255, 255, 1)',
      borderRadius: borderRadius,
      fontWeight: 'normal',
      fontSize: '13px',
      letterSpacing: '-0.015em',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      marginRight: '16px'
    },
    buttonsLeft: {
      fontSize: '13px',
      fontWeight: 'normal',
      width: '159px',
      height: '40px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: borderRadius,
      letterSpacing: '-0.015em',
      margin: '0px',
      padding: '0px'
    },
    buttonLogo: {
      marginRight: '20px',
      padding: '0px',
      '&:hover': {
        backgroundColor: 'rgba(246, 249, 248, 1)'
      }
    },
    avatarButton: {
      fontWeight: 'normal',
      '&:hover': {
        background: 'none'
      }
    },
    boardsButton: {
      height: '25px',
      width: '98px',
      textTransform: 'none',
      borderRadius: '3px',
      fontWeight: 'normal',
      fontSize: '15px'
    },
    participants: {
      display: 'flex',
      paddingLeft: '40px'
    },
    avatar: {
      width: '40px',
      backgroundColor: 'rgba(16, 37, 66, 1)',
      marginLeft: '-6px',
      fontWeight: 'normal',
      fontSize: '15px'
    },
    facilitator: {
      backgroundColor: 'rgba(248, 112, 96, 1)',
      marginLeft: '20px',
      fontSize: '15px'
    },
    partName: {
      marginLeft: '20px'
    },
    boardTitleContainer: {
      zIndex: 101,
      position: 'fixed',
      top: '15px',
      left: '50%',
      width: '230px',
      height: '40px',
      backgroundColor: 'rgba(246, 249, 248, 1)',
      borderRadius: '2px',
      margin: '0px',
      transform: 'translateX(-50%)',
      '&:hover': {
        backgroundColor: 'rgba(204, 222, 220, 0.9)'
      }
    },
    disabledInput: {
      '&:hover': {
        backgroundColor: 'rgba(246, 249, 248, 1)'
      },
      '& > *': {
        color: 'black'
      }
    },
    titleInput: {
      width: '230px',
      height: '40px',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: '15px',
      margin: '0',
      padding: '0'
    },
    boardIconButton: {
      position: 'relative',
      left: '80%',
      height: '100%',
      margin: '0',
      padding: '0'
    },
    flexSection: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '5px 0 10px 0',
      justifyContent: 'space-between'
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    closeIcon: {
      height: '10px',
      marginLeft: 'auto'
    },
    popover: {
      opacity: '0.9',
      borderRadius: '3px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(205, 215, 214, 1)'
    },
    boardsIcon: {
      fontSize: '35px'
    },
    customTooltip: {
      // I used the rgba color for the standard "secondary" color
      backgroundColor: 'rgba(248, 112, 96, 1)'
    },
    ownBubble: {
      zIndex: 101,
      position: 'absolute',
      top: 14,
      width: 40,
      height: 40,
      left: 'calc(100vw - 70)',
      backgroundColor: '#F87060',
      fontWeight: 'bold',
      color: 'rgb(16, 37, 66)',
      fontSize: '15px',
      margin: '0',
      transition: '250ms',
      '&:hover': {
        backgroundColor: '#F87060',
        color: 'rgb(16, 37, 66)',
        transform: 'scale(1.2,1.2)',
        border: 'solid',
        lineWidth: '4px'
      }
    },
    noSelect: {
      webkitTouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    },
    alphaBanner: {
      position: 'fixed',
      height: '20px',
      width: '100%',
      fontSize: '18px',
      fontWeight: '500',
      top: '0px',
      left: '0',
      right: '0',
      zIndex: '1000',
      backgroundColor: 'rgba(248, 112, 96, 0.8)',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 1)'
    }
  };
};

export default styleTopBar;
