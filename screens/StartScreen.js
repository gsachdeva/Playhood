import { View, Text, StyleSheet, Image, StatusBar,TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Image
        //   source={require('./assets/playhood_logo.png')} // Place logo in assets
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Playhood</Text>
      <Text style={styles.tagline}>Play. Connect. Thrive.</Text>
      <Text style={styles.tagline} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FDC913',
  },
  tagline: {
    fontSize: 16,
    color: '#0D0D0D',
    marginTop: 10,
    letterSpacing: 1,
  },
   buttonText: {
    color: "FDC913",
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
