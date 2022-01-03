import React from 'react';
import {TextInput} from 'react-native';
import styles from './TextInputComponent.styles';

export default function TextInputComponent({onChangeText, value}) {
  return (
    <TextInput style={styles.input} onChangeText={onChangeText} value={value} />
  );
}
