// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from "./user"


const Stack = createStackNavigator();

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
          setAuthenticated(true)
          User.phone = userToken

          console.log("Authenticated!!!!")
        }else{
          setAuthenticated(false)
          console.log(" NOT Authenticated!!!!")
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
      <Stack.Navigator>
        {authenticated ? 
                <Stack.Screen name="Home" component={HomeScreen} /> :
                
        <Stack.Screen name="Login" component={LoginScreen} />
                 }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;