// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionContact from '../../StyleSheets/styleSectionContact';

const useStyles = makeStyles(styleSectionContact);

const ContactSection = () => {
  const classes = useStyles();
  return (
    <div id="contact" className={classes.section}>
      contact
    </div>
  );
};

export default ContactSection;
