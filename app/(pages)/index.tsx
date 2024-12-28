import React, {useEffect} from 'react';
import {BackHandler, Alert, Image, TouchableOpacity} from 'react-native';
import SearchScreen from '@/components/search-screen';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';
import {Feather} from '@expo/vector-icons';
import {RootState, Store, useAppSelector} from '@/redux/store';
import {changeTheme} from '@/redux/reducers/DeviceConfig';
import {useThemeColor} from '@/hooks/useThemeColor';

/**
 * Search component for displaying and searching users.
 * @returns {JSX.Element} - Rendered component.
 */

const Screen: React.FC = () => {
  const colorScheme = useAppSelector(
    (state: RootState) => state?.DeviceConfig?.themeMode,
  );
  const navigation = useNavigation();

  // Set navigation options for the screen
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Search Users',
      headerBackTitle: 'Go back',
      headerTitle: () => (
        <ThemedView transparent alignItems="center" justifyContent="center">
          <ThemedText fontSize={20} lineHeight={30} fontWeight="500">
            Search Users
          </ThemedText>
        </ThemedView>
      ),
      headerLeft: () => (
        <Image
          source={
            colorScheme === 'dark'
              ? require('../../assets/images/logo-light.png')
              : require('../../assets/images/logo.png')
          }
          style={{width: 32, height: 32, marginLeft: 5}}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          testID="action-btn-touchable"
          activeOpacity={0.5}
          onPress={handelTheme}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 32,
            height: 32,
            marginLeft: 5,
          }}>
          {colorScheme === 'dark' ? (
            <Feather
              name="sun"
              size={24}
              color={useThemeColor({light: '', dark: ''}, 'text')}
            />
          ) : (
            <Feather
              name="moon"
              size={24}
              color={useThemeColor({light: '', dark: ''}, 'text')}
            />
          )}
        </TouchableOpacity>
      ), // No header right component
      headerShadowVisible: false, // Disable header shadow
    });

    // BackHandler setup
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Show confirmation alert on back press
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true; // Prevent default behavior
      },
    );
    // Cleanup event listener on component unmount
    return () => backHandler.remove();
  }, [navigation, colorScheme]);

  const handelTheme = () => {
    Store.dispatch(changeTheme(colorScheme === 'dark' ? 'light' : 'dark'));
  };

  // Render the Screens component with the navigation prop
  return <SearchScreen />;
};

export default Screen;
