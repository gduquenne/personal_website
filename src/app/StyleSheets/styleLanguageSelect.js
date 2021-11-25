const styleLanguageSelect = () => {
  return {
    formControl: {
      '&.MuiFormControl-root': {
        marginRight: 20
      }
    },
    select: {
      height: 40,
      '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.04)'
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        '& > span': {
          color: '#bbc6e5'
        }
      },
      '& > svg[data-testid="ArrowDropDownIcon"]': {
        fill: '#bbc6e5'
      },
      '& > fieldset': {
        border: 'none'
      }
    },
    iconMenuItem: {
      marginRight: 10
    },
    textMenuItem: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.8125rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase'
    }
  };
};

export default styleLanguageSelect;
