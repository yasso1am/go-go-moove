import React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
} from 'react-native';
import { Facebook } from 'expo'
import { connect } from 'react-redux'
import { loginFacebook } from '../../reducers/user'
import { facebookAppId } from '../../ENV'

class AuthHome extends React.Component {

  static navigationOptions = {
    header: null,
    title: 'Account Selection',
  }

  loginFacebook = async() => {
    try {
      const { type, token, expires, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync(facebookAppId, {
        permissions: ['public_profile', 'email'],
        behavior: 'web',
      })
        if (type === 'success') {
          this.props.dispatch(loginFacebook(token, this.props.navigation))
        } else {
          Alert.alert('Something went wrong, please close the app and try again')
        }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Auth Home </Text>
        </View>
    );
  }
}

export default connect()(AuthHome)

const styles = StyleSheet.create({
  
})