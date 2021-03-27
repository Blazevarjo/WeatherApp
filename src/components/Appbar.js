import React, {useRef, useState} from 'react';
import {Platform} from 'react-native';
import {
  Appbar as MaterialAppBar,
  Divider,
  Menu,
  Searchbar,
  Subheading,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import styled from 'styled-components';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const APPBAR_HEIGHT = 60;

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
`;

const StyledMenu = styled(Menu)`
  margin-top: ${`${APPBAR_HEIGHT}px`};
`;

export default function Appbar({onClickLocation, onSubmit}) {
  const theme = useTheme();
  const iconColor = theme.colors.textWhite;
  const [isSearch, setIsSearch] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
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
                  setIsVisible(!isVisible);
                }}
              />
            }
            onDismiss={() => setIsVisible(false)}
            visible={isVisible}>
            <SwitchItemContainer first>
              <Subheading>Ciemny motyw</Subheading>
              <StyledSwitch
                value={isSwitchOn}
                onValueChange={() => setIsSwitchOn(!isSwitchOn)}
              />
            </SwitchItemContainer>
            <Divider />
            <SwitchItemContainer>
              <Subheading>Tryb dla seniorów</Subheading>
              <StyledSwitch
                value={isSwitchOn}
                onValueChange={() => setIsSwitchOn(!isSwitchOn)}
              />
            </SwitchItemContainer>
          </StyledMenu>
        </StyledAppbar>
      )}
    </>
  );
}
