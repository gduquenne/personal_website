import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

import MainPage from './Components/MainPage';
import { UserContext } from '../Context/UserContext';

ReactDOM.render(
  <UserContext>
    <MainPage />
  </UserContext>,
  document.getElementById('root')
);

// ReactDOM.render(<MainPage />, document.getElementById('root'));
