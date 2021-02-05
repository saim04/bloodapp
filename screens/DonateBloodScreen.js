import React,{useState,useEffect,useContext} from 'react'
import { View, Text , FlatList , StyleSheet , TouchableOpacity  } from 'react-native'
import { Container ,Divider} from '../styles/FeedStyles'
import { windowHeight , windowWidth } from '../utils/Dimensions'
import firestore from '@react-native-firebase/firestore';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../navigation/AuthProvider'

const DonateBloodScreen = ({navigation}) => {
    const [requests,setRequests] = useState(null)
    const [visible, setVisible] = useState(false);
    const { user , logout } = useContext(AuthContext)
    const [donations,setDonations] = useState()

    const showModal = () => {
        setVisible(true)
    };
    const hideModal = () => {
        setVisible(false)
        }
    const containerStyle = {backgroundColor: 'white',height:260,width:300,marginBottom:45,alignSelf:'center',borderRadius:5,justifyContent:'center'};
    const fetchRequests = async() => {
        try {
          const list = [];
          await firestore()
          .collection('bloodrequests')
          .orderBy('postTime', 'desc')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {userId,userEmail,BloodFor,Gender,Name,Hospital,Message,MobileNumber,Address,BloodGroup,postTime} = doc.data();
              list.push({
                id: doc.id,
                userId,
                userEmail:userEmail,
                bloodFor:BloodFor,
                gender:Gender,
                name:Name,
                hospital:Hospital,
                message:Message,
                mobileNumber:MobileNumber,
                address:Address,
                bloodGroup:BloodGroup,
                postTime:postTime
              });
            })
          })
          setRequests(list);
          console.log('Requests: ', requests)
        } catch(e) {
          console.log(e);
        }
    }
    const confirm =() => {
        alert('Request Sent,You can now go and donate blood.')
        hideModal()
    }
    useEffect(() => {
       fetchRequests()
    }, [])
    return (
        <>
            <View 
            style={{display:'flex',flexDirection:'row',marginTop:60,marginLeft:10,alignItems:'center'}}
            >
            <Feather style={{justifyContent:'flex-start'}} name='menu' size={25} onPress={()=>navigation.openDrawer()} />
            <Text style={{marginLeft:90,fontSize:22,fontWeight:'bold'}}>BLOOD </Text>
            <Text style={{fontSize:22,color:'#e51433'}}>REQUESTS</Text>
            </View>
            <Divider />
            <Container>
                <FlatList
                    data={requests}
                    renderItem={({item})=> 
                    <>
                    <View style={{borderColor:'#dddddd',borderWidth:1,borderRadius:5,marginTop:10}}>
                        <View style={{flexDirection:'row',padding:20}}>
                            <View style={{backgroundColor:'#e51433',height:40,borderRadius:50,width:40,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:20}}>{item.bloodGroup.toUpperCase()}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontWeight:'bold',marginLeft:10,fontSize:15}}>
                                    {item.name} <Text style={{fontWeight:'normal'}}>is requesting blood for{'\n'}{item.bloodFor==='Self'?<Text>{item.gender==='Male'?<Text>himself</Text>:<Text>herself</Text>}</Text> :<Text>other</Text>} </Text> 
                                </Text>
                            </View>
                        </View>
                        <View 
                            style={{
                            borderBottomColor: '#dddddd',
                            borderBottomWidth: 1,
                            width:'90%',
                            alignSelf:'center',
                            }}
                            >
                         </View>
                        <View style={{}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row',alignItems:'center',padding:10,marginTop:10}}>
                                <Text style={{color:'#a6a6a6'}}>Mobile Number : </Text>
                                <Text style={{fontWeight:'bold'}}> 
                                    {item.mobileNumber}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                                <Text style={{color:'#a6a6a6'}}>Address : </Text>
                                <Text style={{}}> 
                                    {item.hospital}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                                <Text style={{color:'#a6a6a6'}}>Message : </Text>
                                <Text style={{}}> 
                                    {item.message}
                                </Text>
                            </View>
                        </View>
                        </View>
                        {user.email !== item.userEmail && <TouchableOpacity style={styles.buttonContainer} onPress={showModal} >
                        <Text style={styles.buttonText}>YES,I OPT TO DONATE.</Text>
                        </TouchableOpacity>}
                    </View>
            </>
                    }
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                />
                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                            <Text style={{fontWeight:'bold',fontSize:20}}>That's very gorgeous!</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                            <Text style={{fontSize:15}}>You have opted to donate blood to {'\n'}<Text style={{fontWeight:'bold',alignSelf:'center'}}></Text></Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                            <Text style={{fontSize:15}}>Please Confirm below to proceed {'\n'}with your noble cause.</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                            <TouchableOpacity 
                            style={styles.buttonContainer2} 
                            onPress={confirm}
                            >

                                <Text style={styles.buttonText}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
                            <TouchableOpacity onPress={hideModal} >
                                <Text style={{color:'#e51433',textDecorationLine:'underline'}}>No,I will donate later</Text>
                            </TouchableOpacity>
                        </View>
                        </Modal>
                    </Portal>
            </Provider>
            </Container>
        </>  
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: windowHeight / 15,
      backgroundColor: '#404040',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5,
      
    },
    buttonContainer2: {
        marginTop: 10,
        width: '80%',
        height: windowHeight / 15,
        backgroundColor: '#e51433',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
      },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      fontFamily: 'Lato-Regular',
    },
})

export default DonateBloodScreen
