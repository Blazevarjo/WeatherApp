import React, {useContext, useState} from 'react';
import {Platform} from 'react-native';
import {
  Appbar as MaterialAppBar,
  Divider,
  Menu,
  Searchbar,
  Subheading,
  Switch,
  useTheme,
} from 'react-native-paper';
import styled from 'styled-components';
import PreferencesContext from '../context/PreferencesContext ';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const APPBAR_HEIGHT = 60;

export default function Appbar({onClickLocation, onSubmit}) {
  const preferences = useContext(PreferencesContext);
  const theme = useTheme();
  const iconColor = theme.colors.textWhite;

  const [isSearch, setIsSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isSearch ? (
        <StyledSearchBar
          autoFocus={true}
          blurOnSubmit={true}
          icon="crosshairs-gps"
          placeholder="Podaj miejscowość"
          onBlur={() => setIsSearch(false)}
          onIconPress={() => {
            onClickLocation();
            setIsSearch(false);
          }}
          onSubmitEditing={(event) => {
            onSubmit(event.nativeEvent.text);
            setIsSearch(false);
          }}
        />
      ) : (
        <StyledAppbar>
          <MaterialAppBar.Content color={iconColor} title="Pogoda" />
          <MaterialAppBar.Action
            color={iconColor}
            icon="home-city-outline"
            onPress={() => {
              setIsSearch(true);
            }}
          />
          <StyledMenu
            anchor={
              <MaterialAppBar.Action
                color={iconColor}
                icon={MORE_ICON}
                onPress={() => {
                  setIsVisible((current) => !current);
                }}
              />
            }
            onDismiss={() => setIsVisible(false)}
            visible={isVisible}>
            <SwitchItemContainer first>
              <Subheading>Ciemny motyw</Subheading>
              <StyledSwitch
                color={theme.colors.secondary}
                value={preferences.theme.isThemeDark}
                onValueChange={preferences.theme.toggleTheme}
              />
            </SwitchItemContainer>
            <Divider />
            <SwitchItemContainer>
              <Subheading>Tryb dla seniorów</Subheading>
              <StyledSwitch
                color={theme.colors.secondary}
                value={preferences.elderMode.isElderMode}
                onValueChange={preferences.elderMode.toggleElderMode}
              />
            </SwitchItemContainer>
          </StyledMenu>
        </StyledAppbar>
      )}
    </>
  );
}

const StyledAppbar = styled(MaterialAppBar.Header)`
  height: ${`${APPBAR_HEIGHT}px`};
`;

const StyledSearchBar = styled(Searchbar)`
  height: ${`${APPBAR_HEIGHT}px`};
`;

const SwitchItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-top: ${({first}) => (first ? '0px' : '10px')};
  padding-bottom: ${({first}) => (first ? '10px' : '0px')};
`;

const StyledSwitch = styled(Switch)`
  padding-left: 20px;
  transform: scale(1.1);
`;

const StyledMenu = styled(Menu)`
  margin-top: ${`${APPBAR_HEIGHT}px`};
`;
