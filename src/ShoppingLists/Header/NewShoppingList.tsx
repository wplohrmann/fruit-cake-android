import React, {useState} from 'react';
import {
  TextInput,
  Menu,
  Portal,
  Button,
  Dialog,
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import { ShoppingList } from '../Types';

interface Props {
  setShoppingList: any;
  userId: string;
  hideMenu: any;
}

export const NewShoppingList = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleNew = () => {
    const newShoppingList: ShoppingList = {"name": nameInput, "owners": [props.userId]};
    firestore()
      .collection("ShoppingLists")
      .add(newShoppingList);
    dismiss();
  };

  const dismiss = () => {
    setVisible(false);
    props.hideMenu();
  };
  return (
    <>
      <Menu.Item title="New Shopping List" onPress={() => setVisible(true)} />
      <Portal>
        <Dialog visible={visible} onDismiss={dismiss}>
          <Dialog.Title>New Shopping List</Dialog.Title>
          <TextInput placeholder="Name" value={nameInput} onChangeText={v => setNameInput(v)}/>
          <Dialog.Actions>
            <Button onPress={handleNew}>Ok</Button>
            <Button onPress={dismiss}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
