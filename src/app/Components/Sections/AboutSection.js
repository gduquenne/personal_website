// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionAbout from '../../StyleSheets/styleSectionAbout';

// Import Images
import onePunchManMoon from '../../../../public/images/onePunchManMoon.jpg';

// Import Texts
import texts from '../../Texts/textAbout';

const useStyles = makeStyles(styleSectionAbout);

const AboutSection = () => {
  const { language } = useContext(Context);
  const classes = useStyles();
  return (
    <section id="about" className={classes.section}>
      <div className={classes.content}>
        {displayParagraphs(texts.paragraphs, language, classes)}
        {displayTechnos(texts.technos)}
      </div>
      <img src={onePunchManMoon} className={classes.profilImg} />
    </section>
  );
};

const displayParagraphs = (paragraphs, language, classes) => {
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        if (Array.isArray(paragraph)) {
          return (
            <p key={index}>
              {displayParagraphWithLinks(paragraph, language, classes)}
            </p>
          );
        } else {
          return <p key={index}>{paragraph[language]}</p>;
        }
      })}
    </>
  );
};

const displayParagraphWithLinks = (array, language, classes) => (
  <>
    {array.map((part, index) => {
      if (Array.isArray(part[language])) {
        return (
          <a
            key={index}
            href={part[language][1]}
            className={classes.link}
            target="_blank"
          >
            {part[language][0]}
          </a>
        );
      } else {
        return <span key={index}>{part[language]}</span>;
      }
    })}
  </>
);

const displayTechnos = technos => (
  <ul>
    {technos.map((techno, index) => (
      <li key={index}>{techno}</li>
    ))}
  </ul>
);

export default AboutSection;
