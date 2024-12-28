
import React, {useCallback, useEffect, useState} from 'react';
import {useLocalSearchParams} from 'expo-router';
import AppContainer from '../AppContainer';
import UserDetailsSkeleton from './UserDetails/skeleton';
import UserDetails from './UserDetails';
import {useSelector} from 'react-redux';
import {Store} from '@/redux/store';
import Requests from '@/requests';
import {UserDetails as UserDetailTypes} from '@/redux/types/UserDetails.types';
import {usersAddUser, usersUpdateUser} from '@/redux/reducers/Users';

/**
 * JSX Component for rendering user details.
 * @returns {JSX.Element} - Rendered component.
 */

const UserProfileScreen = () => {
  const route: any = useLocalSearchParams();

  // State to manage loading and refreshing states
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Destructure loading, refreshing, and onRefresh from useItem hook
  // const {loading, refreshing, onRefresh} = useItem(params);

  /**
   * Fetch user details based on the login.
   * @param {boolean} refresh - Whether to force a refresh.
   */
  const fetchItem = useCallback(
    async (refresh: boolean) => {
      setLoading(true)
      // Get the users collection from the Redux store
      const users = Store.getState().Users.collection;

      // Check if the user data is already available or needs refreshing
      const oldUsers = Object.keys(users)?.includes(route?.login);

      if (!oldUsers || refresh) {
        try {
          // Fetch user data from the API using the provided login
          let result = await Requests.GetUser(route?.login);

          if (result) {
            // Prepare the user data with additional properties
            const data: UserDetailTypes = {
              ...(result as UserDetailTypes),
              followers_list: [] as never[],
              following_list: [] as never[],
            };

            // Update the loading and refreshing states
            setLoading(false);
            setRefreshing(false);

            // Dispatch actions to update the user data in the Redux store
            Store.dispatch(usersAddUser(data as UserDetailTypes));
            Store.dispatch(usersUpdateUser(data as UserDetailTypes));
          }
        } catch (err) {
          // Handle errors by updating loading and refreshing states
          setLoading(false);
          setRefreshing(false);
          console.error(err);
        }
      } else {
        // If user data is already available, update loading and refreshing states
        setLoading(false);
        setRefreshing(false);
      }
    },
    [route?.login],
  );

  /**
   * Function to handle refreshing of user data.
   */
  const onRefresh = () => {
    setRefreshing(true);
    fetchItem(true);
  };

  // UseEffect to fetch user data when the component mounts
  useEffect(() => {
    fetchItem(false);
  }, [fetchItem]);

  // Get the users collection from the Redux store
  const {collection} = useSelector((state: any) => state.Users);

  return (
    <AppContainer scroll={false}>
      {loading ? (
        // Display skeleton loader while user details are loading
        <UserDetailsSkeleton />
      ) : (
        // Render UserDetails component with user details, navigation, refreshing, and onRefresh
        <UserDetails
          data={collection[route?.login]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </AppContainer>
  );
};

export default UserProfileScreen;
