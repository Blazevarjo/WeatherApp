import React, {useContext} from 'react';
import {Card, Paragraph, Text, Title, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import PreferencesContext from '../context/PreferencesContext ';

const WindParam = ({value, windDirection}) => {
  const theme = useTheme();
  return (
    <Wind.Container>
      <Param.Value>{value}</Param.Value>
      <Wind.Icon
        name="arrow-up-thick"
        size={32}
        color={theme.colors.primary}
        windDirection={windDirection}
      />
    </Wind.Container>
  );
};

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

const Parameter = ({icon, title, value, windDirection}) => {
  const theme = useTheme();
  const {elderMode} = useContext(PreferencesContext);

  return (
    <Param.Container>
      {elderMode.isElderMode && <Param.Title>{title}</Param.Title>}
      <Param.Icon name={icon} size={64} color={theme.colors.primary} />
      {windDirection ? (
        <WindParam value={value} windDirection={windDirection} />
      ) : (
        <Param.Value>{value}</Param.Value>
      )}
    </Param.Container>
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
  Title: styled(Title)`
    text-align: center;
    padding-bottom: 5px;
  `,
  Value: styled(Text)`
    text-align: center;
    font-size: 18px;
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
        <Parameter
          icon="weather-sunset-up"
          title="Wschód słońca"
          value={sunsetUp}
        />
        <Parameter
          icon="weather-sunset-down"
          title="Zachód słońca"
          value={sunsetDown}
        />
      </Content.Row>
      <Content.Row>
        <Parameter icon="gauge" title="Ciśnienie" value={pressure + ' hPa'} />
        <Parameter
          icon="water-percent"
          title="Wilgotność"
          value={humidity + ' %'}
        />
      </Content.Row>
      <Content.Row>
        <Parameter
          icon="weather-windy"
          title="Wiatr"
          value={windSpeed + 'm/s'}
          windDirection={windDirection}
        />
        <Parameter
          icon="cloud-outline"
          title="Zachmurzenie"
          value={clouds + ' %'}
        />
      </Content.Row>
    </Content.Container>
  );
}

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
