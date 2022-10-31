const styleBoard = theme => {
  return {
    rightButton: {
      zIndex: '101',
      fontSize: '12px',
      height: '35px',
      width: '100px',
      maxWidth: '100px',
      lineHeight: '12.89px',
      letterSpacing: '-1.5%',
      border: '2px solid rgba(16, 37, 66, 0.8)',
      borderRadius: '2px',
      textAlign: 'center',
      textTransform: 'none',
      transition: '0.25s',
      backgroundColor: 'rgba(16, 37, 66, 0.8)',
      color: 'rgba(255, 255, 255, 1)'
    },
    rightButtonCloseMenu: {
      right: '0',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      color: 'rgba(16, 37, 66, 0.8)'
    },
    buttonContainer: {
      zIndex: '102',
      top: '75px',
      position: 'absolute',
      transform: 'rotateZ(90deg)',
      transition: '0.25s',
      [theme.breakpoints.down('lg')]: {
        right: '362px'
      },
      [theme.breakpoints.up('lg')]: {
        right: '490px'
      },
      [theme.breakpoints.up('xl')]: {
        right: '490px'
      }
    },
    minimapButtonContainer: {
      position: 'absolute',
      transform: 'rotateZ(90deg)',
      transition: '0.4s'
    },
    workshopMenuButtons: {
      position: 'absolute',
      top: '20px',
      left: 'calc(50vw + 130px)',
      backgroundColor: 'rgba(235,235,235,0.83)',
      display: 'flex',
      flexDirection: 'row'
    },
    wsIcon: {
      '&:hover': {
        backgroundColor: 'rgba(204, 222, 220, 0.4)'
      }
    },
    mapContainer: {
      position: 'absolute',
      borderRadius: '3px 3px 0px 0px',
      left: '14px',
      width: '162px',
      height: '92px',
      overflow: 'hidden',
      transition: '.4s ease-in-out'
    },
    mapContainerCollapse: {
      width: '0',
      animation: 'collapse 0.4s'
    },
    fab: {
      backgroundColor: 'rgba(248,112,96,1)',
      color: 'rgba(255, 255, 255, 1)',
      width: 40,
      height: 40,
      margin: '0 -8px 0 0',
      fontWeight: 'bold',
      transition: '1s',
      '&:hover': {
        bottom: 9,
        zIndex: 1000,
        backgroundColor: 'rgba(248,112,96,1)'
      }
    },
    popupContainer: {
      width: '760px',
      height: '700px',
      position: 'absolute',
      margin: 'auto'
    },
    popupTimeOutContainer: {
      width: '665px',
      height: '450px',
      position: 'absolute',
      margin: 'auto'
    },
    addBubble: {
      backgroundColor: 'rgba(16, 37, 66, 1)',
      fontWeight: 'normal',
      fontSize: '30px',
      padding: '10px 10px 13px 11px',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: 'rgba(16, 37, 66, 1)'
      }
    },
    '@media not all and (min-resolution:.001dpcm)': {
      '@media': {
        safariOnly: {
          fontSize: '25px',
          padding: '0px 10px 0px 11px'
        }
      }
    },
    zoomAndMapPanel: {
      position: 'absolute',
      left: 10,
      top: '90%',
      width: 168,
      height: 40,
      display: 'flex',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgba(246, 246, 246, 1)',
      boxShadow: '0px 2px 5px 1px rgba(110, 110, 110, 0.25)'
    },
    zoomAndMapPanelPart: {
      color: 'rgba(120, 120, 120, 1)',
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      fontFamily: 'arial',
      height: '20px',
      marginTop: 'auto',
      marginBottom: 'auto',
      webkitTouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    langSelectContainer: {
      position: 'fixed',
      top: '20px',
      right: '30px'
    }
  };
};
export default styleBoard;
