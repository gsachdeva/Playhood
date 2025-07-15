import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { AuthProvider } from './AuthContext';
import { store } from './components/store';
import { Provider } from 'react-redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
  <Provider store={store}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
