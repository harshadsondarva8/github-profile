import React, {PropsWithChildren, useRef, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {UserDetails as UserDetailTypes} from '@/redux/types/UserDetails.types';
import {Store} from '@/redux/store';
import Requests from '@/requests';
import {usersAddUser, usersUpdateUser} from '@/redux/reducers/Users';
import UserDetailsSkeleton from '../UserDetails/skeleton';
import UserDetails from '../UserDetails';
import AppContainer from '../AppContainer';
import {ThemedView} from '../ThemedView';
import StatusMessage from '../StatusMessage';
import {FontAwesome} from '@expo/vector-icons';

type SectionProps = PropsWithChildren<{
  search_text?: string | number;
}>;

/**
 * JSX Component for searching and displaying user details.
 * @param {object} props - The properties object.
 * @param {string | number} props.search_text - The text to pre-fill in the search input.
 * @returns {JSX.Element} - Rendered component.
 */
function SearchScreen({}: SectionProps): React.JSX.Element {
  const [loading, setloading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<UserDetailTypes | null>(null);
  const [inputVal, setInputVal] = useState('');

  const inputRef = useRef<TextInput>(null);
  const [isUserFetched, setUserFetched] = useState<boolean>(false);

  /**
   * Handles form submission for user search.
   * @param {boolean} refresh - Whether to force a refresh from the API.
   */
  const onSubmit = (refresh: boolean) => {
    // Check if user is already in the collection
    const users = Store.getState().Users.collection;
    const oldUsers = Object.keys(users)?.includes(inputVal);
    if (inputVal) {
      if (!oldUsers || refresh) {
        // Fetch user data from API
        Requests.GetUser(inputVal)
          .then(res => {
            if (res) {
              const result: UserDetailTypes = {
                ...(res as UserDetailTypes),
                followers_list: [],
                following_list: [],
              };
              setloading(false);
              setRefreshing(false);
              setUserFetched(true);
              setData(result);
              Store.dispatch(usersAddUser(result));
              Store.dispatch(usersUpdateUser(result));
            }
          })
          .catch(err => {
            setloading(false);
            setRefreshing(false);
            setData(null);
            setUserFetched(true);
          });
      } else {
        // Use cached user data
        setloading(false);
        setRefreshing(false);
        setUserFetched(true);
        setData(users[inputVal]);
      }
    } else {
      // Empty input case
      setloading(false);
      setRefreshing(false);
      setData(null);
    }
  };

  // Trigger refresh and fetch user data
  const onRefresh = () => {
    setRefreshing(true);
    onSubmit(true);
  };

  /**
   * Handles input change in the search bar.
   * @param {string} val - The new input value.
   */
  const handleOnChange = (val: string) => {
    setInputVal(val);
    setUserFetched(false);
    setData(null);
  };

  return (
    <AppContainer scroll={false}>
      {/* Search input section */}
      <ThemedView
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{
          padding: 10,
          columnGap: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#F4F4F4',
        }}>
        <TextInput
          ref={inputRef}
          editable
          autoCapitalize="none"
          clearButtonMode="always"
          style={{
            backgroundColor: '#f4f4f4',
            fontSize: 15,
            borderWidth: 0,
            flexShrink: 1,
            flexGrow: 1,
            padding: 10,
            borderRadius: 10,
          }}
          onChangeText={handleOnChange}
          placeholder="Search User"
        />
        {/* Submit button */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={{marginRight: 10}}
          onPress={() => {
            setloading(true);
            onSubmit(false);
          }}>
          <FontAwesome name="search" size={22} color="#3399ff" />
        </TouchableOpacity>
      </ThemedView>

      {/* Loading skeleton */}
      {loading && <UserDetailsSkeleton />}

      {/* Render user details if fetched */}
      {!loading && isUserFetched && data && (
        <UserDetails
          data={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      {/* Display 'Not Found' message if user not found */}
      {!loading && isUserFetched && data === null && inputVal !== '' && (
        <StatusMessage
          title="Not Found"
          description="User could not be found. Please double-check the username and try again."
        />
      )}

      {/* Display initial message if no input */}
      {!loading && !isUserFetched && data === null && (
        <StatusMessage
          title="Find GitHub Users."
          description="Search GitHub user and discover profiles efficiently."
        />
      )}
    </AppContainer>
  );
}

export default SearchScreen;
