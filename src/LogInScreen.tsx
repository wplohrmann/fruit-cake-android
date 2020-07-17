import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {
  Text,
  TextInput,
  Button,
} from 'react-native';

export const LogInScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        }
      });
  };
  return (
    <>
      <Text>Welcome! Please log in or register to continue</Text>
      <TextInput placeholder={"Email"} value={emailInput} onChangeText={v => setEmailInput(v)}/>
      <TextInput placeholder={"Password"} value={passwordInput} onChangeText={v => setPasswordInput(v)}/>
      <Button title="Log in" onPress={() => createUser(emailInput, passwordInput)}/>
      <Text>{errorMessage}</Text>
    </>
  );
};
