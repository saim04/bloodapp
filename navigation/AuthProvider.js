import React, { createContext , useState , useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import generateUniqueId from 'generate-unique-id'

export const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [user,setUser] = useState(null);
    const [ loading , setLoading ] = useState(true)
    const [initializing,setInitializing] = useState(true);

    const id = generateUniqueId({
        length: 30,
        useLetters: true
    });


    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user =>{
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    
    return (
            <AuthContext.Provider value={{
                user,
                login: async (email,password)=>{
                    try {
                        await auth().signInWithEmailAndPassword( email , password )
                    } catch (error) {   
                        alert(error)
                    }
                },
                register : async ( email , password , displayName , gender , bloodGroup ,city , address )=>{
                    try {
                        await auth().createUserWithEmailAndPassword(email,password,displayName)
                        firestore()
                        .collection('users')
                        .add({
                            id: id ,
                            email : email ,
                            gender: gender ,
                            bloodGroup : bloodGroup ,
                            city : city , 
                            address : `${address},${city}`
                        })
                    } catch (error) {   
                        alert(error)
                    }
                },
                logout : async () => {
                    try {
                        await auth().signOut()
                    } catch (error) {
                        console.log(error)
                    }
                }

            }
            }>
                { children }
            </AuthContext.Provider>
        )
}
