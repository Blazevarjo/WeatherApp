import React from 'react';
import {Card, Subheading, Paragraph, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Container = styled(Card)`
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Location = {
  Container: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  WeatherWrapper: styled.View`
    display: flex;
  `,
  WeatherIcon: styled(Icon)`
    text-align: center;
    padding: -5px;
    margin: -10px 0;
  `,
  InfoWrapper: styled.View`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
    align-self: flex-end;
  `,
  CityWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: -5px;
  `,
};

const Temperature = {
  Container: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  `,
  CurrentTemp: styled.Text`
    font-size: 96px;
    margin-left: -40px;
  `,
  MinMaxContainer: styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px 0 5px 20px;
  `,
  MinMaxParagraph: styled(Paragraph)`
    font-size: 16px;
  `,
  RealFeel: styled(Paragraph)`
    text-align: center;
    font-size: 16px;
  `,
};

const LocationInfo = ({
  city,
  currentTemp,
  date,
  description,
  feelTemp,
  minTemp,
  maxTemp,
  weatherIcon,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <Location.Container>
        <Location.WeatherWrapper>
          <Location.WeatherIcon
            name={weatherIcon}
            size={90}
            color={theme.colors.primary}
          />
          <Paragraph>{description}</Paragraph>
        </Location.WeatherWrapper>
        <Location.InfoWrapper>
          <Location.CityWrapper>
            <Icon name="map-marker" size={20} color={theme.colors.primary} />
            <Subheading style={{fontWeight: 'bold'}}>{city}</Subheading>
          </Location.CityWrapper>
          <Subheading>{date.format('dddd, D MMMM')}</Subheading>
          <Subheading>{date.format('LT')}</Subheading>
        </Location.InfoWrapper>
      </Location.Container>
      <Temperature.Container>
        <Temperature.CurrentTemp>{`${currentTemp}°C`}</Temperature.CurrentTemp>
        <Temperature.MinMaxContainer>
          <Temperature.MinMaxParagraph>{`Max: ${maxTemp}°C`}</Temperature.MinMaxParagraph>
          <Temperature.MinMaxParagraph>{`Min: ${minTemp}°C`}</Temperature.MinMaxParagraph>
        </Temperature.MinMaxContainer>
      </Temperature.Container>
      <Temperature.RealFeel>
        {`Temperatura odczuwalna: ${feelTemp}°`}
      </Temperature.RealFeel>
    </Container>
  );
};

export default function MainContent(props) {
  return (
    <Card>
      <LocationInfo {...props} />
    </Card>
  );
}
