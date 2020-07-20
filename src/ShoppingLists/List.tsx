import React from 'react';

import {
  FlatList,
} from 'react-native';

import {
  Text
} from 'react-native-paper';

interface ShoppingItem {
    name: string;
    amount: number;
    amount_unit: string;
    mode: "active" | "bought" | "not-in-store" | "removed";
}

function renderItem(item: ShoppingItem) {
    return <Text>{item.name}</Text>;
}

function keyExtractor(item: ShoppingItem, index: number): string {
    return item.name + index;
}

export const List = (props: {items: ShoppingItem[]}) => {
  return (
    <FlatList data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={keyExtractor}/>
  );
};
