import React , { useState , useEffect } from 'react';
import {View, StatusBar,Button} from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

export default function AuthStack({navigation}) {
  
  const [isFirstLaunched,setIsFirstLaunched] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value===null){
        AsyncStorage.setItem('alreadyLaunched','true')
        setIsFirstLaunched(true)
      }else{
        setIsFirstLaunched(false)
      }
    })
  }, [])
  if(isFirstLaunched===null){
    return null;
  }else if(isFirstLaunched===true){
      routeName = 'onboarding'
  }else{
    routeName ='login'
  }
  return(
    (
      <>
        <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
          <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen name='onboarding' component={OnboardingScreen} options={{header:()=> null}} />
            <Stack.Screen name='login' component={LoginScreen} options={{header:()=> null}} />
            <Stack.Screen
                name="signup"
                component={SignupScreen}
                options={{header:()=> null}}
              />
          </Stack.Navigator>
      </>
    )
  )
};
