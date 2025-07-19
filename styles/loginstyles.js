import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
    marginTop: 25,
    textAlign:'start'
  },
   screenlabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
    marginTop: 25,
    textAlign:'center'
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
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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
  },
});
