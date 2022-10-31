function styleLeftBar(theme) {
  const iconsHeight = 50;
  return {
    leftBar: {
      backgroundColor: 'rgba(246, 249, 248, 1)',
      position: 'fixed',
      height: `${iconsHeight * 7 + 46}px`,
      width: '60px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '2px',
      zIndex: 1000
    },
    icons: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderRadius: 0,
      '&:hover': { backgroundColor: 'transparent' },
      margin: `3px 0`,
      width: '60px',
      height: `${iconsHeight}px`,
      '& > *': {
        '& > *': { fontSize: '30px' },
        backgroundColor: 'unset',
        width: '60px',
        height: `${iconsHeight}px`,
        borderRadius: '0',
        boxShadow: 'none',
        '&:hover': { backgroundColor: 'rgba(204, 222, 220, 0.4)' }
      }
    },
    buttonDescriptionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '9px'
    },
    dropright: {
      width: 'fit-content',
      flexDirection: 'row',
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'absolute',
      left: 65,
      display: 'flex',
      zIndex: 1,
      transitionProperty: 'transform',
      transitionDuration: '250ms',
      '& > *': {
        backgroundColor: 'rgba(246, 249, 248, 1)',
        fontSize: '10px',
        textTransform: 'none'
      }
    },

    shapesButton: {
      margin: '0px 0px!important',
      width: '60px!important',
      maxHeight: '36px!important'
    },
    framesButton: {
      margin: '0px 0px!important',
      width: '60px!important',
      border: 'none!important',
      height: '60px!important',
      '&:hover': {
        boxShadow: 'none'
      }
    },
    droprightFrames: {
      width: '180px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'absolute',
      left: 65,
      display: 'flex',
      zIndex: 1,
      transitionProperty: 'transform',
      transitionDuration: '250ms',
      backgroundColor: 'rgba(246, 249, 248, 1)',
      '& > *': {
        margin: '2px 0px!important',
        border: '0px!important',
        backgroundColor: 'rgba(246, 249, 248, 1)',
        fontSize: '10px',
        textTransform: 'none'
      }
    },
    dropRightStickyNote: {
      width: '175px',
      height: `${iconsHeight * 7 + 46}px`,
      top: '255%',
      paddingLeft: '7px',
      boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
      '& > *': {
        padding: '6px 13px!important',
        border: '0px!important',
        paddingRight: '13px'
      }
    },
    stickyNoteIcon: {
      width: '50px',
      height: '50px',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    },
    droprightClose: {
      visibility: 'hidden',
      position: 'absolute',
      width: '0px',
      transform: 'translate(-100%,-50%)'
    },
    text: {
      position: 'absolute',
      left: '50px',
      borderRadius: '5px',
      backgroundColor: 'rgba(16,37,66,1)',
      fontSize: '15px',
      padding: '2px 5px',
      whiteSpace: 'nowrap',
      textTransform: 'none',
      color: 'rgba(255,255,255,1)',
      opacity: '0.8',
      zIndex: '1',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      marginTop: '-10px',
      cursor: 'default'
    },
    droprightImages: {
      width: '75px',
      gridTemplateColumns: `repeat(1,1fr)`,
      top: `${iconsHeight * 4 + 27}px`,
      transform: 'translate(0,0)',
      position: 'absolute',
      left: 65,
      display: 'grid',
      zIndex: 1,
      transitionProperty: 'transform',
      transitionDuration: '250ms',
      '& > *': {
        backgroundColor: 'rgba(246, 249, 248, 1)',
        fontSize: '10px',
        textTransform: 'none'
      }
    }
  };
}
export default styleLeftBar;
