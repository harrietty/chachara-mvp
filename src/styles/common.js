import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FBFFFC',
    justifyContent: 'space-around',
    flex: 1
  },
  headerArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inAppHeaderArea: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mainArea: {
    flex: 5,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 40,
    color: '#B2646F'
  },
  error: {
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 18,
    color: 'red',
  },
  input: {
    height: 50,
    fontSize: 20,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: 'white',
    opacity: 0.9,
    fontFamily: 'AvenirNext-Regular'
  },
  touchableOpacity: {
    height: 50,
    width: 250,
    margin: 10,
    backgroundColor: '#AFDBDB',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 30,
    color: '#434545',
    textAlign: 'center',
    lineHeight: 50,
    fontFamily: 'Avenir-Light'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FBFFFC',
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
  }
});
