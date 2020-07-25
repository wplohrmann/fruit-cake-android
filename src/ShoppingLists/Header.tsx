import React, { useState, useEffect } from 'react';
import {
  Appbar,
  Menu,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {ShoppingList} from './Types';

interface Props {
  user_id: string;
  shoppingList: ShoppingList | undefined;
  setShoppingList: any;
  logOut: any;
}

export const Header = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("ShoppingLists")
      .where("owners", "array-contains", props.user_id)
      .onSnapshot(querySnapshot => {
        let newShoppingLists: ShoppingList[] = new Array();
        querySnapshot.forEach((document => {
          console.log("Shopping list: " + JSON.stringify(document.data()));
          const newShoppingList = {...document.data(), id: document.id};
          if ("name" in newShoppingList && "owners" in newShoppingList) {
            newShoppingLists.push(newShoppingList);
          } else {
            throw "Invalid format";
          }
        }));
        setShoppingLists(newShoppingLists);
        if (newShoppingLists.length === 0) {
          const newShoppingList: ShoppingList = {"name": "Groceries", "owners": [props.user_id], "id": props.user_id};
          firestore()
            .collection("ShoppingLists")
            .doc(props.user_id)
            .set(newShoppingList)
            .then(() => console.log("Shopping list added"));
        }
        if (props.shoppingList === undefined) {
          props.setShoppingList(newShoppingLists[0]);
        }
      });
    return subscriber;
  }, []);

  if (props.shoppingList === undefined) {
    return <Appbar.Header><Appbar.Content title="Loading..."/></Appbar.Header>;
  }

  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Content title={props.shoppingList.name} onPress={() => setVisible(true)}/>}>
        {shoppingLists.map((item: ShoppingList, index: number) => <Menu.Item title={item.name} key={index} onPress={() => {
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
