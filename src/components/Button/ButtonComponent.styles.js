import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  button: {
    height: 50,
    width: Dimensions.get('window').width - 40,
    margin: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
});