import React , { useState , useContext } from 'react'
import { View, Text , TextInput , StyleSheet , Button , StatusBar , Alert , ActivityIndicator} from 'react-native'
import { InputField , InputWrapper , AddImage , SubmitBtn ,SubmitBtnText , StatusWrapper } from '../styles/AddPost';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Feather from 'react-native-vector-icons/Feather'
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { windowHeight , windowWidth } from '../utils/Dimensions'
import FormButton from '../components/FormButton';
import {Divider, UserName} from '../styles/FeedStyles'
import { AuthContext } from '../navigation/AuthProvider'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Picker } from '@react-native-picker/picker'

export default function AddPostScreen({navigation}) {
    const [uploading,setUploading] = useState(false);
    const [ bloodGroup, setBloodGroup] = useState('none');
    const [address,setAddress] = useState('');
    const [mobile,setMobile] = useState('');
    const [city,setCity] = useState('');
    const [message,setMessage] = useState('');
    const [hospital,setHospital] = useState('');
    const [loading,setLoading] = useState(false);
    const [gender, setGender] = useState(null);
    const [bloodFor, setBloodFor] = useState(null);
    const [name,setName] = useState('');
    const { user , logout } = useContext(AuthContext)

    const submitRequest = async () => {
      try {
        setLoading(true)
      await firestore()
      .collection('bloodrequests')
      .add({
        userId : user.uid,
        userEmail : user.email ,
        BloodFor : bloodFor ,
        Gender:gender,
        Name:name,
        Hospital:hospital,
        Message:message,
        MobileNumber:mobile,
        Address:address,
        BloodGroup:bloodGroup,
        postTime : firestore.Timestamp.fromDate(new Date()),
      }) 
      setLoading(false)
      console.log('Post Added')
      setBloodGroup('none')
      setAddress('')
      setMobile('')
      setCity('')
      setMessage('')
      setHospital('')
      setGender(null)
      setBloodFor(null)
      setName('')
      alert('Request Added Successfully! Your Request will be published soon.')
      navigation.navigate('Home')
      } catch (error) {
        alert('Not Uploaded,Plz try again')
        console.log(error)
      }
    }

    return (
        <>
         <View 
          style={{display:'flex',flexDirection:'row',marginTop:60,marginLeft:10,alignItems:'center'}}
          >
          <Feather style={{justifyContent:'flex-start'}} name='menu' size={25} onPress={()=>navigation.openDrawer()} />
          <Text style={{marginLeft:90,fontSize:22,fontWeight:'bold'}}>REQUEST </Text>
          <Text style={{fontSize:22,color:'#e51433'}}>BLOOD</Text>
          </View>
          <Divider />
        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={{marginLeft:10,color:'#666',fontSize: 16}}>Blood for:</Text>
            <View style={{marginLeft:89,textAlign:'center',padding:20,display:'flex',flexDirection:'row'}} >
                <RadioButton
                uncheckedColor='#666'
                color='#ca191f'
                value="Self"
                status={ bloodFor === 'Self' ? 'checked' : 'unchecked' }
                onPress={() => setBloodFor('Self')}
                />
                <Text style={{alignSelf:'center',fontSize:17,color:'#666'}}>Self</Text>
                <RadioButton
                uncheckedColor='#666'
                color='#ca191f'
                value="Other"
                status={ bloodFor === 'Other' ? 'checked' : 'unchecked' }
                onPress={() => setBloodFor('Other')}
                />
                <Text style={{alignSelf:'center',fontSize:17,color:'#666'}}>Other</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                label={name}
                onChangeText={(userName)=>setName(userName)}
                placeholderTextColor='#666'
                placeholder='Name'
            />
            </View>
          <View style={styles.inputContainer}>
            <Text style={{marginLeft:10,color:'#666',fontSize: 16}}>Gender of Acceptor</Text>
            <View style={{marginLeft:20,textAlign:'center',padding:20,display:'flex',flexDirection:'row'}} >
                <RadioButton
                uncheckedColor='#666'
                color='#ca191f'
                value="Male"
                status={ gender === 'Male' ? 'checked' : 'unchecked' }
                onPress={() => setGender('Male')}
                />
                <Text style={{alignSelf:'center',fontSize:17,color:'#666'}}>Male</Text>
                <RadioButton
                uncheckedColor='#666'
                color='#ca191f'
                value="Female"
                status={ gender === 'Female' ? 'checked' : 'unchecked' }
                onPress={() => setGender('Female')}
                />
                <Text style={{alignSelf:'center',fontSize:17,color:'#666'}}>Female</Text>
            </View>
          </View>
            <View style={styles.inputContainer} >
              <Text style={{marginLeft:10,color:'#666',fontSize: 16}}>Blood Group</Text>
              <View style={{marginLeft:108}} >
                <Picker
                  selectedValue={bloodGroup}
                  style={{ height: 50, width: 110 , color:'#666' }}
                  onValueChange={(itemValue, itemIndex) => setBloodGroup(itemValue)}
                >
                  <Picker.Item label="Select" value="none" />
                  <Picker.Item label="A+" value="a+" />
                  <Picker.Item label="A-" value="a-" />
                  <Picker.Item label="B+" value="b+" />
                  <Picker.Item label="B-" value="b-" />
                  <Picker.Item label="AB+" value="ab+" />
                  <Picker.Item label="AB-" value="ab-" />
                  <Picker.Item label="O+" value="o+" />
                  <Picker.Item label="O-" value="o-" />
                </Picker>
              </View>
            </View>
            <View style={{width: '100%',
                height: windowHeight / 10,
                borderColor: '#ccc',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
            <TextInput
                style={styles.input}
                label={address}
                multiline
                numberOfLines={4}
                onChangeText={(userAddress)=>setAddress(userAddress)}
                placeholderTextColor='#666'
                placeholder='Address'
            />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                label={mobile}
                onChangeText={(userMobile)=>setMobile(userMobile)}
                placeholderTextColor='#666'
                placeholder='Mobile Number'
                keyboardType='number-pad'
            />
            </View>
            <View style={{width: '100%',
                height: windowHeight / 10,
                borderColor: '#ccc',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
            <TextInput
                style={styles.input}
                label={hospital}
                numberOfLines={4}
                multiline
                onChangeText={(userHospital)=>setHospital(userHospital)}
                placeholderTextColor='#666'
                placeholder='Place to Donate (Hospital,State,Area,etc)'
            />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                label={city}
                onChangeText={(userCity)=>setCity(userCity)}
                placeholderTextColor='#666'
                placeholder='City'
            />
            </View>
            <View style={{width: '100%',
                height: windowHeight / 10,
                borderColor: '#ccc',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
            <TextInput
                style={styles.input}
                label={message}
                numberOfLines={3}
                multiline
                onChangeText={(userMessage)=>setMessage(userMessage)}
                placeholderTextColor='#666'
                placeholder='Message to Donor (urgency,time,etc.)'
            />
            </View>
            <FormButton
                buttonTitle='Submit Request'
                loading={loading}
                onPress={submitRequest}
            />
        </View>
        </>
    )
}


const styles = StyleSheet.create({
  inputContainer: {
  width: '100%',
  height: windowHeight / 15,
  borderColor: '#ccc',
  borderWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    padding: 20,
    
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 30,
    marginBottom: 10,
    color: '#000',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ca191f',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});