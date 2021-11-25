// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import Texts
import texts from '../../Texts/textIntro';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionIntro from '../../StyleSheets/styleSectionIntro';

const useStyles = makeStyles(styleSectionIntro);

const IntroSection = () => {
  const { language } = useContext(Context);
  const classes = useStyles();
  return (
    <section id="intro" className={classes.section}>
      <div>
        <h1>{texts.part1[language]}</h1>
        <h2>{texts.part2[language]}</h2>
        <h3>{texts.part3[language]}</h3>
        <p>{texts.part4[language]}</p>
      </div>
    </section>
  );
};

export default IntroSection;
