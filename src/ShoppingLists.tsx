import React, { useState, useEffect } from 'react';
import {
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';

import {
  View
} from 'react-native';

import { ShoppingItem, UniqueShoppingList, UniqueShoppingItem } from './ShoppingLists/Types';

import firestore from '@react-native-firebase/firestore';

import {Header} from './ShoppingLists/Header';
import {List} from './ShoppingLists/List';

interface Props {
  user: any;
  logOut: any;
}

export const ShoppingLists = (props: Props) => {
  const [items, setItems] = useState<UniqueShoppingItem[]>([]);
  const [input, setInput] = useState("");
  const [shoppingList, setShoppingList] = useState<UniqueShoppingList | undefined >(undefined);

  useEffect(() => {
      if (shoppingList === undefined) { return; }
      const subscriber = firestore()
          .collection("ShoppingItems")
          .where("shoppingList", "==", shoppingList.id)
          .onSnapshot((querySnapShot: any) => {
            var newItems: UniqueShoppingItem[] = new Array();
            querySnapShot.forEach((documentSnapshot: any) => {
              const newItem = documentSnapshot.data();
              if ("name" in newItem && "amount" in newItem && "amount_unit" in newItem && "shoppingList" in newItem && "mode" in newItem) {
                newItems.push({...newItem, id: documentSnapshot.id});
              }
            });
            setItems(newItems);
          });
      return () => subscriber();
  }, [shoppingList]);

  const addItem = () => {
    if (shoppingList === undefined) { return; }
    const newItem: ShoppingItem = {
      name: input,
      amount: 1,
      amount_unit: "",
      active: true,
      mode: "sought",
      shoppingList: shoppingList.id
    };
    firestore()
      .collection("ShoppingItems")
      .add(newItem)
      .then(() => console.log(JSON.stringify(newItem) + " added"));
    setInput("");
  };

  return (
    <>
      <Header shoppingList={shoppingList} setShoppingList={setShoppingList} logOut={props.logOut} user_id={props.user.uid}/>
      {(shoppingList === undefined) ? <View style={{"flex": 1, "justifyContent": "center"}}><ActivityIndicator/></View> : <List items={items} />}
      {(shoppingList === undefined) ? null : <TextInput placeholder="Add item" value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={addItem}/>}
    </>
  );
};
