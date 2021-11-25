const styleScrollToButton = ({ selected }) => {
  let color;
  if (selected) {
    color = '#7ef5e1';
  } else {
    color = '#bbc6e5';
  }
  return {
    btn: {
      '&.MuiButton-root': { color }
    }
  };
};

export default styleScrollToButton;
