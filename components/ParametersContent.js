import React from 'react';
import {Card, Title, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

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
  `,
  Row: styled.View`
    display: flex;
    flex-direction: ${({invert}) => (invert ? 'row-reverse' : 'row')};
    justify-content: space-between;
    margin-top: 8px;
  `,
};

export default function ParametersContent({data}) {
  return (
    <Content.Container>
      <Content.Row>
        <Parameter icon="weather-sunset-up" value="7:20" />
        <Parameter icon="weather-sunset-down" value="19:00" />
      </Content.Row>
      <Content.Row>
        <Parameter icon="weather-windy" value="5.71 m/s" windDirection={350} />
        <Parameter icon="weather-windy" value="5.71 m/s" windDirection={40} />
      </Content.Row>
      <Content.Row>
        <Parameter icon="weather-windy" value="5.71 m/s" windDirection={350} />
        <Parameter icon="weather-windy" value="5.71 m/s" windDirection={40} />
      </Content.Row>
    </Content.Container>
  );
}
