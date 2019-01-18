import React, { Fragment } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Facebook } from "expo";
import QuickPicker from 'quick-picker'
import { loginFacebook } from "../../reducers/user";
import { FACEBOOK_APP_ID, GOOGLE_PLACES_API_KEY } from 'react-native-dotenv'


import AppStyles from "../../AppStyles";

import { register, login } from '../../reducers/user'

const { width } = Dimensions.get('window')

const Header = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
    <View style={{flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{textAlign: "center"}}>Must be 18+ to use this app</Text>
    </View>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => QuickPicker.close()} adjustsFontSizeToFit hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
        <Text style={{color: AppStyles.primaryColor, fontWeight: 'bold', fontSize: 16}}> DONE </Text>
      </TouchableOpacity>
    </View>
  </View>
)
class AuthHome extends React.Component {
  
  state = {
    active: "Login",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dob: 'Date of Birth',
    address: '',
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: "Login"
  };


  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync(facebookAppId, {
        permissions: ["public_profile", "email"],
        behavior: "web"
      });
      if (type === "success") {
        this.props.dispatch(loginFacebook(token, this.props.navigation));
      } else {
        Alert.alert("Something went wrong, please close the app and try again");
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  changeActive = (text) => {
    this.setState({ active: text });
  };

  handleSubmit = () => {
    const {
      active,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      dob,
      address,
    } = this.state
    const { dispatch, navigation } = this.props
    if (active === 'Sign Up'){
      if (!passwordConfirm || !password || !email || !firstName || !lastName || !dob || address){
        Alert.alert("Please complete all required fields")
        return
      } 
      if ((passwordConfirm && password) && passwordConfirm !== password) {
        Alert.alert("Passwords must match")
        return
      } else {
        let formattedDate = moment(dob).format('YYYY-MM-DD')
        dispatch(register(name, email, password, passwordConfirm, formattedDate, address))
        this.setState({ email: '', password: '', passwordConfirm: '', name: '', address: ''})
        return
      }
    } else if (active === 'Login' && (email && password !== '')){
        dispatch(login(email, password, navigation))
        this.setState({ password: ''})
      } else {
        Alert.alert("Please complete both fields")
      }
  };



  pickDate = () => {
    const date = typeof this.state.dob === 'string' ? moment()._d : this.state.dob
      QuickPicker.open({
        pickerType: 'date',
        mode: 'date',
        selectedValue: date,
        topRow: <Header />,
        onValueChange: (dob) => this.setState({dob}),
        useNativeDriver: true,
        onTapOut: QuickPicker.close()
      })
  }

  render() {
    const { active } = this.state;
    return (
      <Fragment>
        <SafeAreaView
          style={{ flex: 0, backgroundColor: AppStyles.primaryColor }}
        />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="position"
            contentContainerStyle={{ flex: 1 }}
            keyboardVerticalOffset={-100}
          >
            <View style={styles.headerContainer}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ top: "12%", height: "35%", width: "35%" }}
                  source={require("../../assets/icons/full-logo.png")}
                />
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.tabsContainer,
                    active === "Sign Up" ? styles.activeTab : []
                  ]}
                  onPress={() => this.changeActive("Sign Up")}
                >
                  <Text style={styles.tabText}> SIGN UP </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabsContainer,
                    active === "Login" ? styles.activeTab : []
                  ]}
                  onPress={() => this.changeActive("Login")}
                >
                  <Text style={styles.tabText}> LOGIN </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formContainer}>
              <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 30, paddingBottom: 15 }}
                scrollEnabled={active === "Login" ? false : true}
                enableAutomaticScroll={true}
                pinchGestureEnabled={false}
              >
                {active === "Sign Up" && (
                  <Fragment>
                  <View style={styles.lineItem}>
                  <Text style={styles.labelText}> First Name </Text>
                    <TextInput
                      style={styles.textInput}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={this.state.firstName}
                      textContentType={"name"}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.email.focus();
                      }}
                      onChangeText={firstName => this.setState({ firstName })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.lineItem}>
                    <Text style={styles.labelText}> Last Name </Text>
                      <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.lastName}
                        textContentType={"name"}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          this.email.focus();
                        }}
                        onChangeText={lastName => this.setState({ lastName })}
                        underlineColorAndroid="transparent"
                      />
                  </View>

                    <GooglePlacesAutocomplete
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'white', 
                            borderWidth: 0.5, 
                            borderColor: '#707070', 
                            borderRadius: 5,
                            paddingRight: '15%',
                            height: 50,
                            opacity: 1,
                            marginTop: 15,
                            zIndex: 1,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                          },
                          textInput: {
                            zIndex: 0,
                            fontFamily: 'System',
                            height: '70%',
                            paddingVertical: 1,
                            margin: 0,
                          },
                          container: {
                          },
                        
                          }}
                        minLength={2}
                        placeholder={null}
                        returnKeyType={'search'} 
                        listViewDisplayed={true} 
                        fetchDetails={true}
                        onPress={(data, details) => { 
                          this.setState({address: data.description})
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        GooglePlacesSearchQuery={{ rankby: 'distance'}}        
                        debounce={200} 
                        query={{
                          key: 'AIzaSyA9tAhBdeDbhjDDcBWKHxTMxYtVPU4df_w',
                          language: 'en', 
                        }}
                      >
                        <Text style={[styles.labelText, {paddingTop: '10.5%'}]}> Address </Text>
                      </GooglePlacesAutocomplete>

                    <View style={styles.lineItem}>
                      <TouchableOpacity 
                        style={styles.textInput}
                        onPress={() => this.pickDate()}
                      >
                      <Text style={styles.labelText}> Date of Birth </Text>
                        <Text style={{color: '#6F6F6F'}}> { typeof this.state.dob === 'string' ? '' : moment(this.state.dob).format('MMM Do YYYY') } </Text>
                      </TouchableOpacity>
                    </View>
                    
                  </Fragment>
                )}

        
                <View style={styles.lineItem}>
                  <Text style={styles.labelText}> Email </Text>
                  <TextInput
                    style={styles.textInput}
                    ref={input => {
                      this.email = input;
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    textContentType={"emailAddress"}
                    value={this.state.email}
                    onSubmitEditing={() => {
                      this.password.focus();
                    }}
                    onChangeText={email => this.setState({ email })}
                    underlineColorAndroid="transparent"
                  />

                </View>

                <View style={styles.lineItem}>
                  <Text style={styles.labelText}> Password </Text>
                  <TextInput
                    style={styles.textInput}
                    ref={input => {
                      this.password = input;
                    }}
                    autoCapitalize="none"
                    value={this.state.password}
                    autoCorrect={false}
                    textContentType={"none"}
                    secureTextEntry={true}
                    returnKeyType={active === "Sign Up" ? "next" : "go"}
                    onSubmitEditing={
                      active === "Sign Up"
                        ? () => this.passwordConfirm.focus()
                        : this.handleSubmit
                    }
                    onChangeText={password => this.setState({ password })}
                    underlineColorAndroid="transparent"
                  />

                </View>

                {active === "Login" && (
                  <View style={{ height: "8%", marginTop: "4.5%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        justifyContent: "flex-end",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        textAlignVertical="center"
                        textAlign="right"
                        style={{ fontSize: 11, color: "#707070" }}
                      >
                        Can't remember your password?
                      </Text>
                      <TouchableOpacity
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                      >
                        <Text
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          textAlignVertical="center"
                          textAlign="right"
                          style={{
                            fontSize: 11,
                            color: AppStyles.primaryColor
                          }}
                        > Press Here </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {active === "Sign Up" && (
                  <Fragment>
                    <View style={styles.lineItem}>
                      <Text style={styles.labelText}> Pass. Confirm </Text>

                      <TextInput
                        style={[styles.textInput, {paddingRight: '30%'}]}
                        ref={input => {
                          this.passwordConfirm = input;
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType={"none"}
                        secureTextEntry={true}
                        value={this.state.passwordConfirm}
                        returnKeyType="next"
                        onChangeText={passwordConfirm =>
                          this.setState({ passwordConfirm })
                        }
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    
                  </Fragment>
                )}

                <View style={styles.lineItem}>
                  <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                    <Text style={styles.tabText}>
                      { active === "Login" ? "Login" : "Sign Up" } 
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <QuickPicker />
      </Fragment>
    );
  }
}


export default connect()(AuthHome);

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: AppStyles.primaryColor
  },
  row: {
    flexDirection: "row"
  },
  tabsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "8%",
    borderBottomColor: "#DCDCDC", // Top padding
    borderBottomWidth: 5
  },
  activeTab: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "8%",
    borderBottomColor: "#FFF",
    borderBottomWidth: 5
  },
  tabText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12
  },
  formContainer: {
    flex: 3,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    height: 50,
    marginTop: 15
  },
  textInput: {
    width: "100%",
    height: "100%",
    paddingLeft: "5%",
    paddingRight: "25%",
    justifyContent: "center",
    borderColor: "#707070",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 0
  },
  labelText: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 10,
    right: width * 0.03,
    opacity: 0.8
  },
  button: {
    flex: 1,
    height: '100%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#707070",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "normal",
    backgroundColor: AppStyles.primaryColor
  }
});
