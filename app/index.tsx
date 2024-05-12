
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/nativewindui/Text';

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ title: 'index' }} />
      <View className='flex-1 items-center justify-center p-5 bg-background'>
        <Text variant='largeTitle'>This screen doesn'tgdgfjjfj existjhuigiu.</Text>

        <Link href='/' className='m-4 py-4'>
          <Text>Go to home screen!jjjjoooffgdj</Text>
        </Link>
      </View>
    </>
  );
}