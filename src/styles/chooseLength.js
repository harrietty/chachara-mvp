import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bubbleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    flex: 3.5
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5
  },
  bubbleImage: {
    // resizeMode: 'stretch',
  },
  bubbleTextContainer: {
    height: 270,
    width: 300,
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
  },
  bubbleText: {
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 28,
    color: '#B2646F',
    textAlign: 'center',
  }
});
