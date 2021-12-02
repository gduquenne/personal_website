// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionContact from '../../StyleSheets/styleSectionContact';

// Import Texts
import texts from '../../Texts/textContact';

const useStyles = makeStyles(styleSectionContact);

const ContactSection = () => {
  const { language } = useContext(Context);
  const classes = useStyles();
  return (
    <section id="contact" className={classes.section}>
      <div>
        <p>{texts.part1[language]}</p>
        {displayButtonSayHello(language, classes)}
      </div>
    </section>
  );
};

const displayButtonSayHello = (language, classes) => (
  <button
    href="mailto:duquenne.gregoire@gmail.com"
    className={classes.buttonMailLink}
  >
    {texts.mailLink[language]}
  </button>
);

export default ContactSection;
