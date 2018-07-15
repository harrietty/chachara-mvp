import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  itemContainer: {
    height: 160,
    width: 170,
    borderRadius: 3,
    marginBottom: 20,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A5E8D8'
  },
  squareBoxText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 18,
    padding: 5,
    color: '#475357',
    fontWeight: '600'
  },
  boxBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
    margin: 10,
    width: '90%'
  }
});