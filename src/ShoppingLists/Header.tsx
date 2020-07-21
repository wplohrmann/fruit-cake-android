import React, { useState, useEffect } from 'react';
import {
  Text,
  Appbar,
  Menu,
  Divider
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export const Header = (props) => {
  const [visible, setVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shoppingLists, setShoppingLists] = useState(undefined);

  useEffect(() => {
    let newShoppingLists = new Array();
    const subscriber = firestore()
      .collection("ShoppingLists")
      .where("owners", "array-contains", props.user_id)
      .onSnapshot(querySnapshot => querySnapshot.forEach((document => 
        newShoppingLists.push({...document.data, id: document.id}))));
    setShoppingLists(newShoppingLists);
    setLoading(false);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!loading && shoppingLists.length === 0) {
      firestore()
        .collection("ShoppingLists")
        .add({"name": "Groceries", "owners": [props.user_id]})
        .then(() => console.log("Shopping list added"));
    }
    if (props.shoppingList === undefined) {
      props.setShoppingList(shoppingLists[0]);
    }
  }, [shoppingLists]);

  if (loading) {
    return <Appbar.Header><Appbar.Content title="Loading..."/></Appbar.Header>;
  }

  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Content title={props.shoppingList.name} onPress={() => setVisible(true)}/>}>
        {shoppingLists.map((item, index) => <Menu.Item title={item.name} key={index} onPress={() => {
            props.setShoppingList(shoppingLists[index]);
            setVisible(false);
          }
        } />)}
      </Menu>

      <Menu
        visible={moreVisible}
        onDismiss={() => setMoreVisible(false)}
        anchor={<Appbar.Action icon="dots-vertical" onPress={() => setMoreVisible(true)}/>}>
        <Menu.Item title="Log out" onPress={() => props.logOut()} />
      </Menu>

    </Appbar.Header>
  );
};
