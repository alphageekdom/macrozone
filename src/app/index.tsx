import HomeHeader from '@/components/HomeHeader';
import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
    </View>
  );
}
