import React from 'react';

import {
  FlatList,
  Alert,
} from 'react-native';

import {
  Card,
  Avatar,
  Divider,
} from 'react-native-paper';

import { UniqueShoppingItem } from './Types';


function renderItem(item: UniqueShoppingItem) {
    return (
      <Card onPress={() => Alert.alert("Done!")} onLongPress={() => Alert.alert("Long press!")} >
        <Divider/>
        <Card.Title title={item.name} left={(props: any) => <Avatar.Icon {...props} icon="folder"/>} />
        <Divider/>
      </Card>
    );
}

function keyExtractor(item: UniqueShoppingItem, _: number): string {
    return item.id;
}

export const List = (props: {items: UniqueShoppingItem[]}) => {
  return (
    <FlatList style={{flex: 1}} data={props.items} renderItem={obj => renderItem(obj.item)} keyExtractor={keyExtractor}/>
  );
};
