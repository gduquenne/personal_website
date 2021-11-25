// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import MUI Components
import { Button } from '@mui/material';

// Import Utils
import capitalizeFirstLetter from '../../Utils';

//TODO: scroll to instead of href

const ScrollToButton = ({ text, setScrollTo }) => {
  const { language } = useContext(Context);
  return (
    <Button
      size="small"
      sx={{ color: '#bbc6e5', marginRight: '20px' }}
      onClick={() => setScrollTo(text.en)}
    >
      {capitalizeFirstLetter(text[language])}
    </Button>
  );
};

export default ScrollToButton;
