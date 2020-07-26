import React from 'react';
import {
  Text,
  Card,
  Avatar,
} from 'react-native-paper';

import {
  View,
} from 'react-native';

interface Props {
  user: any;
}
export const Welcome = (props: Props) => {
  return (
    <View>
      <Text>Welcome, {props.user.email}!</Text>
      <Text>{"Let's get started"}</Text>
      <View>
        <View style={{"flexDirection": "row"}}>
          <Card style={{"flex": 1}}>
            <Card.Title title="Explore Recipes" />
            <Card.Content>
              <Avatar.Icon icon="pot-mix" />
            </Card.Content>
          </Card>
          <Card style={{"flex": 1}}>
            <Card.Title title="New Recipe" style={{"justifyContent": "center", "flexDirection": "row"}}/>
            <Card.Content style={{"justifyContent": "center", "flexDirection": "row"}}>
              <Avatar.Icon icon="account-alert" />
            </Card.Content>
          </Card>
        </View>
        <View style={{"flexDirection": "row"}}>
          <Card style={{"flex": 1}}>
            <Card.Title title="Shopping Lists" />
            <Card.Content>
              <Avatar.Icon icon="format-list-checks" />
            </Card.Content>
          </Card>
          <Card style={{"flex": 1}}> 
            <Card.Title title="Friends" />
            <Card.Content>
              <Avatar.Icon icon="account-heart" />
            </Card.Content>
          </Card>
        </View>
      </View>

    </View>
  );
};
