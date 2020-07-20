import React, {useState} from 'react';
import {
  Text,
  Appbar,
  Menu,
  Divider
} from 'react-native-paper';

export const Header = (props) => {
  const [visible, setVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Content title={props.shoppingLists[props.index].name} onPress={() => setVisible(true)}/>}>
        {props.shoppingLists.map((item, index) => <Menu.Item title={item.name} key={index} onPress={() => {
            props.setIndex(index);
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
