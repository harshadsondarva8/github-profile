import React, {PropsWithChildren} from 'react';
import {ThemedText} from './ThemedText';
import {ThemedView} from './ThemedView';

// Define the type of properties that StatusMessage component accepts
type propsType = PropsWithChildren<{
  title?: string | undefined;
  description: string | undefined;
}>;

/**
 * JSX Component for rendering a status message with an optional title and description.
 * @param {object} props - Properties for configuring the StatusMessage component.
 * @param {string | undefined} [props.title] - Optional title for the status message.
 * @param {string | undefined} props.description - Description for the status message.
 * @returns {JSX.Element} - StatusMessage component.
 * @example
 * <StatusMessage title="Success" description="Operation completed successfully." />
 */
function StatusMessage({
  title = undefined,
  description = undefined,
}: propsType): React.JSX.Element {
  return (
    <ThemedView
      alignItems="center"
      justifyContent="center"
      style={{flex: 1, paddingHorizontal: 30}}>
      {title && (
        <ThemedText
          fontSize={24}
          lineHeight={30}
          fontWeight="600"
          align="center">
          {title}
        </ThemedText>
      )}
      <ThemedText fontSize={18} lineHeight={24} fontWeight="300" align="center">
        {description}
      </ThemedText>
    </ThemedView>
  );
}

export default StatusMessage;
