// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionExperience from '../../StyleSheets/styleSectionExperience';

const useStyles = makeStyles(styleSectionExperience);

const ExperienceSection = () => {
  const classes = useStyles();
  return (
    <div id="experience" className={classes.section}>
      experience
    </div>
  );
};

export default ExperienceSection;
