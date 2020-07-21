import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import {Header} from './Header';
import {List} from './List';

interface ShoppingList {
  name: string;
  id: string;
  owners: string[];
}

interface ShoppingItem {
    name: string;
    amount: number;
    amount_unit: string;
    mode: "active" | "bought" | "not-in-store" | "removed";
}

export const ShoppingLists = (props) => {
  const [items, setItems] = useState(undefined);
  const [input, setInput] = useState("");
  const [shoppingListloading, setShoppingListLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [shoppingList, setShoppingList] = useState(undefined);

  useEffect(() => {
      if (shoppingList === undefined) { return; }
      var newItems = new Array();
      const subscriber = firestore()
          .collection("ShoppingItems")
          .where("shoppingList", "==", shoppingList.id)
          .onSnapshot((querySnapShot: any) => querySnapShot.forEach((documentSnapshot: any) => newItems.push(item)));
          setItems(newItems);
          setItemsLoading(false);
      return () => subscriber();
  }, [shoppingList]);

  const addItem = () => {
    const newItem: ShoppingItem = {
      name: input,
      amount: 1,
      amount_unit: "",
      mode: "active",
      shoppingList: shoppingList
    };
    firestore()
      .collection("ShoppingItems")
      .add(newItem)
      .then(() => console.log(newItem + " added"));
    setInput("");
  };

  return (
    <>
      <Header shoppingList={shoppingList} setShoppingList={setShoppingList} setShoppingListLoading={setShoppingListLoading} logOut={props.logOut} user_id={props.user.id}/>
      {itemsLoading ? <ActivityIndicator/> : <List items={items} />}
      <TextInput placeholder="Add item" value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={addItem}/>
    </>
  );
};
