import React, { useState, useEffect } from 'react';

const Context = React.createContext({ language: 'en' });

export const UserContext = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState('en');

  useEffect(() => {
    let language = localStorage.getItem('language');
    if (language !== 'fr') {
      language = 'en';
    }
    setUserLanguage(language);
  }, []);

  return (
    <Context.Provider
      value={{
        language: userLanguage,
        setUserLanguage: language => {
          localStorage.setItem('language', language);
          setUserLanguage(language);
        }
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
