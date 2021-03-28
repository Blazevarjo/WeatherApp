import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: {isThemeDark: false, toggleTheme: () => {}},
  elderMode: {isElderMode: false, toggleElderMode: () => {}},
});

export default PreferencesContext;
