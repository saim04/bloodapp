import React , { useState , useContext } from 'react'
import { View, Text , StatusBar , StyleSheet , ScrollView , Image , TextInput  , TouchableOpacity} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { windowHeight , windowWidth } from '../utils/Dimensions'
import { RadioButton , Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'
import { AuthContext } from '../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker';


export default function SignupScreen({navigation}) {
    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [city,setCity] = useState();
    const [loading,setLoading] = useState(false);
    const [address,setAddress] = useState();
    const [displayName,setdisplayName] = useState();
    const [ bloodGroup, setBloodGroup] = useState('none');
    const [gender, setGender] = useState(null);
    const { register , user } = useContext(AuthContext);
    
    const signup = async () => {
      try {
        setLoading(true)
        await register(email,password,displayName,gender,bloodGroup,city,address)
        setLoading(false)
      } catch (error) {
        alert(error)
      }
    }

    return (
        <>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' />
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>REGISTER</Text>
            <Text style={{color:'#666',fontSize:12,marginBottom:10}}>Please enter your details to proceed</Text>
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail)=>setEmail(userEmail)}
                placeholderText="Email"
                iconType='user'
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete={false}
            />

            <FormInput 
                labelValue={password}
                onChangeText={(userPassword)=>setPassword(userPassword)}
                placeholderText="Password"
                iconType='lock'
                secureTextEntry={true}
            />
            <FormInput 
                labelValue={displayName}
                onChangeText={(userPassword)=>setdisplayName(userPassword)}
                placeholderText="Name"
                iconType='user'
            />
            
            <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name='user' size={25} color='#666' />
            </View>
            <Text style={{marginLeft:10,color:'#666',fontSize: 16}}>Gender</Text>
            <View style={{marginLeft:50,textAlign:'center',padding:20,display:'flex',flexDirection:'row'}} >
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
              <View style={styles.iconStyle}>
                  <Fontisto name='blood-drop' size={25} color='#666' />
              </View>
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
            <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <FontAwesome5 name='city' size={25} color='#666' />
            </View>
            <TextInput
                style={styles.input}
                label={city}
                onChangeText={(userCity)=>setCity(userCity)}
                placeholderTextColor='#666'
                placeholder='City'
            />
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <FontAwesome5 name='address-card' size={25} color='#666' />
            </View>
            <TextInput
                style={styles.input}
                label={address}
                onChangeText={(userAddress)=>setAddress(userAddress)}
                placeholderTextColor='#666'
                placeholder='Address'
            />
            </View>

            <FormButton
                buttonTitle='Sign Up'
                loading={loading}
                onPress={signup} 
            />

            <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                    </Text>
                    <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                        Terms of service
                    </Text>
                    </TouchableOpacity>
                    <Text style={styles.color_textPrivate}> and </Text>
                    <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Privacy Policy
                    </Text>
            </View>
            <TouchableOpacity style={styles.navButton} onPress={()=>{navigation.navigate('login')}}>
                <Text style={styles.navButtonText}>Already Have an Account ? Log In.</Text>                
            </TouchableOpacity>
        </View>
        </ScrollView>
        
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
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
      paddingTop: 100
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