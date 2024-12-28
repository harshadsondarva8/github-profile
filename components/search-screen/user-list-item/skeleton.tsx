import React from 'react';
import {StyleSheet} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Skeleton from '@/components/Skeleton';
import ScrollableContainer from '@/components/ScrollableContainer';

/**
 * ScreensSkeleton component to display a skeleton loading state for user items.
 * @returns {React.JSX.Element} - JSX element representing the skeleton loading state.
 */
function ScreensSkeleton(): React.JSX.Element {
  return (
    // ScrollableContainer to enable scrolling
    <ScrollableContainer
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic">
      {/* Create 10 skeleton items in a loop */}
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <ThemedView transparent key={index}>
              <ThemedView style={styles.container}>
                {/* Skeleton for user avatar */}
                <Skeleton type="circle" width={38} height={38} />

                {/* Container for user details with skeleton text */}
                <ThemedView style={styles.userDetails}>
                  <Skeleton width={'90%'} height={20} />
                </ThemedView>
              </ThemedView>

              {/* Separator line between skeleton items */}
              <Skeleton width={'100%'} height={1} style={{marginTop: 10}} />
            </ThemedView>
          );
        })}
    </ScrollableContainer>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 15,
    justifyContent: 'flex-start',
  },
  userDetails: {
    flex: 1,
  },
});

export default ScreensSkeleton;
