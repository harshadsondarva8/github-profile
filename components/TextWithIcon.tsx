import React, {PropsWithChildren} from 'react';
import {Image} from 'react-native';
import {ThemedText} from './ThemedText';
import {ThemedView} from './ThemedView';

// Define types for FontWeight
type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

// Define properties for the TextWithIcon component
type propsType = PropsWithChildren<{
  imageSource?: null | undefined;
  text?: string | undefined;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  fontWeight?: FontWeight;
  imageSize?: [number, number | undefined];
  icon?: any;
}>;

/**
 * JSX Component for rendering text with an optional icon.
 * @param {object} props - Properties for configuring the TextWithIcon component.
 * @param {null | undefined} [props.imageSource=null] - Source for the optional image.
 * @param {string | undefined} [props.text] - Text content to be displayed.
 * @param {number} [props.fontSize] - Font size for the text.
 * @param {number} [props.lineHeight] - Line height for the text.
 * @param {string} [props.color] - Text color.
 * @param {FontWeight} [props.fontWeight] - Font weight for the text.
 * @param {[number, number | undefined]} [props.imageSize=[16, 16]] - Size of the optional icon image.
 * @returns {JSX.Element} - TextWithIcon component.
 * @example
 * <TextWithIcon
 *   imageSource={require('./icon.png')}
 *   text="Hello, World!"
 *   fontSize={16}
 *   customColor="#333333"
 *   fontWeight="bold"
 *   imageSize={[20, 20]}
 * />
 */
function TextWithIcon({
  imageSource = null,
  text,
  fontSize,
  lineHeight,
  color,
  fontWeight,
  icon,
  imageSize = [16, 16],
}: propsType): React.JSX.Element {
  const imageWidth = imageSize[0];
  const imageHeight = imageSize[1] ? imageSize[1] : imageSize[0];

  // Render the TextWithIcon component with an optional icon
  return (
    <ThemedView
      transparent
      flexDirection="row"
      alignItems="center"
      style={{columnGap: 10}}>
      {icon}
      {imageSource && (
        <Image
          testID="icon"
          source={imageSource}
          style={{width: imageWidth, height: imageHeight}}
          resizeMode="contain"
        />
      )}
      <ThemedText
        fontSize={fontSize}
        lineHeight={lineHeight}
        customColor={color}
        fontWeight={fontWeight}>
        {text}
      </ThemedText>
    </ThemedView>
  );
}

export default TextWithIcon;
