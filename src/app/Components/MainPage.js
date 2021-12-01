// Import Core
import React, { useState, useEffect, useContext } from 'react';
import Context from '../../Context/UserContext';

// Import Custom Components
import TopBar from './TopBar/TopBar';
import IntroSection from './Sections/IntroSection';
import AboutSection from './Sections/AboutSection';
import ExperienceSection from './Sections/ExperienceSection';
import SandboxSection from './Sections/SandboxSection';
import ContactSection from './Sections/ContactSection';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleMainPage from '../StyleSheets/styleMainPage';

// Import Texts
import texts from '../Texts/textIntro';

const useStyles = makeStyles(styleMainPage);

const spreadSpaceToComponents = windowWidth => {
  return { topBar: windowWidth };
};

const MainPage = () => {
  const { language } = useContext(Context);
  const classes = useStyles();

  const [allocatedWidths, setAllocatedWidths] = useState(
    spreadSpaceToComponents(window.innerWidth)
  );

  const [scrollTo, setScrollTo] = useState({ id: '', bool: false });

  useEffect(() => {
    const updateWindowWidth = () =>
      setAllocatedWidths(spreadSpaceToComponents(window.innerWidth));
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  useEffect(() => {
    if (scrollTo.id.length !== 0) {
      window.scroll({
        top: document.getElementById(scrollTo.id).offsetTop
      });
    }
  }, [scrollTo.bool]);

  return (
    <div>
      <TopBar
        allocatedWidth={allocatedWidths.topBar}
        setScrollTo={id => setScrollTo({ id, bool: !scrollTo.bool })}
      />
      <main>
        <IntroSection />
        <AboutSection />
        <ExperienceSection />
        <SandboxSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default MainPage;
