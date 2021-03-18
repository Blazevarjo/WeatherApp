import React from 'react';
import {Platform} from 'react-native';
import {Appbar as MaterialAppBar, useTheme} from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Appbar() {
  const theme = useTheme();
  const iconColor = theme.colors.textWhite;
  return (
    <MaterialAppBar.Header>
      <MaterialAppBar.Content color={iconColor} title="Pogoda" />
      <MaterialAppBar.Action
        color={iconColor}
        icon="magnify"
        onPress={() => {}}
      />
      <MaterialAppBar.Action
        color={iconColor}
        icon={MORE_ICON}
        onPress={() => {}}
      />
    </MaterialAppBar.Header>
  );
}
