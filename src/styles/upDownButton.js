import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  opacity: {
    height: 40,
    width: 40,
    margin: 10,
  },
  buttonContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B2646F',
  },
  disabledButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFCFCF',
    margin: 10
  }
});