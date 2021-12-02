// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionContact from '../../StyleSheets/styleSectionContact';

// Import Custom Components
import Maintenance from '../../Utils/Maintenance';

const useStyles = makeStyles(styleSectionContact);

const ContactSection = () => {
  const classes = useStyles();
  return (
    <section id="contact" className={classes.section}>
      <Maintenance />
    </section>
  );
};

export default ContactSection;
