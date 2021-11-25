// Import Core
import React, { useState, useEffect } from 'react';

// Import Custom Components
import TopBar from './TopBar/TopBar';
import AboutSection from './Sections/AboutSection';
import ExperienceSection from './Sections/ExperienceSection';
import SandboxSection from './Sections/SandboxSection';
import ContactSection from './Sections/ContactSection';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleMainPage from '../StyleSheets/styleMainPage';

const useStyles = makeStyles(styleMainPage);

const spreadSpaceToComponents = windowWidth => {
  return { topBar: windowWidth };
};

const MainPage = () => {
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
        top:
          document.getElementById(scrollTo.id).offsetTop -
          document.getElementById('topBar').offsetHeight
      });
    }
  }, [scrollTo.bool]);

  return (
    <div className={classes.background}>
      <TopBar
        allocatedWidth={allocatedWidths.topBar}
        setScrollTo={id => setScrollTo({ id, bool: !scrollTo.bool })}
      />
      <div id="intro" style={{ height: window.innerHeight }}></div>
      <AboutSection />
      <ExperienceSection />
      <SandboxSection />
      <ContactSection />
    </div>
  );
};

export default MainPage;
