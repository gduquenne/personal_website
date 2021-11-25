// Import Core
import React, { useState, useEffect } from 'react';

// Import Custom Components
import ScrollToButton from './ScrollToButton';
import LanguageSelect from './LanguageSelect';

// Import Texts
import texts from '../../Texts/textTopBar';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleTopBar from '../../StyleSheets/styleTopBar';

const useStyles = props => makeStyles(() => styleTopBar(props));

const TopBar = ({ allocatedWidth, setScrollTo }) => {
  const classes = useStyles({ allocatedWidth })();

  const [currentSectionOnView, setCurrentSectionOnView] = useState(
    getCurrentViewSection
  );

  useEffect(() => {
    const handleScroll = () => setCurrentSectionOnView(getCurrentViewSection());
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="topBar" className={classes.topBar}>
      <div className={classes.nameContainer}>Grégoire Duquenne</div>
      <div className={classes.buttonsContainer}>
        {displayScrollToButton(
          classes,
          setScrollTo,
          currentSectionOnView,
          'about'
        )}
        {displayScrollToButton(
          classes,
          setScrollTo,
          currentSectionOnView,
          'experience'
        )}
        {displayScrollToButton(
          classes,
          setScrollTo,
          currentSectionOnView,
          'sandbox'
        )}
        {displayScrollToButton(
          classes,
          setScrollTo,
          currentSectionOnView,
          'contact'
        )}
        <LanguageSelect />
      </div>
    </div>
  );
};

const displayScrollToButton = (
  classes,
  setScrollTo,
  currentSectionOnView,
  sectionName
) => (
  <div className={classes.buttonContainer}>
    <ScrollToButton
      setScrollTo={setScrollTo}
      isCurrentSectionOnView={currentSectionOnView === sectionName}
      text={texts[`${sectionName}Btn`]}
    />
  </div>
);

const getCurrentViewSection = () => {
  const topBar = document.getElementById('topBar');
  const aboutSection = document.getElementById('about');
  const experienceSection = document.getElementById('experience');
  const sandboxSection = document.getElementById('sandbox');
  const contactSection = document.getElementById('contact');
  const { scrollY } = window;
  if (!topBar || scrollY < aboutSection.offsetTop - topBar.offsetHeight) {
    return null;
  } else {
    const { offsetHeight: tbHeight } = topBar;
    const { offsetTop: aboutTop } = aboutSection;
    const { offsetTop: experienceTop } = experienceSection;
    const { offsetTop: sandboxTop } = sandboxSection;
    const { offsetTop: contactTop } = contactSection;
    if (scrollY >= aboutTop - tbHeight && scrollY < experienceTop - tbHeight) {
      return 'about';
    } else if (
      scrollY >= experienceTop - tbHeight &&
      scrollY < sandboxTop - tbHeight
    ) {
      return 'experience';
    } else if (
      scrollY >= sandboxTop - tbHeight &&
      scrollY < contactTop - tbHeight
    ) {
      return 'sandbox';
    } else {
      return 'contact';
    }
  }
};

export default TopBar;
