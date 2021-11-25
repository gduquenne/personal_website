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

const LanguageSelect = () => {
  const { language, setUserLanguage } = useContext(Context);
  return (
    <FormControl sx={{ m: 0, minWidth: 120, marginRight: '20px' }}>
      <Select
        sx={{ height: 40 }}
        value={texts[`${language}Text`][language]}
        onChange={e => setUserLanguage(e.target.value)}
      >
        <MenuItem value="en">
          <SvgIcon sx={{ marginRight: '10px' }}>
            <GbFlag />
          </SvgIcon>
          {texts.enText.en}
        </MenuItem>
        <MenuItem value="fr">
          <SvgIcon sx={{ marginRight: '10px' }}>
            <FrFlag />
          </SvgIcon>
          {texts.frText.fr}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
