import React from 'react';
import {ViewStyle} from 'react-native';
import {ThemedView} from './ThemedView';

// Define the type of properties that Container component accepts
interface CustomViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * JSX Component for a custom container view with predefined styling.
 * @param {object} props - Properties for configuring the Container.
 * @param {React.ReactNode} props.children - Child components to be rendered within the container.
 * @param {ViewStyle} [props.style] - Additional styles to be applied to the container.
 * @returns {JSX.Element} - Container component.
 * @example
 * <Container style={{margin: 10}}>
 *   <Text>This is a custom container.</Text>
 * </Container>
 */
const Container: React.FC<CustomViewProps> = props => {
  return (
    <ThemedView
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
      }}>
      {props.children}
    </ThemedView>
  );
};

export default Container;
