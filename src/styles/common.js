import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FBFFFC',
    // alignItems: 'center',
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
    height: 55,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#99B29E',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: 'white',
    fontFamily: 'AvenirNext-Regular'
  },
  touchableOpacity: {
    height: 55,
    width: 300,
    margin: 10,
    backgroundColor: '#99B29E',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 55,
    fontFamily: 'AvenirNext-Regular'
  },
  inputLabel: {
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'left',
    width: 300,
    marginTop: 10,
    color: '#B2646F'
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
