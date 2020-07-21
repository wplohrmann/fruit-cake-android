import React from 'react';

import {
  FlatList,
} from 'react-native';

import {
  Text
} from 'react-native-paper';


function renderItem(item: ShoppingItem) {
    return <Text>{item.name}</Text>;
}

function keyExtractor(item: ShoppingItem, index: number): string {
    return item.name + index;
}

export const List = (props: {items: ShoppingItem[]}) => {
  return (
    <FlatList style={{flex: 1}} data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={keyExtractor}/>
  );
};
