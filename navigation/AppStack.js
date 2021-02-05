import React from 'react'
import { View , StatusBar } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddPostScreen from '../screens/AddPostScreen'
import DonateBloodScreen from '../screens/DonateBloodScreen'
import {DrawerContent} from './DrawerContent'
import UpdateUsername from "../screens/UpdateUsername";
import UpdatePhoto from '../screens/UpdatePhoto'

const Drawer = createDrawerNavigator();

export default function AppStack({navigation}) {
  return(
    (
      <>
        <StatusBar translucent backgroundColor='transparent' barStyle="dark-content" />
          <Drawer.Navigator drawerContentOptions={{activeBackgroundColor:'#e51433'}} drawerContent={props => <DrawerContent {...props} />} initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Add Request" component={AddPostScreen} />
            <Drawer.Screen name="Donate Blood" component={DonateBloodScreen} />
            <Drawer.Screen name="Edit Profile" component={ProfileScreen} />
            <Drawer.Screen name="Update Username" component={UpdateUsername} />
            <Drawer.Screen name="Update Photo" component={UpdatePhoto} />
          </Drawer.Navigator>
      </>
    )
  )
};