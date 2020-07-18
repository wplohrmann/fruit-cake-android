import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  View,
} from 'react-native';
import {ShoppingList } from './ShoppingList';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface Props {
    setUser: any;
    user: any;
}

export const WelcomeScreen: React.FC<Props> = (props) => {
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState(new Array());
  const [loading, setLoading] = useState(true);

  const logOut = () => {
  auth()
    .signOut()
    .then(() => props.setUser(null));
  }
  useEffect(() => {
      var newItems = new Array();
      const subscriber = firestore()
          .collection("ShoppingLists")
          .where("owners", "array-contains", props.user.uid)
          .onSnapshot((querySnapShot: any) => {
              querySnapShot.forEach((documentSnapshot: any) => {
                  documentSnapshot.data().items.forEach((item: ShoppingItem) => {
                  newItems.push(item);
                  });
              });
              setItems(newItems);
              setLoading(false);
          });
      return () => subscriber;
  }, []);

  if (loading) { return <ActivityIndicator/>; }
  return (
    <View>
      <Text>Hello, {props.user.email}</Text>
      <TextInput placeholder={"Item"} value={itemInput} onChangeText={setItemInput} />
      <Button title="Add item" onPress={() => {
          setItemInput("");
          return;
      }} />
      <ShoppingList items={items}/>
      <Button title="Log out" onPress={logOut}/>
    </View>
  );
};
