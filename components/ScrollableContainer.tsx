import {useThemeColor} from '@/hooks/useThemeColor';
import {Ionicons} from '@expo/vector-icons';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  TouchableOpacity,
} from 'react-native';

// Define the type of properties that ScrollableContainer component accepts
interface ScrollableContainerProps extends ScrollViewProps {
  horizontal?: boolean;
  scrollBar?: boolean;
  wrapperStyle?: object;
  refresh?: boolean;
  refreshing?: boolean;
  scrollLoader?: boolean;
  onRefresh?: () => void;
  handelScroll?: (event: object, isEndReached: boolean) => void;
  onScroll?: ScrollViewProps['onScroll'];
  scrollref?: React.RefObject<ScrollView>;
  scrollToTop?: boolean;
  scrollToTopPostion?: number;
}

// Define the type of properties that ScrollToTopBtn component accepts
interface ScrollToTopBtnProps {
  wrapperStyle?: object;
  containerStyle?: object | undefined;
  scrollRef?: React.RefObject<ScrollView>;
}

const ScrollToTopBtn: React.FC<ScrollToTopBtnProps> = ({
  scrollRef,
  containerStyle = {},
  wrapperStyle = {},
}) => {
  let opacity = new Animated.Value(0);

  const startAnimation = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 30,
          right: 30,
          zIndex: 10011,
          alignItems: 'center',
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-70, 0],
              }),
            },
          ],
          borderRadius: 50,
          elevation: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 8],
          }),
          shadowColor: useThemeColor({light: '', dark: ''}, 'text'),
          shadowOffset: {width: 1, height: 5},
          shadowOpacity: 0.5,
          shadowRadius: 4,
        },
        containerStyle,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            backgroundColor: useThemeColor({light: '', dark: ''}, 'background'),
            borderRadius: 50,
            borderColor: useThemeColor({light: '', dark: ''}, 'background'),
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            height: 45,
            width: 45,
          },
          wrapperStyle,
        ]}
        onPress={() => {
          scrollRef?.current?.scrollTo({y: 0, animated: true});
        }}>
        <Ionicons
          name="chevron-up-outline"
          size={24}
          color={useThemeColor({light: '', dark: ''}, 'text')}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * JSX Component for a scrollable container with customizable features.
 * @param {object} props - Properties for configuring the ScrollableContainer.
 * @param {boolean} [props.horizontal] - Determines if the scroll should be horizontal.
 * @param {boolean} [props.scrollBar] - Determines if the scroll bar should be visible.
 * @param {object} [props.wrapperStyle] - Additional styles to be applied to the container.
 * @param {boolean} [props.refresh] - Enables pull-to-refresh functionality.
 * @param {boolean} [props.refreshing] - Indicates whether the pull-to-refresh is in progress.
 * @param {boolean} [props.scrollLoader] - Indicates whether to show a loader during scrolling.
 * @param {() => void} [props.onRefresh] - Callback function when pull-to-refresh is triggered.
 * @param {(event: object, isEndReached: boolean) => void} [props.handelScroll] - Callback for handling scroll events.
 * @param {ScrollViewProps['onScroll']} [props.onScroll] - Callback for handling scroll events.
 * @param {React.RefObject<ScrollView>} [props.scrollref] - Reference to the ScrollView component.
 * @param {boolean} [props.scrollToTop] - Indicates whether to scroll to the top.
 * @param {number} [props.scrollToTopPostion] - Position to scroll to when scrollToTop is true.
 * @returns {JSX.Element} - ScrollableContainer component.
 * @example
 * <ScrollableContainer
 *   backgroundColor="#F5F5F5"
 *   horizontal={false}
 *   scrollBar={true}
 *   refresh={true}
 *   refreshing={false}
 *   onRefresh={() => console.log('Refreshing...')}
 *   handelScroll={(event, isEndReached) => {
 *     console.log('Scrolling...', isEndReached);
 *   }}
 *   onScroll={(event) => console.log('Scrolling...', event)}
 *   scrollref={scrollRef}
 *   scrollToTop={true}
 *   scrollToTopPostion={0}
 * >
 *  /* Add your scrollable content here
 * </ScrollableContainer>
 */
const ScrollableContainer: React.FC<ScrollableContainerProps> = props => {
  const {
    horizontal,
    scrollBar,
    wrapperStyle,
    refresh = false,
    refreshing = false,
    scrollLoader = false,
    onRefresh = () => {},
    handelScroll = () => {},
    onScroll,
    scrollref,
    scrollToTop,
    scrollToTopPostion,
    ...restProps
  } = props;

  // Create a ref for the ScrollView component
  const scrollRef = scrollref || useRef<ScrollView>(null);

  // State to track whether to show the scroll to top button
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false);

  // Callback function to handle scroll events
  const handelOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    if (layoutMeasurement) {
      const isEndReached =
        layoutMeasurement.height + contentOffset.y + 2 >= contentSize.height;

      contentOffset.y > 100
        ? setScrollToTopBtn(true)
        : setScrollToTopBtn(false);
      handelScroll(event, isEndReached);
    }
  };

  // Effect to scroll to the top when scrollToTop and scrollToTopPostion are provided
  useEffect(() => {
    if (scrollToTop && scrollToTopPostion && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: scrollToTopPostion,
        animated: true,
      });
    }
  }, [scrollToTop, scrollToTopPostion]);

  let bgColor = useThemeColor({light: '', dark: ''}, 'background');

  // Render the ScrollableContainer component
  return (
    <React.Fragment>
      {scrollToTop && scrollToTopBtn && (
        <ScrollToTopBtn
          scrollRef={scrollRef}
          // containerStyle={scrollToTopPostion}
        />
      )}
      <Animated.ScrollView
        testID="scroll-view"
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        horizontal={horizontal}
        showsHorizontalScrollIndicator={horizontal && scrollBar}
        showsVerticalScrollIndicator={!horizontal && scrollBar}
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
            paddingVertical: 15,
          },
          wrapperStyle && wrapperStyle,
        ]}
        contentContainerStyle={{paddingBottom: 15}}
        refreshControl={
          refresh ? (
            <RefreshControl
              progressBackgroundColor={useThemeColor(
                {light: '', dark: ''},
                'background',
              )}
              colors={[useThemeColor({light: '', dark: ''}, 'text')]}
              tintColor={useThemeColor({light: '', dark: ''}, 'text')}
              titleColor={useThemeColor({light: '', dark: ''}, 'text')}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        onScroll={onScroll ? onScroll : handelOnScroll}
        // contentContainerStyle={{flex: 1}}
        {...restProps}>
        {props.children}
      </Animated.ScrollView>
    </React.Fragment>
  );
};

export default ScrollableContainer;
