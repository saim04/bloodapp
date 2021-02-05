import React , { useState , useContext } from 'react'
import { View, Text , StatusBar , StyleSheet , Image , TextInput  , TouchableOpacity, Button} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider'


export default function LoginScreen({navigation}) {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading,setLoading] = useState(false)

    const { login } = useContext(AuthContext);
    const logIn = async () => {
      try {
        setLoading(true)
        await login(email,password)
        setLoading(false)
      } catch (error) {
        alert(error)
      }
    }
    return (
        <>
        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo} 
            />
            <Text style={styles.text}>SIGN IN</Text>

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

            <FormButton
                buttonTitle='Sign In'
                onPress={logIn} 
                loading={loading}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={()=>{}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>                
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={()=>{navigation.navigate('signup')}}>
                <Text style={styles.navButtonText}>Don't Have an account ? Signup.</Text>                
            </TouchableOpacity>

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
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
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ca191f',
      fontFamily: 'Lato-Regular',
    },
  });