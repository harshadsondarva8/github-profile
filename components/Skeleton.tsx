import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Easing, StyleProp, ViewStyle} from 'react-native';

// Define the type of properties that Skeleton component accepts
interface SkeletonProps {
  type?: 'rectangle' | 'circle';
  width: number | string;
  height: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * JSX Component for rendering a skeleton loading animation.
 * @param {object} props - Properties for configuring the Skeleton component.
 * @param {('rectangle' | 'circle')} [props.type='rectangle'] - Type of skeleton animation (rectangle or circle).
 * @param {(number | string)} props.width - Width of the skeleton animation.
 * @param {number} props.height - Height of the skeleton animation.
 * @param {number} [props.duration=1000] - Duration of the pulse animation cycle.
 * @param {StyleProp<ViewStyle>} [props.style] - Additional styles to be applied to the skeleton.
 * @returns {JSX.Element} - Skeleton component.
 * @example
 * <Skeleton
 *   type="rectangle"
 *   width={200}
 *   height={20}
 *   duration={1000}
 *   style={{marginVertical: 10}}
 * />
 */
const Skeleton: React.FC<SkeletonProps> = ({
  type = 'rectangle',
  width,
  height,
  duration = 1000,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Effect to handle the pulse animation
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    // Start the pulse animation
    pulseAnimation.start();

    // Cleanup: Stop the pulse animation
    return () => {
      pulseAnimation.stop();
    };
  }, [animatedValue, duration]);

  // Interpolate pulse value for opacity
  const pulseInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0.8],
  });

  // Calculate border radius based on the type
  const borderRadius = type === 'circle' ? height / 2 : 4;

  // Combine styles for the skeleton animation
  const skeletonStyles = [
    styles.skeleton,
    {width, height, borderRadius, opacity: pulseInterpolation},
    style,
  ];

  // Render the Skeleton component
  return <Animated.View testID="skeleton" style={skeletonStyles as any} />;
};

// Styles for the Skeleton component
const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
  },
});

export default Skeleton;
