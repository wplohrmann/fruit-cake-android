import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { LogInScreen } from './src/LogInScreen';
import { WelcomeScreen } from './src/WelcomeScreen';
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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <LogInScreen/>
      </View>
    );
  }

  return (
    <View>
      <WelcomeScreen user={user} setUser={setUser}/>
    </View>
  );
}

export default App;
