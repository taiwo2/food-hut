import { Ionicons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
    </Stack>
  );
}
