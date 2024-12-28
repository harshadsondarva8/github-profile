import {Stack} from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="user-profile" />
      <Stack.Screen name="followers-following" />
    </Stack>
  );
}
