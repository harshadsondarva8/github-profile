import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {ReactNode, useEffect, useState} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

export type ThemeProviderContainerProps = {
  children: ReactNode;
};

export default function ThemeProviderContainer(
  props: ThemeProviderContainerProps,
) {
  const colorScheme = useColorScheme();
  const {themeMode} = useSelector((state: RootState) => state?.DeviceConfig);
  const [theme, setTheme] = useState<any>(colorScheme);

  useEffect(() => {
    if (themeMode) {
      setTheme(themeMode);
    }
  }, [themeMode]);

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      {props.children}
    </ThemeProvider>
  );
}
