import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import {ThemedText} from './ThemedText';

type propsType = PropsWithChildren<{
  subTitle?: string;
  onPress?: () => void;
  title?: string;
  style?: object;
}>;

/**
 * Functional component for an action button with a title and optional subtitle.
 * @param {object} props - Component properties.
 * @param {string} props.subTitle - Optional subtitle text.
 * @param {() => void} props.onPress - Callback function for the button press event.
 * @param {string} props.title - Title text for the button.
 * @param {object} props.style - Additional styles for the button.
 * @returns {JSX.Element} - Action button component.
 * @example
 * <ActionBtn
 *   subTitle="followers"
 *   onPress={() => handlePress()}
 *   title="123"
 *   style={{ marginTop: 10 }}
 * />
 */
function ActionButton({
  subTitle,
  onPress,
  title,
  style,
}: propsType): React.JSX.Element {
  return (
    <TouchableOpacity
      testID="action-btn-touchable"
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        {flexDirection: 'row', alignItems: 'center', columnGap: 5, ...style},
      ]}>
      <ThemedText fontSize={15} lineHeight={21} fontWeight="600">
        {title}
      </ThemedText>
      <ThemedText fontSize={15} lineHeight={21}>
        {subTitle}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default ActionButton;
