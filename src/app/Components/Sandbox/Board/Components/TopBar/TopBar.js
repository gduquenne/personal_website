// Import Core
import React, { useState, useEffect } from 'react';
import history from '../../../../App/index';
import { modifyWorkshop } from '../../../../Api/Workshop';
import CookieParser from '../../../../Context/CookieParser';

// Import Components from Material-UI
import { Button, Input } from '@material-ui/core';

// Import Styles
import '../../../../App/styles.scss';
import styleTopBar from '../StyleSheets/styleTopBar.jss';

// Import Styles from Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Import Images
import rmlogo from '../../../../../public/img/Remotings_Logo_NavBar.svg';

const useStyles = makeStyles(styleTopBar);

const TopBar = function ({ workshop }) {
  const classes = useStyles();
  const cookieAuth = CookieParser.parseCookie();
  const [workshopTitle, setWorkshopTitle] = useState('Untitled');
  const [editRights, setEditRights] = useState(false);

  useEffect(() => {
    if (workshop) {
      setWorkshopTitle(workshop.title);
      if (cookieAuth.userHash !== workshop.owner) {
        setEditRights(true);
      } else {
        setEditRights(false);
      }
    }
  }, [workshop]);

  return (
    <>
      <div className={classes.topBarContainer}>
        {displayButtonLogo(classes)}
      </div>
      {workshop &&
        displayTitle(
          classes,
          workshop,
          workshopTitle,
          setWorkshopTitle,
          editRights
        )}
    </>
  );
};

const displayButtonLogo = classes => (
  <Button className={classes.buttonLogo} onClick={() => history.push('/')}>
    <img className={classes.logo} src={`/${rmlogo}`} alt="RMlogo" />
  </Button>
);

const displayTitle = (
  classes,
  workshop,
  workshopTitle,
  setWorkshopTitle,
  editRights
) => {
  let disabledInput = '';
  if (editRights) {
    disabledInput = classes.disabledInput;
  }

  return (
    <div className={`${classes.boardTitleContainer} ${disabledInput}`}>
      <Input
        value={workshopTitle}
        onChange={event => setWorkshopTitle(event.target.value)}
        onBlur={() =>
          saveWorkshopTitle(workshop, workshopTitle, setWorkshopTitle)
        }
        disabled={editRights}
        disableUnderline={true}
        className={`${classes.titleInput} ${disabledInput}`}
        inputProps={{ style: { textAlign: 'center' }, maxLength: 25 }}
      />
    </div>
  );
};

const saveWorkshopTitle = (workshop, workshopTitle, setWorkshopTitle) => {
  const body = [
    {
      _id: workshop._id,
      title: workshopTitle
    }
  ];
  modifyWorkshop(body).then(response => {
    if (response.status !== 204) {
      setWorkshopTitle(workshop.title);
    }
  });
};

export default TopBar;
