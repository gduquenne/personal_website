import React, { useState, useContext } from 'react';
import CookieParser from '../../../../Context/CookieParser';
import { modifyWorkshop } from '../../../../Api/Workshop';
import history from '../../../../App/index';
import UserContext from '../../../../Context/UserContext';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Components from Material-UI
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  TextField
} from '@material-ui/core';

import style from '../StyleSheets/styleConvertTemplate.jss';

// Import Texts
import textRm from '../../Texts/textConvertToTemplatePopUp';

const useStyles = makeStyles(style);

const ConvertToTemplatePopUp = ({ workshop }) => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const { language } = context;
  const themes = [
    textRm.agileManagement,
    textRm.strategyPlanning,
    textRm.meetingWorkshop,
    textRm.mapsDiagrams,
    textRm.uxDesign
  ];
  const industries = [
    textRm.agencies,
    textRm.marketing,
    textRm.education,
    textRm.projectManagement,
    textRm.development,
    textRm.operations,
    textRm.sales
  ];
  const checkbox = {};
  themes.forEach(elem => {
    checkbox[elem.en] = false;
  });
  industries.forEach(elem => {
    checkbox[elem.en] = false;
  });

  const { userName, userType } = CookieParser.parseCookie();

  const [checked, setChecked] = useState(checkbox);
  const [trendingTemplate, setTrendingTemplate] = useState(false);
  const [title, setTitle] = useState(workshop.title);
  const [creator, setCreator] = useState(userName);
  const [description, setDescription] = useState(workshop.description);
  const [tags, setTags] = useState(workshop.tags);
  const [thumbnail, setThumbnail] = useState(workshop.thumbnail);

  const handleChange = event => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const checkboxForm = (name, array) => (
    <>
      <div className={classes.themeText}>{name}</div>
      <FormGroup>
        {array.map(elem => {
          return (
            <FormControlLabel
              classes={{
                label: classes.checkboxLabelStyle,
                root: classes.checkboxStyle
              }}
              key={elem.en}
              control={
                <Checkbox
                  checked={checked[elem.en]}
                  onChange={handleChange}
                  name={elem.en}
                />
              }
              label={elem[language]}
            />
          );
        })}
      </FormGroup>
    </>
  );

  const textLeftMenu = () => (
    <div className={classes.textLeftMenu}>{textRm.textLeftMenu[language]}</div>
  );

  const leftMenu = () => (
    <div className={classes.leftMenu}>
      {textLeftMenu()}
      <hr />
      <div style={{ overflow: 'auto', height: '29vw' }}>
        {checkboxForm(textRm.theme[language], themes)}
        {checkboxForm(textRm.industries[language], industries)}
      </div>
    </div>
  );

  const rightMenuTextFields = (
    text,
    classname,
    onChange,
    defaultValue,
    props,
    children
  ) => (
    <>
      <div className={classes.simpleText}>{text}</div>
      <TextField
        className={classname}
        variant="outlined"
        size="small"
        onChange={onChange}
        defaultValue={defaultValue}
        {...props}
      >
        {children}
      </TextField>
    </>
  );

  const optionsCreator = () => {
    const options = [
      <option key={userName} value={userName}>
        {userName}
      </option>
    ];
    if (userType === 'moderator') {
      options.push(
        <option key="remoting" value="Remotings">
          Remotings
        </option>
      );
    }
    return options;
  };

  const centerMenu = () => (
    <div className={classes.centerMenu}>
      <div className={classes.title}>{textRm.convert[language]}</div>
      {rightMenuTextFields(
        textRm.templateName[language],
        classes.textField,
        e => setTitle(e.target.value),
        title,
        { inputProps: { maxlength: 25 } }
      )}
      {rightMenuTextFields(
        textRm.creator[language],
        classes.textField,
        e => setCreator(e.target.value),
        userName,
        { select: true },
        optionsCreator()
      )}
      {rightMenuTextFields(
        textRm.description[language],
        classes.description,
        e => setDescription(e.target.value),
        description,
        {
          rowsMax: 4,
          multiline: true
        }
      )}
      {rightMenuTextFields(textRm.linkInstruction[language], classes.textField)}
      {rightMenuTextFields(
        textRm.addTags[language],
        classes.textField,
        e => setTags(e.target.value),
        tags
      )}
    </div>
  );

  const changeThumbnail = event => {
    const reader = new FileReader();
    reader.readAsDataURL(event.nativeEvent.srcElement.files[0]);
    reader.onload = () => setThumbnail(reader.result);
  };

  const validateTemplate = () => {
    const body = {
      _id: workshop._id,
      type: 'template'
    };
    const arrayTheme = [];
    themes.forEach(theme => {
      if (checked[theme.en] === true) {
        arrayTheme.push(theme.en);
      }
    });
    if (arrayTheme.length > 0) {
      body.themes = arrayTheme;
    }
    const arrayIndustries = [];
    industries.forEach(industrie => {
      if (checked[industrie.en] === true) {
        arrayIndustries.push(industrie.en);
      }
    });
    if (arrayIndustries.length > 0) {
      body.industries = arrayIndustries;
    }
    if (creator !== userName) {
      body.owner = 'Remotings';
    }
    if (description !== workshop.description) {
      body.description = description;
    }
    if (tags !== workshop.tags) {
      body.tags = tags;
    }
    if (title !== workshop.title) {
      body.title = title;
    }
    if (thumbnail !== workshop.thumbnail) {
      body.thumbnail = thumbnail;
    }
    if (trendingTemplate === true) {
      body.trendingTemplate = true;
    }
    modifyWorkshop([body]).then(response => {
      if (response.status === 204) {
        history.push('/');
      }
    });
  };

  const rightMenu = () => (
    <div className={classes.rightMenu}>
      <div className={classes.textImage}>{textRm.current[language]}</div>
      <img className={classes.image} src={thumbnail} />
      <Button
        size="small"
        className={classes.changeImageButton}
        component="label"
      >
        {textRm.changeImage[language]}
        <input type="file" accept="image/*" hidden onChange={changeThumbnail} />
      </Button>
      {userType === 'moderator' &&
        checkboxTrendingTemplate(
          trendingTemplate,
          setTrendingTemplate,
          classes
        )}
      <Button
        size="small"
        className={classes.saveAndExitButton}
        onClick={validateTemplate}
      >
        {textRm.saveExit[language]}
      </Button>
    </div>
  );

  return (
    <div className={classes.container}>
      {leftMenu()}
      {centerMenu()}
      {rightMenu()}
    </div>
  );
};

const checkboxTrendingTemplate = (
  trendingTemplate,
  setTrendingTemplate,
  classes
) => {
  return (
    <FormControlLabel
      classes={{
        label: classes.checkboxLabelStyle,
        root: classes.checkboxStyle
      }}
      key="trendingTemplate"
      control={
        <Checkbox
          checked={trendingTemplate}
          onChange={e => setTrendingTemplate(!trendingTemplate)}
          name="trendingTemplate"
        />
      }
      label="Trending Template"
    />
  );
};

export default ConvertToTemplatePopUp;
