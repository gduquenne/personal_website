function rightBarStyles(theme) {
  const iconsHeight = 50;
  return {
    rightBar: {
      backgroundColor: 'rgba(246, 249, 248, 1)',
      height: `${iconsHeight * 4 + 25}px`,
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
    text: {
      position: 'absolute',
      right: '50px',
      borderRadius: '5px',
      backgroundColor: 'rgba(16,37,66,1)',
      fontSize: '15px',
      padding: '2px 5px',
      whiteSpace: 'nowrap',
      textTransform: 'none',
      color: 'rgba(255,255,255,1)',
      opacity: '0.8',
      zIndex: '1',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    }
  };
}
export default rightBarStyles;
