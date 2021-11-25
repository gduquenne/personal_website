const styleTopBar = ({ allocatedWidth }) => {
  return {
    topBar: {
      display: 'flex',
      alignItems: 'center',
      color: '#bbc6e5',
      backgroundColor: 'rgba(10, 25, 47, 0.2)',
      width: allocatedWidth,
      height: 50,
      top: 0,
      position: 'fixed',
      boxShadow: '0px 1px 10px black'
    },
    nameContainer: {
      padding: '0 10px'
    },
    buttonsContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px'
    },
    buttonContainer: {
      marginRight: 20
    }
  };
};

export default styleTopBar;
