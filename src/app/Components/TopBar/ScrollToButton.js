// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import MUI Components
import { Button } from '@mui/material';

// Import Utils
import capitalizeFirstLetter from '../../Utils/Utils';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleScrollToButton from '../../StyleSheets/styleScrollToButton';

const useStyles = props => makeStyles(() => styleScrollToButton(props));

const ScrollToButton = ({ setScrollTo, isCurrentSectionOnView, text }) => {
  const { language } = useContext(Context);
  const classes = useStyles({ selected: isCurrentSectionOnView })();
  return (
    <Button
      size="small"
      className={classes.btn}
      onClick={() => setScrollTo(text.en)}
    >
      {capitalizeFirstLetter(text[language])}
    </Button>
  );
};

export default ScrollToButton;
