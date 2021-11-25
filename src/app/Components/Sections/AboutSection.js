// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionAbout from '../../StyleSheets/styleSectionAbout';

const useStyles = makeStyles(styleSectionAbout);

const AboutSection = () => {
  const classes = useStyles();
  return (
    <div id="about" className={classes.section}>
      about
    </div>
  );
};

export default AboutSection;
