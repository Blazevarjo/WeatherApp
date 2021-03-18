import React, {useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {StatusBar, View} from 'react-native';
import Appbar from './components/Appbar';
import MainContent from './components/MainContent';
import moment from 'moment';
import styled from 'styled-components';
import ParametersContent from './components/ParametersContent';

const Layout = styled.View`
  margin: 5px 8px;
`;

const App = () => {
  const theme = useTheme();

  return (
    <View>
      <StatusBar backgroundColor={theme.colors.primaryVariant} />
      <Appbar />
      <Layout>
        <MainContent
          city="Gliwice"
          date={moment()}
          description="lekkie zachmurzenie"
          weatherIcon="weather-cloudy"
        />
        <ParametersContent />
      </Layout>
    </View>
  );
};

export default App;
