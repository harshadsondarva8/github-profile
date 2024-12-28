import React, {PropsWithChildren, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {UserDetails as UserDetailTypes} from '@/redux/types/UserDetails.types';
import Requests from '@/requests';
import AppContainer from '../AppContainer';
import {ThemedView} from '../ThemedView';
import StatusMessage from '../StatusMessage';
import {useThemeColor} from '@/hooks/useThemeColor';
import ScreensSkeleton from './user-list-item/skeleton';
import ScrollableContainer from '../ScrollableContainer';
import UserItem from './user-list-item';

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
  const [data, setData] = useState<UserDetailTypes[] | null>(null);
  const [inputVal, setInputVal] = useState('');

  const inputRef = useRef<TextInput>(null);
  const [isUserFetched, setUserFetched] = useState<boolean>(false);

  /**
   * Handles form submission for users search.
   * @param {string} search - Search value for the API.
   */
  const onSubmit = (search: string) => {
    if (search) {
      // Fetch user data from API
      const query = `${search}&type=repositories`;
      Requests.GetUsersList(query)
        .then((res: any) => {
          if (res) {
            const result: UserDetailTypes[] = res?.items;
            setloading(false);
            setRefreshing(false);
            setUserFetched(true);
            setData(result);
          }
        })
        .catch(err => {
          setloading(false);
          setRefreshing(false);
          setData(null);
          setUserFetched(true);
        });
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
    onSubmit(inputVal);
  };

  /**
   * Handles input change in the search bar.
   * @param {string} val - The new input value.
   */
  const handleOnChange = (val: string) => {
    onSubmit(val);
    setInputVal(val);
    setUserFetched(false);
    setloading(true);
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
          placeholderTextColor={useThemeColor(
            {light: '#BCBCBC', dark: '#f4f4f4'},
            'text',
          )}
          style={{
            backgroundColor: useThemeColor(
              {light: '#f4f4f4', dark: '#BCBCBC'},
              'text',
            ),
            color: useThemeColor({light: "", dark: ''}, 'text'),
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
      </ThemedView>

      {/* Loading skeleton */}
      {loading && <ScreensSkeleton />}

      {/* Render user details if fetched */}
      {!loading && isUserFetched && data && (
        <ScrollableContainer
          refresh
          scrollToTop
          contentInsetAdjustmentBehavior="automatic"
          refreshing={refreshing}
          onRefresh={onRefresh}>
          {data?.map((item: any, index: number) => (
            <UserItem data={item} key={index} />
          ))}
        </ScrollableContainer>
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
