import React, { Fragment } from 'react';
import { 
  View, 
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Facebook } from 'expo'
import { connect } from 'react-redux'
import { loginFacebook } from '../../reducers/user'
import { facebookAppId } from '../../ENV'

import AppStyles from '../../AppStyles'

class AuthHome extends React.Component {

  static navigationOptions = {
    header: null,
    title: 'Account Selection',
  }

  state = { 
    active: 'Login'
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

  changeActive = (text) => {
    this.setState({ active: text})
  }

  render() {
    const {active} = this.state
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="position" contentContainerStyle={{flex: 1}} keyboardVerticalOffset={-100}>
         <StatusBar
            backgroundColor='blue'
            barStyle="light-content"
          />

        <View style={styles.headerContainer}>
            <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image resizeMode='contain' style={{top: '15%', height: '35%', width: '35%'}} source={ require('../../assets/icons/full-logo.png')}/>
            </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.tabsContainer, active === 'Sign Up' ? styles.activeTab : [] ]} onPress={ () => this.changeActive('Sign Up')}>
              <Text style={styles.tabText}> SIGN UP </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabsContainer, active === 'Login' ? styles.activeTab : [] ]} onPress={ () => this.changeActive('Login')}>
              <Text style={styles.tabText}> LOGIN </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView 
            style={{flex: 1}} 
            contentContainerStyle={{flex: 1}}
            pinchGestureEnabled={false}
            scrollEnabled={active === "Login" ? false : true}
          >
          
            <View style={styles.lineItem}>
              <TextInput 
                style={styles.textInput}
                placeholder='Username'
              />
            </View>
            <View style={styles.lineItem}>
              <TextInput 
                style={styles.textInput}
                placeholder='Password'
              />
            </View>

            { active === "Login" &&

            <View style={{height: '8%', marginTop: '3.5%'}}> 
              <View style={{flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text
                  adjustsFontSizeToFit 
                  numberOfLines={1}
                  textAlignVertical='center'
                  textAlign="right"
                  style={{fontSize: 11, color: '#707070'}}
                > 
                  Can't remember your password?
                </Text>
                <TouchableOpacity style={{height: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={ () => f => f}>
                  <Text 
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    textAlignVertical='center'
                    textAlign="right"
                    style={{fontSize: 11, color: AppStyles.primaryColor}}
                  > Press Here </Text>
                </TouchableOpacity>
              </View>
            </View>

            }

            { active === "Sign Up" &&
            <Fragment>
              <View style={styles.lineItem}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.tabText}> { active === "Login" ? "Login" : "Sign Up" } </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
            }




            <View style={styles.lineItem}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.tabText}> { active === "Login" ? "Login" : "Sign Up" } </Text>
              </TouchableOpacity>
            </View>

     
    
          </ScrollView>
          </SafeAreaView>
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: AppStyles.primaryColor
  },
  row: {
    flexDirection: 'row',
  },  
  tabsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '7%',
    borderBottomColor: '#DCDCDC',              // Top padding
    borderBottomWidth: 5,
  },
  activeTab:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '7%',
    borderBottomColor: '#FFF',
    borderBottomWidth: 5,
  },
  tabText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  formContainer: {
    flex: 3,
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  lineItem: {
    width: '100%',
    height: '14%',
    marginTop: '7%',
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingLeft: '5%',
    justifyContent: 'center',
    borderColor: '#707070',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#707070',
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: 'normal', 
    backgroundColor: AppStyles.primaryColor, 
  }
})


export default connect()(AuthHome)
