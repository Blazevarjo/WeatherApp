import React from 'react';
import {Card, Title, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import moment from 'moment';

const Wind = {
  Container: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Icon: styled(Icon)`
    margin-left: 10px;
    transform: ${({windDirection}) => `rotate(${windDirection}deg)`};
  `,
};

const WindParam = ({value, windDirection}) => {
  const theme = useTheme();
  return (
    <Wind.Container>
      <Title>{value}</Title>
      <Wind.Icon
        name="arrow-up-thick"
        size={32}
        color={theme.colors.primary}
        windDirection={windDirection}
      />
    </Wind.Container>
  );
};

const Param = {
  Container: styled(Card)`
    padding: 30px 0;
    width: 49%;
  `,
  Icon: styled(Icon)`
    text-align: center;
  `,
  Value: styled(Title)`
    text-align: center;
  `,
};

const Parameter = ({icon, value, windDirection}) => {
  const theme = useTheme();
  return (
    <Param.Container>
      <Param.Icon name={icon} size={64} color={theme.colors.primary} />
      {windDirection ? (
        <WindParam value={value} windDirection={windDirection} />
      ) : (
        <Param.Value>{value}</Param.Value>
      )}
    </Param.Container>
  );
};

const Content = {
  Container: styled.View`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  Row: styled.View`
    display: flex;
    flex-direction: ${({invert}) => (invert ? 'row-reverse' : 'row')};
    justify-content: space-between;
    margin-top: 8px;
  `,
};

export default function ParametersContent({
  clouds,
  humidity,
  pressure,
  sunsetDown,
  sunsetUp,
  windSpeed,
  windDirection,
}) {
  return (
    <Content.Container>
      <Content.Row>
        <Parameter icon="weather-sunset-up" value={sunsetUp} />
        <Parameter icon="weather-sunset-down" value={sunsetDown} />
      </Content.Row>
      <Content.Row>
        <Parameter icon="gauge" value={pressure + ' hPa'} />

        <Parameter icon="water-percent" value={humidity + ' %'} />
      </Content.Row>
      <Content.Row>
        <Parameter
          icon="weather-windy"
          value={windSpeed + 'm/s'}
          windDirection={windDirection}
        />
        <Parameter icon="cloud-outline" value={clouds + ' %'} />
      </Content.Row>
    </Content.Container>
  );
}
