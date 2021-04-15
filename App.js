// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from "./user"
import firebase from "firebase"

const Stack = createStackNavigator();
const Auth = createStackNavigator();

function App() {

  var [loading, setLoading] = React.useState(false)
  var [authenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {

  



    setLoading(true)
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userPhone');
        if(userToken)
        {

          User.phone = userToken
          setAuthenticated(true)
       

          console.log("Authenticated!!!!", userToken)
        }else{
          setAuthenticated(false)

          User.phone = null
          console.log(" NOT Authenticated!!!!")
        }

          // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC1qDgXLeA8QQdhzMRiZKaKMMKu9dI4uFQ",
    authDomain: "chatapp-f49ea.firebaseapp.com",
    projectId: "chatapp-f49ea",
    storageBucket: "chatapp-f49ea.appspot.com",
    messagingSenderId: "854936557844",
    appId: "1:854936557844:web:4196988cb3326ad1cf8a01",
    measurementId: "G-B5NQ6D960M"
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
        setLoading(false)
      } catch (e) {
        // Restoring token failed
        console.log({e})
        setAuthenticated(false)
setLoading(false)

      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [User.phone]);
  return (
    <NavigationContainer>

{authenticated ? 
      <Stack.Navigator>

                <Stack.Screen name="Home" component={HomeScreen}  /> 

      </Stack.Navigator>

:
                <Auth.Navigator>
<Auth.Screen name="Login" component={LoginScreen} />
                </Auth.Navigator>

         }
    </NavigationContainer>
  );
}

export default App;