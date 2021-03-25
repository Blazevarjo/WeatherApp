import React, {useEffect, useState} from 'react';
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

const theme = {
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

const Main = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    moment.locale('pl');
  });

  return (
    <PaperProvider theme={isDark ? DarkTheme : theme}>
      <App />
    </PaperProvider>
  );
};

export default Main;

AppRegistry.registerComponent(appName, () => Main);
