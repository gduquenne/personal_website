// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionContact from '../../StyleSheets/styleSectionContact';

const useStyles = makeStyles(styleSectionContact);

const ContactSection = () => {
  const classes = useStyles();
  return (
    <section id="contact" className={classes.section}>
      contact
    </section>
  );
};

export default ContactSection;
