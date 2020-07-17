import React from 'react';
import {
  Text,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export const WelcomeScreen = (props) => {
  const logOut = () => {
  auth()
    .signOut()
    .then(() => props.setUser(null));
  }
  return (
    <>
      <Text>Hello, {props.user.email}</Text>
      <Button title="Log out" onPress={logOut}/>
    </>
  );
};
