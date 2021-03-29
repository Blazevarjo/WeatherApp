import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppRegistry, ImageBackground} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#26a2ff',
    primaryVariant: '#0069c0',
    secondary: '#f36e21',
    textWhite: '#ffffff',
    statusbar: '#0069c0',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#26a2ff',
    secondary: '#f36e21',
    textWhite: '#ffffff',
    statusbar: DarkTheme.colors.background,
  },
};

const Main = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isElderMode, setIsElderMode] = useState(false);
  const isInitMount = useRef(true);
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

  const loadPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('preferences');
      if (value !== null) {
        let prefs = JSON.parse(value);
        setIsThemeDark(prefs.theme.isThemeDark);
        setIsElderMode(prefs.elderMode.isElderMode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem('preferences', JSON.stringify(preferences));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isInitMount.current) {
      // moment.locale('pl');
      loadPreferences();

      isInitMount.current = false;
    } else {
      savePreferences();
    }
  }, [preferences]);

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
