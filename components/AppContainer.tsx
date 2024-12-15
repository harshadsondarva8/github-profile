import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

interface AppContainerProps {
  scrollBar?: boolean;
  scroll?: boolean;
  statusBarColor?: string | null;
  loader?: boolean;
  loaderSize?: number;
  children: ReactNode;
}

/**
 * Functional component for a container that handles keyboard avoiding and status bar configuration.
 * @param {object} props - Component properties.
 * @param {boolean} [props.scrollBar=true] - Controls the visibility of the vertical scroll bar in the ScrollView.
 * @param {boolean} [props.scroll=true] - Enables or disables scrolling behavior.
 * @param {string | null} [props.statusBarColor='#FFFFFF'] - Color of the status bar.
 * @param {boolean} [props.loader=false] - Flag indicating whether a loader is displayed.
 * @param {number} [props.loaderSize] - Size of the loader.
 * @param {ReactNode} props.children - The content to be rendered inside the container.
 * @returns {JSX.Element} - AppContainer component.
 * @example
 * <AppContainer
 *   scrollBar={true}
 *   scroll={true}
 *   statusBarColor="#FFFFFF"
 *   loader={false}
 *   loaderSize={30}
 * >
 *   // Content goes here
 * </AppContainer>
 */
const AppContainer: React.FC<AppContainerProps> = props => {
  const {scrollBar, scroll = true} = props;
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* KeyboardAvoidingView provides automatic keyboard behavior */}
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#FFFFFF'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        {...props}>
        {/* StatusBar for controlling status bar appearance */}
        <StatusBar
          animated={false}
          backgroundColor={'#FFFFFF'}
          hidden={false}
        />

        {scroll ? (
          // ScrollView provides a scrollable container for content
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={scrollBar ?? false}
            contentContainerStyle={{flex: 1}}
            {...props}>
            {props.children}
          </ScrollView>
        ) : (
          // Render content directly if scrolling is disabled
          props.children
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppContainer;
