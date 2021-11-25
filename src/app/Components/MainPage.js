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

  useEffect(() => {
    const updateWindowWidth = () =>
      setAllocatedWidths(spreadSpaceToComponents(window.innerWidth));
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <div className={classes.background}>
      <TopBar allocatedWidth={allocatedWidths.topBar} />
      <div style={{ height: 50 }}></div>
      <button>Bonjour</button>
      <div style={{ height: 2000 }}></div>
      <div
        style={{
          height: 2000,
          width: '100%',
          backgroundColor: 'yellow',
          paddingTop: 50
        }}
        id="about"
      >
        I'm there!
      </div>
    </div>
  );
};

export default MainPage;
