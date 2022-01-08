import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './ButtonComponent.styles';

export default function ButtonComponent({onPress, text}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
