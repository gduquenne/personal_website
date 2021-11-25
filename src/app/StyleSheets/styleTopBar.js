const styleTopBar = ({ allocatedWidth }) => {
  return {
    topBar: {
      display: 'flex',
      alignItems: 'center',
      color: '#bbc6e5',
      backgroundColor: '#0a192f',
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
      alignContent: 'space-between',
      padding: '0 10px'
    }
  };
};

export default styleTopBar;
