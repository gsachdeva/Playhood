// ResetPasswordStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  form: {
    gap: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
 input: {
    width: 340,
    marginTop: 15,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontFamily: 'GeezaPro-Bold',
    fontSize: 15,
  },
 button: {
    backgroundColor: '#07bc0c',
    padding: 12,
    borderRadius: 4,
    marginTop: 30,
    width: 340,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default styles;
