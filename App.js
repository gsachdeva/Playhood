import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { AuthProvider } from './AuthContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
