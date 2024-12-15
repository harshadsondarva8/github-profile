import {Text, TextStyle, type TextProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

// Define types for FontWeight and TextAlign
type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

type Align = 'left' | 'auto' | 'right' | 'center' | 'justify' | undefined;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  children: React.ReactNode;
  fontSize?: number;
  fontWeight?: FontWeight;
  align?: Align;
  customColor?: string;
  lineHeight?: number | undefined;
  italic?: boolean;
  style?: object | undefined;
};

export function ThemedText({
  children,
  style,
  lightColor,
  darkColor,
  type = 'default',
  fontSize = 12,
  fontWeight = '400',
  align = 'left',
  lineHeight = 18,
  italic = false,
  customColor = '',
  ...rest
}: ThemedTextProps) {
  // Define the style for the text container
  const containerStyle: TextStyle = {
    fontSize,
    fontWeight,
    textAlign: align,
    lineHeight,
    fontStyle: italic ? 'italic' : 'normal',
    ...(style as TextStyle),
  };

  const color = customColor
    ? customColor
    : useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return (
    <Text style={[{color}, containerStyle]} {...rest}>
      {children}
    </Text>
  );
}
