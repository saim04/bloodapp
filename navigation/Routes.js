import React , {useContext,useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider'
import AppStack from './AppStack';
import firestore from '@react-native-firebase/firestore';

export default function Routes() {

    const {user} = useContext(AuthContext) 

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
