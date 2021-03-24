import React, {useState} from 'react';
import {Platform} from 'react-native';
import {
  Appbar as MaterialAppBar,
  Searchbar,
  useTheme,
} from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Appbar({onClickLocation, onSubmit}) {
  const theme = useTheme();
  const iconColor = theme.colors.textWhite;

  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      {isSearch ? (
        <Searchbar
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
        <MaterialAppBar.Header>
          <MaterialAppBar.Content color={iconColor} title="Pogoda" />
          <MaterialAppBar.Action
            color={iconColor}
            icon="home-city-outline"
            onPress={() => {
              setIsSearch(true);
            }}
          />
          <MaterialAppBar.Action
            color={iconColor}
            icon={MORE_ICON}
            onPress={() => {}}
          />
        </MaterialAppBar.Header>
      )}
    </>
  );
}
