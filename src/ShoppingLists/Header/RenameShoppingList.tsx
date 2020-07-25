import React, {useState} from 'react';
import {
  TextInput,
  Menu,
  Portal,
  Button,
  Dialog,
} from 'react-native-paper';

import { ShoppingList } from '../Types';

interface Props {
  shoppingList: ShoppingList;
  hideMenu: any;
}

export const RenameShoppingList = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  
  const handleRename = () => {
    console.log("Shopping list renamed to " + JSON.stringify(renameInput));
    dismiss();
  };

  const dismiss = () => {
    setVisible(false);
    props.hideMenu();
  };

  return (
    <>
      <Menu.Item title="Rename Shopping List" onPress={() => {
        setVisible(true);
      }}/>
      <Portal>
        <Dialog visible={visible} onDismiss={dismiss}>
          <Dialog.Title>Rename {props.shoppingList.name}</Dialog.Title>
          <TextInput placeholder="New name" value={renameInput} onChangeText={v => setRenameInput(v)}/>
          <Dialog.Actions>
            <Button onPress={handleRename}>Rename</Button>
            <Button onPress={dismiss}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
