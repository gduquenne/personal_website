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

const TopBar = ({ allocatedWidth }) => {
  const classes = useStyles({ allocatedWidth })();
  return (
    <div className={classes.topBar}>
      <div className={classes.nameContainer}>Grégoire Duquenne</div>
      <div className={classes.buttonsContainer}>
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
