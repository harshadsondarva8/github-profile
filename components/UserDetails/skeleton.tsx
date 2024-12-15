import React from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollableContainer from '../ScrollableContainer';
import Container from '../Container';
import Skeleton from '../Skeleton';

function ScreensSkeleton(): React.JSX.Element {
  return (
    <ScrollableContainer contentInsetAdjustmentBehavior="automatic">
      <Container>
        <View style={styles.container}>
          <Skeleton type="circle" width={70} height={70} />
          <View style={styles.userDetails}>
            <Skeleton width={'60%'} height={24} />
            <Skeleton width={'40%'} height={20} />
          </View>
        </View>
        <Skeleton width={'100%'} height={14} style={{marginTop: 15}} />
        <Skeleton width={'90%'} height={14} style={{marginTop: 5}} />
        <View style={[styles.iconText, {marginTop: 20}]}>
          <Skeleton type="circle" width={16} height={16} />
          <Skeleton width={'50%'} height={14} />
        </View>
        <View style={styles.iconText}>
          <Skeleton type="circle" width={16} height={16} />
          <Skeleton width={'50%'} height={14} />
        </View>
        <View style={styles.iconText}>
          <Skeleton type="circle" width={16} height={16} />
          <Skeleton width={'50%'} height={14} />
        </View>
      </Container>
    </ScrollableContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 15,
    justifyContent: 'flex-start',
  },
  userDetails: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 5,
  },
  iconText: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 10,
  },
});

export default ScreensSkeleton;
