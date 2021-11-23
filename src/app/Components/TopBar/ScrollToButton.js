import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Styled Components
import { Button } from '@mui/material';

// Utils
import capitalizeFirstLetter from '../../Utils';

//TODO: scroll to instead of href

const ScrollToButton = ({ text }) => {
  const { language } = useContext(Context);
  const href = `/#${text.en}`;
  return (
    <Button
      href={href}
      size="small"
      sx={{ color: '#bbc6e5', marginRight: '20px' }}
    >
      {capitalizeFirstLetter(text[language])}
    </Button>
  );
};

export default ScrollToButton;
