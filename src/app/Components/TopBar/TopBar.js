import React from 'react';

import ScrollToButton from './ScrollToButton';
import LanguageSelect from './LanguageSelect';

import texts from '../../Texts/textTopBar';

const calcStyles = width => {
  return {
    topBar: {
      width,
      display: 'flex',
      alignItems: 'center',
      color: '#bbc6e5',
      backgroundColor: '#0a192f',
      height: 50,
      top: 0,
      position: 'fixed',
      boxShadow: '0px 0px 10px black'
    },
    nameContainer: {
      padding: '0 10px'
    },
    buttonsContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignContent: 'space-between',
      padding: '0 10px'
    }
  };
};

const TopBar = ({ allocatedWidth }) => {
  const styles = calcStyles(allocatedWidth);
  return (
    <div style={{ ...styles.topBar }}>
      <div style={{ ...styles.nameContainer }}>Grégoire Duquenne</div>
      <div style={{ ...styles.buttonsContainer }}>
        <ScrollToButton text={texts.aboutBtn} />
        <ScrollToButton text={texts.experienceBtn} />
        <ScrollToButton text={texts.sandboxBtn} />
        <ScrollToButton text={texts.contactBtn} />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default TopBar;
