import React , {useContext,useState,useEffect} from 'react'
import { View, Text , StyleSheet , Image , StatusBar ,ImageBackground , TouchableOpacity,ActivityIndicator , TextInput } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Header, Content, Button, ListItem,   Left, Body, Right, Switch } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import { AddImage } from '../styles/AddPost'
import Feather from 'react-native-vector-icons/Feather'
import {Divider} from '../styles/FeedStyles'
import Entypo from 'react-native-vector-icons/Entypo'
import Zocial from 'react-native-vector-icons/Zocial'
import { windowHeight , windowWidth } from '../utils/Dimensions'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UpdateUsername({navigation}) {
    const { user , logout } = useContext(AuthContext)
    const [users,setUsers] = useState('')
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState('')
    const fetchUsers = async() => {
            try {
              const list = [];
              await firestore()
              .collection('users')
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(user => {
                  const {email,city} = user.data()
                  list.push({
                    email:email,
                    city:city
                  })
                });
              });
              setUsers(list);
              if(loading) {
                setLoading(false);
              }
            } catch(e) {
              console.log(e);
            }
          }

    const UpdateUsername = async () => {
        try {
            const updated = {
                displayName : username,
            }
            setLoading(true)   
            await user.updateProfile(updated);
            setLoading(false)
            navigation.navigate('Edit Profile')
            setUsername('')
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }  
          
    useEffect(() => {
      fetchUsers();
    },[]);
    let city = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user.email) {
            city.push(users[i].city);
        }
    }
    console.log(city)
    return (
        <>
          <StatusBar backgroundColor='#ca191f' barStyle='light-content' />
          
          <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Feather style={{justifyContent:'flex-start',marginLeft:-135,marginTop:30}} name='menu' color='#fff' size={25} onPress={()=>navigation.openDrawer()} />
              <Text style={{marginTop:35,alignSelf:'center',marginLeft:110,color:'#fff',fontSize:20,fontWeight:'bold'}}>PROFILE</Text>
            </View>
            <View style={styles.profilepictureContainer}>
                <Image 
                    source={user.photoURL === null ? 
                    {uri:'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'} :
                    {uri:user.photoURL}}
                    style={styles.profilepicture}
                />
            </View>
            {user.displayName === null ?<Text style={{marginTop:16,fontSize:25,fontWeight:'bold',color:'#fff'}}>No Username Set.</Text>:<Text style={{marginTop:16,fontSize:25,fontWeight:'bold',color:'#fff'}}>{user.displayName}</Text>}
            <Text style={{marginTop:5,fontSize:15,fontWeight:'600',color:'#fff'}}>{user.email}</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
              <Entypo name='location-pin' size={25} color='#fff' />
              <Text style={{marginBottom:1,fontSize:15,fontWeight:'600',color:'#fff'}}>{city} , Pakistan</Text>
            </View>
        </View>
        <View style={{padding:10,marginTop:8,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20,color:'#ca191f',fontWeight:'bold'}}>Change Username</Text>
        </View>
        <View style={{padding:10,marginTop:1,justifyContent:'center',alignItems:'center'}}>
        {user.displayName === null ? <Text style={{fontSize:20}}>No Username Set.</Text> :<Text style={{fontSize:20}}>Current Username : {user.displayName}</Text>}
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name='user' size={25} color='#666' />
            </View>
            <TextInput 
                style={styles.input}
                value={username}
                onChangeText={(e)=>setUsername(e)}
                placeholder='Change Username'
            />
        </View>
        <View style={{padding:10,marginTop:5,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:13}}>Note : You have to restart the app to see changes.</Text>
        </View>
        
        <TouchableOpacity style={styles.buttonContainer} onPress={UpdateUsername}>
            {loading ? (<ActivityIndicator size='large' color='#fff' />) :  <Text style={styles.buttonText}>Update</Text>}
        </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ca191f',
        padding:30
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        padding:50,
        borderRadius:100
    },
    profilepictureContainer : {
        shadowColor:'#151734',
        shadowOpacity:0.4,
        shadowRadius:15,
    },
    profilepicture:{
        width:136,
        height:136,
        borderRadius:68,
        marginTop:10,
        borderWidth:2,
        borderColor:'#fff'
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: '#fff',
    },
      iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
      input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
      buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#ca191f',
        padding: 10,
        alignItems: 'center',
        marginTop:160,
        justifyContent: 'center',
        flexDirection:'row',
    },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft:2,
        fontFamily: 'Lato-Regular',
    },
})