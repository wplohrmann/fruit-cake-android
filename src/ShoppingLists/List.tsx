import React from 'react';

import {
  FlatList,
} from 'react-native';

import {
  Text
} from 'react-native-paper';

import { UniqueShoppingItem } from './Types';


function renderItem(item: UniqueShoppingItem) {
    return <Text>{item.name}</Text>;
}

function keyExtractor(item: UniqueShoppingItem, _: number): string {
    return item.id;
}

export const List = (props: {items: UniqueShoppingItem[]}) => {
  return (
    <FlatList style={{flex: 1}} data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={keyExtractor}/>
  );
};
