import React, { useState, useEffect } from 'react';
import TopBar from './TopBar/TopBar';

const styles = {
  background: {
    minHeight: window.innerHeight,
    width: '100%',
    backgroundColor: '#0a192f'
  }
};

const spreadSpaceToComponents = windowWidth => {
  return { topBar: windowWidth };
};

const MainPage = () => {
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
    <>
      <div style={styles.background}>
        {displayTopBar(allocatedWidths.topBar)}
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
    </>
  );
};

const displayTopBar = allocatedWidth => (
  <TopBar allocatedWidth={allocatedWidth} />
);

export default MainPage;
