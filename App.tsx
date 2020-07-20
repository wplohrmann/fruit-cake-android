import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-native-paper';
import { LogInScreen } from './src/LogInScreen';
import { ShoppingLists } from './src/ShoppingLists/Screen';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const logOut = () => {
  auth()
    .signOut()
    .then(() => props.setUser(null));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Provider>
        <LogInScreen/>
      </Provider>
    );
  }

  return (
    <Provider>
      <ShoppingLists user={user} logOut={logOut}/>
    </Provider>
  );
}

export default App;
