// Import Core
import React, { useState, useEffect } from 'react';

// Import Custom Components
import TopBar from './TopBar/TopBar';

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
      <div style={{ height: 50 }}></div>
      <button>Bonjour</button>
      <div style={{ height: 2000 }}></div>
      <div
        style={{
          height: 2000,
          width: '100%',
          backgroundColor: 'yellow'
        }}
        id="about"
      >
        I'm there!
      </div>
      <div id="experience"></div>
      <div id="sandbox"></div>
      <div id="contact"></div>
    </div>
  );
};

export default MainPage;
