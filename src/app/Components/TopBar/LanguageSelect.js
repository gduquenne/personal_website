// Import Core
import React, { useContext } from 'react';
import Context from '../../../Context/UserContext';

// Import MUI Components
import { Select, MenuItem, SvgIcon, FormControl } from '@mui/material';

// Import Texts
import texts from '../../Texts/textTopBar';

// Import Images
import FrFlag from '../../../../public/svg/frFlag.svg';
import GbFlag from '../../../../public/svg/gbFlag.svg';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleLanguageSelect from '../../StyleSheets/styleLanguageSelect';

const useStyles = makeStyles(styleLanguageSelect);

const LanguageSelect = () => {
  const { language, setUserLanguage } = useContext(Context);
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        className={classes.select}
        value={language}
        onChange={e => setUserLanguage(e.target.value)}
      >
        <MenuItem value="en">
          <SvgIcon className={classes.iconMenuItem}>
            <GbFlag />
          </SvgIcon>
          <span className={classes.textMenuItem}>{texts.enText.en}</span>
        </MenuItem>
        <MenuItem value="fr">
          <SvgIcon className={classes.iconMenuItem}>
            <FrFlag />
          </SvgIcon>
          <span className={classes.textMenuItem}>{texts.frText.fr}</span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
