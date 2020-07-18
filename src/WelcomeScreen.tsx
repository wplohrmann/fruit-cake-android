import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';
import {ShoppingList } from './ShoppingList';

import auth from '@react-native-firebase/auth';

interface Props {
    setUser: any;
    user: any;
}

export const WelcomeScreen: React.FC<Props> = (props) => {
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState(new Array());
  const logOut = () => {
  auth()
    .signOut()
    .then(() => props.setUser(null));
  }
  return (
    <View>
      <Text>Hello, {props.user.email}</Text>
      <TextInput placeholder={"Item"} value={itemInput} onChangeText={setItemInput} />
      <Button title="Add item" onPress={() => {
          if (itemInput === "") { return; }
          const newItem = {"name": itemInput, "amount": 1, "amount_unit": "", "mode": "active"};
          setItems(new Array(...items, newItem));
          setItemInput("");
      }} />
      <ShoppingList items={items}/>
      <Button title="Log out" onPress={logOut}/>
    </View>
  );
};
