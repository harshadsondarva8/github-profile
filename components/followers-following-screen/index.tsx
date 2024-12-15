import React, {useCallback, useEffect, useState} from 'react';
import AppContainer from '../AppContainer';
import {useSelector} from 'react-redux';
import {RootState, Store} from '@/redux/store';
import {useLocalSearchParams} from 'expo-router';
import UserItem from './user-list-item';
import ScreensSkeleton from './user-list-item/skeleton';
import {usersSetFollowers, usersSetFollowing} from '@/redux/reducers/Users';
import Requests from '@/requests';
import ScrollableContainer from '../ScrollableContainer';

/**
 * FollowersFollowing component to display followers or following information.
 * @returns {JSX.Element} - Rendered component.
 */

const FollowersFollowingScreen = () => {
  const params: any = useLocalSearchParams();
  const {collection} = useSelector((state: RootState) => state.Users);

  const [loading, setloading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Function to fetch followers or following data
  const fetchItem = useCallback(
    async (refresh: boolean) => {
      const users = Store.getState().Users.collection;
      const followers_list = users[params?.login]?.followers_list;
      const following_list = users[params?.login]?.following_list;
      const oldFollowers = followers_list?.length !== 0;
      const oldFollowing = following_list?.length !== 0;

      try {
        // Fetch followers data if not present or manual refresh requested
        if (!oldFollowers || refresh) {
          if (params?.type === 'followers') {
            let result = await Requests.GetFollowers(params?.login);
            result &&
              Store.dispatch(
                usersSetFollowers({login: params?.login, collection: result}),
              );
          }
        }

        // Fetch following data if not present or manual refresh requested
        if (!oldFollowing || refresh) {
          if (params?.type === 'following') {
            let result = await Requests.GetFollowing(params?.login);
            result &&
              Store.dispatch(
                usersSetFollowing({login: params?.login, collection: result}),
              );
          }
        }

        // Set loading and refreshing states to false after successful fetch
        setloading(false);
        setRefreshing(false);
      } catch (err) {
        // Handle errors by setting loading and refreshing states to false and logging the error
        setloading(false);
        setRefreshing(false);
        console.error(err);
      }
    },
    [params?.type, params?.login],
  );

  // Function to manually trigger a refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchItem(true);
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchItem(false);
  }, [fetchItem]);

  // Determine the list to be displayed based on the type parameter
  let list: any = [];
  if (params?.type === 'followers') {
    list = collection[params?.login]?.followers_list;
  } else {
    list = collection[params?.login]?.following_list;
  }

  return (
    <AppContainer scroll={false}>
      {loading ? (
        // Display skeleton while data is loading
        <ScreensSkeleton />
      ) : (
        // Render a FlatList with the fetched user data
        <ScrollableContainer
          refresh
          scrollToTop
          contentInsetAdjustmentBehavior="automatic"
          refreshing={refreshing}
          onRefresh={onRefresh}>
          {list?.map((item: any, index: number) => (
            <UserItem data={item} key={index} />
          ))}
        </ScrollableContainer>
      )}
    </AppContainer>
  );
};

export default FollowersFollowingScreen;
