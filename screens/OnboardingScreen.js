import React , { useState , useEffect } from 'react';
import {TextInput , Button , StyleSheet,Image,View,Text,TouchableOpacity,} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

// export default function SignUpScreen ({navigation}) {

//   const [email,setEmail] = useState();
//   const [password,setPassword] = useState();
//   const [currentUser,setCurrentUser]=useState();

//   const submit = async () => {
//     try {
//         await auth().createUserWithEmailAndPassword(email,password)
//         navigation.navigate('Home',{
//             user:currentUser
//         })
//         setEmail('')
//         setPassword('')
//     } catch (err) {
//         alert(err.message)
//     }
//     }
//     useEffect(() => {
//         const unsubscribe = auth().onAuthStateChanged(user =>{
//             setCurrentUser(user)
//         })
//         return unsubscribe
//     }, [])
//     console.log(currentUser)
//   return (
//     <>
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <Text style={{fontSize:30,color:'#327fa8',padding:10}}>SignUp</Text>
//           <TextInput 
//           keyboardType='email-address'
//           style={{borderWidth:1,borderColor:'#ccc',width:'80%',marginBottom:10}}
//           placeholder='Email'
//           value={email}
//           onChangeText={(text)=>setEmail(text)}
//           autoCorrect={false}
//           />
//           <TextInput 
//           autoCorrect={false}
//           style={{borderWidth:1,borderColor:'#ccc',width:'80%',marginBottom:10}}
//           placeholder='Password'
//           secureTextEntry={true}
//           value={password}
//           onChangeText={(text)=>setPassword(text)}
//           />
//           <TouchableOpacity 
//             style={{backgroundColor:'#327fa8',width:'50%',padding:10,borderRadius:5}} 
//             onPress={submit}
//             >
//                 <Text style={{color:'#fff',fontSize:29,textAlign:'center'}}>Enter</Text>
//             </TouchableOpacity>
//           <TouchableOpacity>
//                 <Text 
//                 onPress={()=>navigation.navigate('Login')}
//                 style={{textAlign:'right'}}
//                 >
//                 Already have an account ? Login.
//                 </Text>
//             </TouchableOpacity>
//       </View>
//     </>
//   );
// };

export default function OnboardingScreen ({navigation}) {

  return (
    <>
      <Onboarding
        onSkip={()=>navigation.navigate('login')}
        onDone={()=>navigation.navigate('login')}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/onboarding/img1.png')} />,
            title: 'Onboarding 1',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/onboarding/img2.png')} />,
            title: 'Onboarding 2',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#e9bcbe',
            image: <Image source={require('../assets/onboarding/img3.png')} />,
            title: 'Onboarding 3',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </>
  );
};
