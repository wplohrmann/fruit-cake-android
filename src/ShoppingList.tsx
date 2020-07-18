import React, {useState} from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';

interface ShoppingItem {
    name: string;
    amount: number;
    amount_unit: string;
    mode: "active" | "bought" | "not-in-store" | "removed";
}

function renderItem(item: ShoppingItem) {
    return <Text>{item.name}</Text>;
}


export const ShoppingList = (props) => {
  return (
  <FlatList data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={(item, index) => {item + index}}/>
  );
};
