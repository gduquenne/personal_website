// Import Core
import React from 'react';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionSandbox from '../../StyleSheets/styleSectionSandbox';

const useStyles = makeStyles(styleSectionSandbox);

const SandboxSection = () => {
  const classes = useStyles();
  return (
    <section id="sandbox" className={classes.section}>
      sandbox
    </section>
  );
};

export default SandboxSection;
