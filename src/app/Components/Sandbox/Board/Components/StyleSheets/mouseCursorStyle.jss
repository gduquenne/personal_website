const mouseCursorStyle = theme => {
  return {
    root: {
      position: 'relative'
    },
    name: {
      position: 'absolute',
      width: 'max-content',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      top: '17px',
      left: '20px',
      borderRadius: '3px',
      height: '20px',
      fontSize: '12px',
      padding: '1px 3px',
      webkitTouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    },
    '@media not all and (min-resolution:.001dpcm)': {
      '@media': {
        safariOnly: {
          padding: '0px 0px 0px 0px'
        }
      }
    }
  };
};

export default mouseCursorStyle;
