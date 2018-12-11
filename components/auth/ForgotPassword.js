import React from 'react'
import { connect } from 'react-redux'
import { 
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native'

class ForgotPassword extends React.Component {
  state = { email: '' }

  forgotPasswordWebView = () => {
    const { email } = this.state
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if ( !emailRegEx.test(email) ){
      Alert.alert('Please enter a valid email address')
    } else {
      Linking.openURL(`https://app.gogomove.reset?email=${email}`)
    }
  }


  render() {
    return(
      <View>
        <Text> Forgot Password </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
   
})


export default ForgotPassword