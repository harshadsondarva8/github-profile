import React, {PropsWithChildren} from 'react';
import {Image, Linking, StyleSheet} from 'react-native';

import Avatar from '@/components/Avatar';
import ScrollableContainer from '@/components/ScrollableContainer';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import TextWithIcon from '@/components/TextWithIcon';
import Container from '@/components/Container';
import ActionButton from '@/components/ActionButton';

import FormatNumber from '@/utils/FormatNumber';
import {UserDetails as UserDetailTypes} from '@/redux/types/UserDetails.types';
import {useRouter} from 'expo-router';
import {Octicons} from '@expo/vector-icons';
import {useThemeColor} from '@/hooks/useThemeColor';

type propsType = PropsWithChildren<{
  data?: UserDetailTypes;
  refreshing?: boolean;
  onRefresh?: () => void;
  onPress?: () => void;
}>;

/**
 * JSX Component representing user details.
 * @component
 *
 * @param {propsType} props - The component props.
 * @param {UserDetailTypes} props.data - User details data.
 * @param {boolean} props.refreshing - Indicates if data is refreshing.
 * @param {() => void} props.onRefresh - Callback for refresh action.
 * @param {() => void} props.onPress - Callback for press action.
 *
 * @returns {React.JSX.Element} JSX element representing user details.
 */

function UserDetails({
  data = undefined,
  refreshing = false,
  onRefresh = () => {},
}: propsType): React.JSX.Element {
  const router = useRouter();
  // Extract followers and following counts from user data
  const followers = data?.followers || 0;
  const following = data?.following || 0;

  /**
   * Navigate to Followers or Following screen based on type.
   * @param {string} type - Type of navigation ('followers' or 'following').
   * @returns {void}
   */
  const viewFollowersFollowing = (type: string) => {
    const userparams: any = {type: type, login: data?.login};
    router.push({
      pathname: '/followers-following',
      params: userparams, // Pass the userId as a parameter
    });
  };
  return (
    // Scrollable container with refresh functionality
    <ScrollableContainer
      refresh
      scrollToTop
      contentInsetAdjustmentBehavior="automatic"
      refreshing={refreshing}
      onRefresh={onRefresh}>
      <Container>
        {/* Container for user details */}
        <ThemedView transparent style={styles.container}>
          {/* Avatar and user details */}
          <ThemedView transparent style={styles.avatarContainer}>
            <Avatar
              source={data?.avatar_url || null}
              customSize={5}
              rounded
              title={data?.name || ''}
              size="large"
            />
            <ThemedView transparent>
              <ThemedText fontSize={24} lineHeight={30} fontWeight="600">
                {data?.name}
              </ThemedText>
              <ThemedText fontSize={20} lineHeight={24} fontWeight="300">
                {data?.login}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* User bio, email, location, and company */}
          {data?.bio && (
            <ThemedText fontSize={16} lineHeight={24}>
              {data?.bio}
            </ThemedText>
          )}
          {data?.email && (
            <TextWithIcon
              imageSource={require('../../../assets/images/icon-email.png')}
              imageSize={[16, 16]}
              text={data?.email}
              fontSize={15}
              lineHeight={21}
            />
          )}
          {data?.location && (
            <TextWithIcon
              imageSource={require('../../../assets/images/icon-location.png')}
              imageSize={[16, 16]}
              text={data?.location}
              fontSize={15}
              lineHeight={21}
            />
          )}
          {data?.company && (
            <TextWithIcon
              imageSource={require('../../../assets/images/icon-company.png')}
              imageSize={[16, 16]}
              text={data?.company}
              fontSize={15}
              lineHeight={21}
            />
          )}

          <ThemedView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginLeft: 2,
            }}>
            <Octicons
              name="repo"
              size={16}
              color={useThemeColor({light: '', dark: ''}, 'text')}
              style={{opacity: 0.6, marginRight: 1}}
            />
            <ActionButton
              title={FormatNumber(Number(data?.public_repos ?? 0))}
              subTitle="Repositories"
              onPress={async () => {
                const url = data?.html_url ?? '';
                try {
                  const canOpen = await Linking.canOpenURL(url);
                  if (canOpen) {
                    Linking.openURL(url);
                  }
                } catch (error) {
                  console.log('the error is ', error);
                }
              }}
            />
          </ThemedView>

          {/* Followers and following counts with icons */}
          <ThemedView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}>
            <Image
              source={require('../../../assets/images/icon-users.png')}
              style={{width: 16, height: 16}}
              resizeMode="contain"
            />
            <ActionButton
              title={FormatNumber(followers)}
              subTitle="followers"
              onPress={() =>
                followers > 0 && viewFollowersFollowing('followers')
              }
            />
            <ActionButton
              title={FormatNumber(following)}
              subTitle="following"
              onPress={() =>
                following > 0 && viewFollowersFollowing('following')
              }
            />
          </ThemedView>
        </ThemedView>
      </Container>
    </ScrollableContainer>
  );
}

// Styles for the UserDetails component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 15,
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
});

export default UserDetails;
