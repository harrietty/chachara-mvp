import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1
  },
  keyboardView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 230,
    margin: 20
  },
  headerText: {
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 45,
    color: '#242312'
  }
});
