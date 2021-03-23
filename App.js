import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {RefreshControl, ScrollView, StatusBar, Text, View} from 'react-native';
import Appbar from './components/Appbar';
import MainContent from './components/MainContent';
import moment from 'moment';
import styled from 'styled-components';
import ParametersContent from './components/ParametersContent';

const Container = styled.View`
  display: flex;
  height: 100%;
`;

const Layout = styled.View`
  padding: 5px 8px;
`;

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('Katowice');
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5a18fe07b80585d48ec1452923df513&lang=pl&units=metric
      `)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      })
      .then(() => setIsLoading(false));
  }, []);
  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primaryVariant} />
      <Appbar />

      <ScrollView refreshControl={<RefreshControl />}>
        <Layout>
          {data && (
            <MainContent
              currentTemp={Math.round(data.main.temp)}
              feelTemp={Math.round(data.main.feels_like)}
              minTemp={Math.round(data.main.temp_min)}
              maxTemp={Math.round(data.main.temp_max)}
              city={city}
              date={moment()}
              description={data.weather[0].description}
              weatherIcon="weather-cloudy"
            />
          )}
          {data && (
            <ParametersContent
              clouds={data.clouds.all}
              humidity={data.main.humidity}
              pressure={data.main.pressure}
              sunsetDown={moment
                .unix(data.sys.sunset + data.timezone)
                .format('LT')}
              sunsetUp={moment
                .unix(data.sys.sunrise + data.timezone)
                .format('LT')}
              windSpeed={data.wind.speed}
              windDirection={data.wind.deg}
            />
          )}
        </Layout>
      </ScrollView>
    </Container>
  );
};

export default App;
