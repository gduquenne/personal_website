const style = () => {
  const globalFont = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    display: 'flex',
    fontWeight: '400',
    alignItems: 'center',
    letterSpacing: '-0.015em',
    color: 'rgba(16,37,66,1)'
  };
  return {
    container: {
      width: '100%',
      borderRadius: '7px',
      color: 'rgba(255, 255,255, 1)',
      display: 'flex'
    },
    leftMenu: {
      width: '22%',
      height: '100%',
      backgroundColor: 'rgba(235,235,235,1)'
    },
    textLeftMenu: {
      ...globalFont,
      width: '87%',
      height: '5vw',
      position: 'relative',
      margin: 'auto',
      paddingTop: '7%',
      paddingBottom: '6%',
      fontSize: '0.75em',
      fontWeight: 'normal',
      lineHeight: '100%',
      textAlign: 'center'
    },
    themeText: {
      ...globalFont,
      fontSize: '0.85em',
      lineHeight: '100%',
      paddingTop: '13%',
      paddingLeft: '10%',
      fontWeight: '700'
    },
    checkboxLabelStyle: {
      ...globalFont,
      fontSize: '0.45em',
      lineHeight: '100%'
    },
    checkboxStyle: {
      width: '100%',
      height: '2.5vw',
      paddingLeft: '10%'
    },
    centerMenu: {
      width: '40%',
      height: '100%'
    },
    title: {
      ...globalFont,
      fontWeight: '700',
      fontSize: '1.5em',
      paddingTop: '7%',
      paddingLeft: '7%',
      paddingBottom: '3%'
    },
    textField: {
      width: '90%!important',
      marginTop: '0.25%!important',
      marginLeft: '5%!important'
    },
    simpleText: {
      ...globalFont,
      fontSize: '0.75em',
      marginTop: '3%',
      paddingLeft: '7%',
      color: 'rgba(120, 120, 120, 1)'
    },
    description: {
      verticalAlign: 'top',
      wordBreak: 'break-word',
      marginTop: '0.25%!important',
      width: '90%!important',
      marginLeft: '5%!important'
    },
    rightMenu: {
      width: '38%'
    },
    textImage: {
      ...globalFont,
      color: 'rgba(120, 120, 120, 1)',
      paddingTop: '20%',
      paddingLeft: '10%',
      fontSize: '0.8em'
    },
    image: {
      width: '80%',
      height: '100px',
      marginTop: '2%',
      marginLeft: '10%',
      borderRadius: '8px',
      backgroundColor: 'pink'
    },
    changeImageButton: {
      ...globalFont,
      width: '40%',
      position: 'relative',
      marginTop: '2%',
      marginLeft: '50%',
      backgroundColor: 'rgba(235,235,235,1)',
      borderRadius: '2px',
      color: 'rgba(120, 120, 120, 1)',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'rgba(235,235,235,1)'
      }
    },
    saveAndExitButton: {
      ...globalFont,
      width: '40%',
      position: 'relative',
      marginTop: '67%',
      marginLeft: '50%',
      backgroundColor: 'rgba(248,112,96,1)',
      color: 'white',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'rgba(248,112,96,1)'
      }
    }
  };
};

export default style;
