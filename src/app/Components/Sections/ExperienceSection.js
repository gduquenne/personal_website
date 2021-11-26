// Import Core
import React, { useContext, useState } from 'react';
import Context from '../../../Context/UserContext';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionExperience from '../../StyleSheets/styleSectionExperience';

// Import Texts
import texts from '../../Texts/textExperience';

// Import MUI Components
import { Fade } from '@mui/material';

const useStyles = props => makeStyles(() => styleSectionExperience(props));

const ExperienceSection = () => {
  const { language } = useContext(Context);

  const [tabOpen, setTabOpen] = useState(0);

  const classes = useStyles({ tabOpen, nbTabs: texts.length - 1 })();

  return (
    <section id="experience" className={classes.section}>
      {displayLeftBar(classes, language, setTabOpen)}
      {displayTabsContent(classes, language, tabOpen)}
    </section>
  );
};

const displayLeftBar = (classes, language, setTabOpen) => (
  <div className={classes.leftbar}>
    {texts.map((xp, index) => (
      <button
        key={`expTab${index}`}
        id={`expTab${index}`}
        className={classes[`leftbarTab${index}`]}
        onClick={() => setTabOpen(index)}
      >
        &nbsp;{xp[0][language]}&nbsp;
      </button>
    ))}
    <div className={classes.slidePartLeftbar}></div>
  </div>
);

const displayTabsContent = (classes, language, tabOpen) => {
  return (
    <div className={classes.tabsContentContainer}>
      {texts.map((xp, index) => {
        const [company, link, title, date, ...paragraphs] = xp;
        return (
          <Fade
            key={`expsContent${index}`}
            in={tabOpen === index}
            timeout={{ enter: 500, exit: 0 }}
            hidden={tabOpen !== index}
          >
            <div className={classes.expContent}>
              <div className={classes.expContentHead}>
                <span className={classes.expTitle}>{title[language]}</span>
                &nbsp;
                <span className={classes.expCompany}>
                  @&nbsp;
                  <a
                    className={classes.expCompany}
                    href={link[language]}
                    target="_blank"
                  >
                    {company[language]}
                  </a>
                </span>
              </div>
              <div className={classes.expDate}>{date[language]}</div>
              <ul>
                {paragraphs.map((paragraph, i) => (
                  <li key={`p${i}`}>
                    <p className={classes.expPara}>{paragraph[language]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        );
      })}
    </div>
  );
};

export default ExperienceSection;
