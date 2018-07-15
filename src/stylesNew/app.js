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
  errorText: {
    fontSize: 24,
    fontFamily: 'Avenir-Light',
  }
});
