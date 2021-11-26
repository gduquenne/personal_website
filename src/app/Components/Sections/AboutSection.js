// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionAbout from '../../StyleSheets/styleSectionAbout';

// Import Images
import OnePunchManMoon from '../../../../public/images/OnePunchManMoon.jpg';

// Import Texts
import texts from '../../Texts/textAbout';

const useStyles = makeStyles(styleSectionAbout);

const AboutSection = () => {
  const { language } = useContext(Context);
  const classes = useStyles();
  return (
    <section id="about" className={classes.section}>
      <div className={classes.content}>
        <p>{texts[0][language]}</p>
        <ul>
          {texts.technos.map((techno, index) => (
            <li key={index}>{techno}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={OnePunchManMoon} />
      </div>
    </section>
  );
};

export default AboutSection;
