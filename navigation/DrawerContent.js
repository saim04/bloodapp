import React,{useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './AuthProvider'

export function DrawerContent (props){
    const { logout , user } = useContext(AuthContext);
    console.log(user)
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: user.photoURL
                                }}
                                size={50}
                            />
                            
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                {user.displayName === null ?<Title style={styles.title}>No Username</Title>:<Title style={styles.title}>{user.displayName}</Title>}
                                {user.displayName === null || user.displayName === null ?<Caption style={styles.caption}>Edit profile to have{'\n'}username or profile photo.</Caption>:null}
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome5
                                style={{marginLeft:2}}
                                name="user-edit" 
                                color={color}
                                size={20}
                                />
                            )}
                            activeTintColor='#000'
                            label="Edit Profile"
                            onPress={() => {props.navigation.navigate('Edit Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            activeTintColor='#000'
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons
                                name="ios-add-sharp" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Add Request"
                            onPress={() => {props.navigation.navigate('Add Request')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Fontisto
                                style={{marginLeft:5}}
                                name="blood-drop" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Donate Blood"
                            onPress={() => {props.navigation.navigate('Donate Blood')}}
                        />
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {logout()}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });