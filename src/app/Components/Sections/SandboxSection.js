// Import Core
import React from 'react';

// Import Custom Components
import Maintenance from '../../Utils/Maintenance';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleSectionSandbox from '../../StyleSheets/styleSectionSandbox';

const useStyles = makeStyles(styleSectionSandbox);

const SandboxSection = () => {
  const classes = useStyles();
  return (
    <section id="sandbox" className={classes.section}>
      <Maintenance />
    </section>
  );
};

export default SandboxSection;
