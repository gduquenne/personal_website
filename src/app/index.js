// Import Core
import React from 'react';
import { createRoot  } from 'react-dom/client';
import { UserContext } from '../Context/UserContext';

// Import Styles
import './StyleSheets/style.scss';

// Import Custom Components
import MainPage from './Components/MainPage';

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <UserContext>
    <MainPage />
  </UserContext>);
