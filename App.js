import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StackNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
