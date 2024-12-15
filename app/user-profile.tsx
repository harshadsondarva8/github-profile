import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {StatusBar} from 'expo-status-bar';
import UserProfileScreen from '@/components/user-profile-screen';
import {useNavigation} from 'expo-router';
import {useLocalSearchParams} from 'expo-router/build/hooks';
import {ThemedView} from '@/components/ThemedView';

/**
 * UserProfile component to display user profile information.
 * @returns {JSX.Element} - Rendered component.
 */

const Screen: React.FC = () => {
  const route = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    // Set navigation options for the screen
    navigation.setOptions({
      headerShown: true,
      title: 'UserProfile',
      headerBackTitle: 'Go back',
      headerTitle: () => (
        // Customize the header title with the user's login name
        <ThemedView
          transparent
          alignItems="center"
          justifyContent="center"
          style={{marginLeft: -42}}>
          <ThemedText fontSize={20} lineHeight={30}>
            {route?.login}
          </ThemedText>
        </ThemedView>
      ),
      headerRight: () => null,
    });

    // BackHandler for handling the hardware back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    // Cleanup function to remove the event listener when the component unmounts
    return () => backHandler.remove();
  }, [navigation]);

  // Render the Screens component with navigation and params
  return (
    <React.Fragment>
      <UserProfileScreen />;
      <StatusBar style="auto" />
    </React.Fragment>
  );
};

export default Screen;
