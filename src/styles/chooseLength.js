import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: '#FBFFFC',
    justifyContent: 'space-around',
    paddingBottom: 30
  },
  bubbleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    flex: 3.3
  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 5,
    borderWidth: 2,
    borderColor: 'red'
  },
  bubbleImage: {
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
  },
  wantToSpeakContainer: {
    height: 100
  },
});
