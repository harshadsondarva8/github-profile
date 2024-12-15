import React, {useEffect} from 'react';
import {BackHandler, Alert, Image, useColorScheme} from 'react-native';
import SearchScreen from '@/components/search-screen';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {ThemedView} from '@/components/ThemedView';

/**
 * Search component for displaying and searching users.
 * @returns {JSX.Element} - Rendered component.
 */

const Screen: React.FC = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // Set navigation options for the screen
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Search Users',
      headerBackTitle: 'Go back',
      headerTitle: () => (
        <ThemedView
          transparent
          alignItems="center"
          justifyContent="center"
          style={{marginLeft: -32}}>
          <ThemedText fontSize={20} lineHeight={30} fontWeight="500">
            Search Users
          </ThemedText>
        </ThemedView>
      ),
      headerLeft: () => (
        <Image
          source={
            colorScheme === 'dark'
              ? require('../assets/images/logo-light.png')
              : require('../assets/images/logo.png')
          }
          style={{width: 32, height: 32, marginLeft: 15}}
          resizeMode="contain"
        />
      ),
      headerRight: () => null, // No header right component
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

  // Render the Screens component with the navigation prop
  return (
    <React.Fragment>
      <SearchScreen />;
      <StatusBar style="auto" />
    </React.Fragment>
  );
};

export default Screen;
