import React from 'react';
import {Image, Pressable} from 'react-native';
import { ThemedText } from './ThemedText';

// Define the type of properties that Avatar component accepts
interface AvatarProps {
  source: string | null;
  title: string;
  rounded?: boolean;
  size: 'large' | 'medium' | 'small';
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  customColor?: string | null;
  customSize?: number;
  loading?: boolean;
  containerStyle?: object;
  singleLetter?: boolean;
  fullView?: boolean;
  imageProps?: object;
}

// Size mapping for different avatar sizes
const sizeArray = {
  small: 28,
  medium: 38,
  large: 70,
};

/**
 * JSX Component for rendering an Avatar, either as an image or with a background color and text.
 * @param {object} props - Properties for configuring the Avatar.
 * @param {string | null} props.source - Source URI for the image. Set to null for text-only avatars.
 * @param {string} props.title - Title or text content for the avatar.
 * @param {boolean} [props.rounded=false] - Determines if the avatar should have rounded corners.
 * @param {'large' | 'medium' | 'small'} props.size - Size of the avatar, can be 'large', 'medium', or 'small'.
 * @param {() => void} [props.onPress] - Callback function for press events.
 * @param {string} [props.backgroundColor='rgba(142,142,147,.8)'] - Background color for text-only avatars.
 * @param {string} [props.textColor='#FFFFFF'] - Text color for text-only avatars.
 * @param {string | null} [props.customColor] - Custom background color for the avatar.
 * @param {number} [props.customSize] - Custom size for the avatar.
 * @param {boolean} [props.loading] - Determines if the avatar is in a loading state.
 * @param {object} [props.containerStyle] - Additional styles for the avatar container.
 * @param {boolean} [props.singleLetter] - Displays only the first letter of the title.
 * @param {boolean} [props.fullView] - Enables full view mode, allowing press events even without an onPress callback.
 * @param {object} [props.imageProps] - Additional properties for the Image component when source is provided.
 * @returns {JSX.Element} - Avatar component.
 * @example
 * <Avatar
 *   source="https://example.com/avatar.jpg"
 *   title="John Doe"
 *   size="medium"
 *   onPress={() => console.log('Avatar pressed!')}
 * />
 */
const Avatar: React.FC<AvatarProps> = props => {
  const {
    containerStyle,
    singleLetter,
    fullView,
    imageProps = {},
    source = null,
    title = '',
    rounded = false,
    size = 'medium',
    onPress = () => {},
    backgroundColor = 'rgba(142,142,147,.8)',
  } = props;
  const initialis = title
    ?.match(/\b(\w)/g)
    ?.slice(0, 2)
    ?.join('')
    ?.toUpperCase();

  // Return either a text-only or image-based avatar based on the presence of a source URI
  return source === null ? (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          width: sizeArray[size],
          height: sizeArray[size],
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: rounded ? sizeArray[size] : 0,
        },
        containerStyle && containerStyle,
      ]}
      {...props}>
      <ThemedText
        fontWeight="400"
        style={{alignSelf: 'center'}}
        fontSize={sizeArray[size] / 2.2}
        lineHeight={sizeArray[size] + sizeArray[size] / 10}>
        {singleLetter ? title?.charAt(0)?.toUpperCase() : initialis}
      </ThemedText>
    </Pressable>
  ) : (
    <Pressable
      testID="avatar-pressable"
      {...props}
      disabled={!onPress && !fullView}
      style={[{position: 'relative'}]}>
      <Image
        testID="avatar-image"
        {...imageProps}
        source={{uri: source}}
        style={[
          {
            borderRadius: rounded ? sizeArray[size] : 0,
            width: sizeArray[size],
            height: sizeArray[size],
          },
          containerStyle && containerStyle,
        ]}
      />
    </Pressable>
  );
};

export default Avatar;
