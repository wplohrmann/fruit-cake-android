import React from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  FlatList,
  Alert,
  TouchableHighlight
} from 'react-native';

import {
  Card,
  Avatar,
  Divider,
} from 'react-native-paper';

import { UniqueShoppingItem } from './Types';

function toggleItemComplete(item: UniqueShoppingItem) {
  const newMode = (item.mode === "sought") ? "bought" : "sought";
  firestore()
    .collection("ShoppingItems")
    .doc(item.id)
    .update({"mode": newMode});
}

function renderItem(item: UniqueShoppingItem) {
  let icon: string;
  switch (item.mode) {
    case "sought":
      icon = "checkbox-blank-outline";
      break;
    case "bought":
      icon = "checkbox-marked";
      break;
    case "not-in-store":
      icon = "cart-off";
      break;
    case "removed":
      icon = "crop-square";
      break;
  }
  return (
    <TouchableHighlight onPress={() => toggleItemComplete(item)} onLongPress={() => Alert.alert("Long press!")}>
      <Card>
        <Divider/>
        <Card.Title title={item.name} left={(props: any) => <Avatar.Icon {...props} icon={icon}/>} />
        <Divider/>
      </Card>
    </TouchableHighlight>
  );
}

function keyExtractor(item: UniqueShoppingItem, _: number): string {
    return item.id;
}

interface Props {
  items: UniqueShoppingItem[];
}

export const List = (props: Props) => {
  return (
    <FlatList style={{flex: 1}} data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={keyExtractor}/>
  );
};
