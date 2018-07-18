import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1
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
    height: '100%'
  },
  header: {
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 45,
    color: '#242312'
  },
  text: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
  },
  whiteText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    color: 'white',
  },
  errorText: {
    fontSize: 24,
    fontFamily: 'Avenir-Light',
  },
  largeButtonContainer: {
    height: 70,
    width: 250,
    margin: 10,
    backgroundColor: '#FFA600',
    borderRadius: 25,
  },
  largeButtonText: {
    fontSize: 40,
    color: '#434545',
    textAlign: 'center',
    lineHeight: 70,
    fontFamily: 'Avenir-Light' 
  }
});
