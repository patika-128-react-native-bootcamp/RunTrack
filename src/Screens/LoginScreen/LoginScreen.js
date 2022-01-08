import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TextInputComponent from '../../components/TextInput';
import ButtonComponent from '../../components/Button';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handleLogin() {
    auth().signInWithEmailAndPassword(username, password);
  }
  function handleRegister() {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View>
      <Text>Username</Text>
      <TextInputComponent value={username} onChangeText={setUsername} />
      <Text>Password</Text>
      <TextInputComponent value={password} onChangeText={setPassword} />
      <ButtonComponent onPress={handleLogin} text="Login" />
      <ButtonComponent onPress={handleRegister} text="Register" />
    </View>
  );
}
