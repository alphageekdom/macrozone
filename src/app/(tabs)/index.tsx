import HomeHeader from '@/components/HomeHeader';
import MacroGrid from '@/components/MacroGrid';
import RecentMeals from '@/components/RecentMeals';
import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals />
    </View>
  );
}
