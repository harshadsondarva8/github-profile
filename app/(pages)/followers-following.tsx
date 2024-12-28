import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {ThemedView} from '@/components/ThemedView';
import FollowersFollowingScreen from '@/components/followers-following-screen';

/**
 * Search component for displaying and searching users.
 * @returns {JSX.Element} - Rendered component.
 */

const Screen: React.FC = () => {
  const route = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    // Set navigation options for the screen
    navigation.setOptions({
      headerShown: true,
      title: 'FollowersFollowing',
      headerBackTitle: 'Go back',
      headerTitle: () => (
        <ThemedView
          transparent
          alignItems="center"
          justifyContent="center"
          style={{marginLeft: -42}}>
          <ThemedText
            fontSize={20}
            lineHeight={30}
            style={{textTransform: 'capitalize'}}>
            {route?.type}
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

  // Render the Screens component with the navigation prop
  return <FollowersFollowingScreen />;
};

export default Screen;
