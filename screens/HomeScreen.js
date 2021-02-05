import React , { useContext , useEffect , useState } from 'react'
import { View, Text , StyleSheet  , FlatList,Alert ,TouchableOpacity,Image,ImageBackground, StatusBar} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {Divider} from '../styles/FeedStyles'
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({navigation}) {
  return(
    <>
    <StatusBar backgroundColor='transparent' barStyle='dark-content' />
    <View>
      <View 
      style={{display:'flex',flexDirection:'row',marginTop:60,marginLeft:10,alignItems:'center',}}
      >
      <Feather style={{justifyContent:'flex-start'}} name='menu' size={25} onPress={()=>navigation.openDrawer()} />
      <Text style={{marginLeft:120,fontSize:22,fontWeight:'bold'}}>SAVE </Text>
      <Text style={{fontSize:22,color:'#e51433'}}>LIFE</Text>
      </View>
      <Divider />
      <TouchableOpacity onPress={()=>navigation.navigate('Add Request')}>
      <View style={{height:340,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Image style={{height:190,width:190,alignSelf:'center'}} source={require('../assets/requestblood-01.png')} />
        <Text style={{fontSize:30,alignSelf:'center',color:'#000'}}>REQUEST BLOOD</Text>
        <Text style={{fontSize:12,color:'#666'}}>TAP HERE TO REQUEST FOR BLOOD</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Donate Blood')}>
      <View style={{height:355,backgroundColor:'#e51433',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Image style={{height:190,width:190}} source={require('../assets/donateblood-01.png')} />
        <Text style={{fontSize:30,alignSelf:'center',color:'#fff'}}>DONATE BLOOD</Text>
        <Text style={{fontSize:12,color:'#fff'}}>SEE REQUESTS FOR BLOOD</Text>
      </View>
      </TouchableOpacity>
    </View>
    </>
  )
}