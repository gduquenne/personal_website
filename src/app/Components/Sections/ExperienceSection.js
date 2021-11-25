// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionExperience from '../../StyleSheets/styleSectionExperience';

const useStyles = makeStyles(styleSectionExperience);

const ExperienceSection = () => {
  const classes = useStyles();
  return (
    <section id="experience" className={classes.section}>
      experience
    </section>
  );
};

export default ExperienceSection;
