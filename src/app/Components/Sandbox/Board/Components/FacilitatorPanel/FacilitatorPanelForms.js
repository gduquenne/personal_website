import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import styleFacilitatorPanelForms from '../StyleSheets/styleFacilitatorPanelForms.jss';

const useStyles = makeStyles(styleFacilitatorPanelForms);

const editWorkshopTitleForm = (workshopTitle, setWorkshopTitle) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.menuForm}>
      <InputLabel
        htmlFor="workshopTitleInput"
        className={classes.menuInputLabel}
      >
        Workshop Title
      </InputLabel>
      <Input
        id="workshopTitleInput"
        aria-describedby="inputHelper"
        className={classes.menuInput}
        value={workshopTitle}
        onChange={event => setWorkshopTitle(event.target.value)}
      />
      <FormHelperText id="inputHelper">
        <span>Current Workshop Title : </span>
        <b>Untitled</b>
      </FormHelperText>
    </FormControl>
  );
};

const dateForm = (date, setDate) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.menuForm}>
      <Input
        type="date"
        value={date}
        className={classes.menuInput}
        aria-describedby="inputHelper"
        onChange={event => setDate(event.target.value)}
      />
      <FormHelperText id="inputHelper">
        <span>Current Workshop Scheduled Date : </span>
        <b>{date}</b>
      </FormHelperText>
    </FormControl>
  );
};

const timeForm = (time, setTime) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.menuForm}>
      <Input
        type="time"
        value={time}
        className={classes.menuInput}
        aria-describedby="inputHelper"
        onChange={event => setTime(event.target.value)}
      />
      <FormHelperText id="inputHelper">
        <span>Current Workshop Scheduled Time: </span>
        <b>{time}</b>
      </FormHelperText>
    </FormControl>
  );
};

const displayAddEmailForm = (newEmailAdressValue, setNewEmailAdressValue) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.menuForm}>
      <InputLabel htmlFor="emailAdressInput" className={classes.menuInputLabel}>
        Email address
      </InputLabel>
      <Input
        className={classes.menuInput}
        value={newEmailAdressValue}
        onChange={event => setNewEmailAdressValue(event.target.value)}
      />
      <FormHelperText>ex: you@remotings.com</FormHelperText>
    </FormControl>
  );
};

export { displayAddEmailForm, timeForm, dateForm, editWorkshopTitleForm };
