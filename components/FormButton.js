import React from 'react'
import { Text , StyleSheet , TouchableOpacity,ActivityIndicator} from 'react-native'
import { windowHeight , windowWidth } from '../utils/Dimensions'

export default function FormButton({buttonTitle,loading,...rest}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            {loading ? (<ActivityIndicator size='large' color='#fff' />) : <Text style={styles.buttonText}>{buttonTitle}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
        buttonContainer: {
          marginTop: 10,
          width: '100%',
          height: windowHeight / 15,
          backgroundColor: '#ca191f',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        },
        buttonText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#ffffff',
          fontFamily: 'Lato-Regular',
        },
})