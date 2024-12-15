import {View, ViewStyle, type ViewProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {ReactNode} from 'react';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  transparent?: boolean;
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  flexDirection?: ViewStyle['flexDirection'];
  customColor?: string;
  children?: ReactNode;
};

export function ThemedView({
  children,
  style,
  transparent = false,
  lightColor,
  darkColor,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  flexDirection = 'column',
  customColor = '',
  ...otherProps
}: ThemedViewProps) {
  // Create a style object for the view container
  const containerStyle: ViewStyle = {
    alignItems,
    justifyContent,
    flexDirection,
    ...(style as ViewStyle),
  };

  let backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  if (customColor) {
    backgroundColor = customColor;
  } else if (transparent) {
    backgroundColor = 'transparent';
  } else {
    backgroundColor = useThemeColor(
      {light: lightColor, dark: darkColor},
      'background',
    );
  }

  return (
    <View style={[{backgroundColor}, containerStyle]} {...otherProps}>
      {children}
    </View>
  );
}
