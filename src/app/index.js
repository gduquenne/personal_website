// Import Core
import React from 'react';
import ReactDOM from 'react-dom';
import { UserContext } from '../Context/UserContext';

// Import Styles
import './StyleSheets/style.scss';

// Import Custom Components
import MainPage from './Components/MainPage';

ReactDOM.render(
  <UserContext>
    <MainPage />
  </UserContext>,
  document.getElementById('root')
);
