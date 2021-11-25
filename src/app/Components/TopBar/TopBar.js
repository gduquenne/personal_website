// Import Core
import React from 'react';

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
  return (
    <div id="topBar" className={classes.topBar}>
      <div className={classes.nameContainer}>Grégoire Duquenne</div>
      <div className={classes.buttonsContainer}>
        <ScrollToButton text={texts.aboutBtn} setScrollTo={setScrollTo} />
        <ScrollToButton text={texts.experienceBtn} setScrollTo={setScrollTo} />
        <ScrollToButton text={texts.sandboxBtn} setScrollTo={setScrollTo} />
        <ScrollToButton text={texts.contactBtn} setScrollTo={setScrollTo} />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default TopBar;
