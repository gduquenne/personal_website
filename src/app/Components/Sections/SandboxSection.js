// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionSandbox from '../../StyleSheets/styleSectionSandbox';

const useStyles = makeStyles(styleSectionSandbox);

const SandboxSection = () => {
  const classes = useStyles();
  return (
    <div id="sandbox" className={classes.section}>
      sandbox
    </div>
  );
};

export default SandboxSection;
