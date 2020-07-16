import React, {useState} from 'react';

import {
  Text,
  TextInput,
  Button,
} from 'react-native';

export const LogInScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Text>Welcome! Please log in or register to continue</Text>
      <TextInput placeholder={"Email"} value={emailInput} onChangeText={v => setEmailInput(v)}/>
      <TextInput placeholder={"Password"} value={passwordInput} onChangeText={v => setPasswordInput(v)}/>
      <Button title="Log in" onPress={() => setLoggedIn("Pressed the button!")}/>
      <Text>{loggedIn ? "You're logged in" : "You're not logged in yet"}</Text>
    </>
  );
};
