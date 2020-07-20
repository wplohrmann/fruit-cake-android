import React, { useState, useEffect } from 'react';
import {
  Text,
} from 'react-native-paper';

import {Header} from './Header';
import {List} from './List';

const shoppingLists = [{"name": "Groceries", "id": "haha"}, {"name": "Electronics", "id": "hoho"}];
const allItems = {
  "haha": [{"name": "Milk", "amount": 1, "amount_unit": "", "mode": "active"},
           {"name": "Juice", "amount": 1, "amount_unit": "", "mode": "active"}],
  "hoho": [{"name": "Battery", "amount": 1, "amount_unit": "", "mode": "active"},
           {"name": "Lamp", "amount": 1, "amount_unit": "", "mode": "active"}]}

export const ShoppingLists = (props) => {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(undefined);

  useEffect(() => {
    setItems(allItems[shoppingLists[index].id]);
  }, [index]);

  return (
    <>
      <Header shoppingLists={shoppingLists} index={index} setIndex={setIndex} logOut={props.logOut}/>
      <List items={items} />
    </>
  );
};
