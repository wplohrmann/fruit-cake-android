import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {
  TextInput,
  Button,
  Text
} from 'react-native-paper';

export const LogInScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
          setErrorMessage(error.code);
      });
  };

  const logIn = (email: string, password: string) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {setErrorMessage(error.code);});
  };
  return (
    <>
      <Text>Welcome! Please log in or register to continue</Text>
      <TextInput placeholder={"Email"} value={emailInput} onChangeText={v => setEmailInput(v)}/>
      <TextInput placeholder={"Password"} value={passwordInput} onChangeText={v => setPasswordInput(v)}/>
      <Button onPress={() => logIn(emailInput, passwordInput)}>Log in</Button>
      <Button onPress={() => createUser(emailInput, passwordInput)}>Register</Button>
      <Text>{errorMessage}</Text>
    </>
  );
};
