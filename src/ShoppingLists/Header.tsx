import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Appbar,
  Menu,
  Divider,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {UniqueShoppingList} from './Types';
import {RenameShoppingList} from './Header/RenameShoppingList';
import {NewShoppingList} from './Header/NewShoppingList';

interface Props {
  userId: string;
  shoppingList: UniqueShoppingList | undefined;
  setShoppingList: any;
  logOut: any;
}

export const Header = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [shoppingLists, setShoppingLists] = useState<UniqueShoppingList[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("ShoppingLists")
      .where("owners", "array-contains", props.userId)
      .onSnapshot(querySnapshot => {
        let newShoppingLists: UniqueShoppingList[] = new Array();
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
          const newShoppingList = {"name": "Groceries", "owners": [props.userId]};
          firestore()
            .collection("ShoppingLists")
            .doc(props.userId)
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
    <>
    <Appbar.Header>
      <Appbar.Content title={props.shoppingList.name} onPress={() => setVisible(true)}/>
      <Appbar.Action icon="dots-vertical" onPress={() => setMoreVisible(true)}/>
    </Appbar.Header>
    <Menu
      visible={moreVisible}
      onDismiss={() => setMoreVisible(false)}
      anchor={{x: Dimensions.get("window").width, y: 0}}>
      <RenameShoppingList setShoppingList={props.setShoppingList} shoppingList={props.shoppingList} hideMenu={() => setMoreVisible(false)}/>
      <NewShoppingList setShoppingList={props.setShoppingList} hideMenu={() => setMoreVisible(false)} userId={props.userId}/>
      <Divider/>
      <Menu.Item title="Log out" onPress={() => props.logOut()} />
    </Menu>
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={{x: 0, y: 0}}>
      {shoppingLists.map((item: UniqueShoppingList, index: number) => <Menu.Item title={item.name} key={index} onPress={() => {
          props.setShoppingList(shoppingLists[index]);
          setVisible(false);
        }
      } />)}
    </Menu>
    </>

  );
};
