import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeoLocation from 'react-native-geolocation-service';
import moment from 'moment';
import styled from 'styled-components';

import Appbar from './components/Appbar';
import MainContent from './components/MainContent';
import ParametersContent from './components/ParametersContent';

export default function App() {
  const [data, setData] = useState(null);
  const [fetchDate, setFetchDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const isInitMount = useRef(true);

  const theme = useTheme();

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      if (
        [
          PermissionsAndroid.RESULTS.DENIED,
          PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
        ].includes(status)
      ) {
        ToastAndroid.show(
          'Użytkownik odmówił udzielenia uprawnień do lokalizacji.',
          ToastAndroid.LONG,
        );
      }
    }
    return false;
  };

  const fetchData = () => {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?${
      location.city ? `q=${location.city}` : ''
    }${
      location.coords
        ? `lat=${location.coords.lat}&lon=${location.coords.lon}`
        : ''
    }&appid=d5a18fe07b80585d48ec1452923df513&lang=pl&units=metric
  `;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFetchDate(moment());
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const updateCurrentLocation = async () => {
    setIsLoading(true);
    GeoLocation.getCurrentPosition(
      (position) => {
        setLocation({
          city: null,
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
        setIsLoading(false);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const loadLocation = async () => {
    try {
      const value = await AsyncStorage.getItem('location');
      if (value !== null) {
        setLocation(JSON.parse(value));
      } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (hasPermission) {
          await updateCurrentLocation();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveLocation = async () => {
    if (!location) {
      console.log(location);
      return;
    }
    try {
      await AsyncStorage.setItem('location', JSON.stringify(location));
      console.log('save ' + location);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isInitMount.current) {
      loadLocation();
      isInitMount.current = false;
    } else {
      saveLocation();
      fetchData();
    }
  }, [location]);

  return (
    <Container theme={theme}>
      <StatusBar backgroundColor={theme.colors.primaryVariant} />
      <Appbar
        onClickLocation={async () => {
          const hasPermission = await hasLocationPermission();
          if (!hasPermission) {
            return;
          }
          await updateCurrentLocation();
        }}
        onSubmit={(searchQuery) =>
          setLocation({city: searchQuery, coords: null})
        }
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }>
        <Layout>
          {data && (
            <>
              <MainContent
                currentTemp={Math.round(data.main.temp)}
                feelTemp={Math.round(data.main.feels_like)}
                minTemp={Math.round(data.main.temp_min)}
                maxTemp={Math.round(data.main.temp_max)}
                city={data.name}
                date={fetchDate}
                description={data.weather[0].description}
                weatherIcon={data.weather[0].icon}
              />
              <ParametersContent
                clouds={data.clouds.all}
                humidity={data.main.humidity}
                pressure={data.main.pressure}
                sunsetDown={moment.unix(data.sys.sunset).format('LT')}
                sunsetUp={moment.unix(data.sys.sunrise).format('LT')}
                windSpeed={data.wind.speed}
                windDirection={data.wind.deg}
              />
            </>
          )}
        </Layout>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  height: 100%;
  background-color: ${({theme}) => theme.colors.background};
`;

const Layout = styled.View`
  padding: 5px 8px;
`;
