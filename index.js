import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import moment from 'moment';
import 'moment/min/locales';
import PreferencesContext from './src/context/PreferencesContext ';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#26a2ff',
    primaryVariant: '#0069c0',
    secondary: '#f36e21',
    secondaryVariant: '#c8a415',
    textWhite: '#ffffff',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    textWhite: '#ffffff',
  },
};

const Main = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isElderMode, setIsElderMode] = useState(false);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark((currentTheme) => !currentTheme);
  }, [isThemeDark]);

  const theme = isThemeDark ? CustomDarkTheme : CustomTheme;

  const toggleElderMode = useCallback(() => {
    return setIsElderMode((currentMode) => !currentMode);
  }, [isElderMode]);

  const preferences = useMemo(
    () => ({
      theme: {
        toggleTheme,
        isThemeDark,
      },
      elderMode: {isElderMode, toggleElderMode},
    }),
    [toggleTheme, isThemeDark, toggleElderMode, isElderMode],
  );

  useEffect(() => {
    moment.locale('pl');
  });

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default Main;

AppRegistry.registerComponent(appName, () => Main);
