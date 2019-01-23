import React, { Fragment } from "react";
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
  Linking
} from "react-native";
import AppStyles from "../../AppStyles";

const { width } = Dimensions.get('window')
class ForgotPassword extends React.Component {
  state = { email: "" };

  static navigationOptions = {
    header: null
  };

  forgotPasswordLink = () => {
    const { email } = this.state;
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegEx.test(email)) {
      Alert.alert("Please enter a valid email address");
    } else {
      Linking.openURL(
        `https://app.gogomoove.com/password/reset?email=${email}`
      );
    }
  };

  render() {
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
            keyboardVerticalOffset={-50}
          >
            <View style={{paddingLeft: 30, paddingTop: 15, backgroundColor: AppStyles.primaryColor, width: '100%'}}>
              <TouchableOpacity hitSlop={{top: 50, bottom: 50, left: 50, right: 50}} onPress={ () => this.props.navigation.goBack()}>
                <Image source={require("../../assets/icons/back-button.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
              <Image
                resizeMode="contain"
                style={{ bottom: "5%", height: "35%", width: "35%" }}
                source={require("../../assets/icons/full-logo.png")}
              />
            </View>
            <View style={styles.bodyContainer}>
              <View style={{ alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 20 }}>Forgot Password</Text>
                <Text style={{ color: "#707070", paddingVertical: 10 }}>
                  Enter your email down below, and we will send you a link to
                  reset your password
                </Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.labelText}> Email </Text>
                <TextInput
                  style={styles.textInput}
                  autofocus
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="send"
                  onSubmitEditing={() => f => f}
                  onChangeText={email => this.setState({ email })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity
                style={[styles.button]}
                onPress={this.forgotPasswordLink}
              >
                <Text style={{ color: "white" }}> Recover Password </Text>
              </TouchableOpacity>
              <Text style={{ color: "#707070"}}> This will open your phone's browser </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    backgroundColor: AppStyles.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  },
  bodyContainer: {
    flex: 3,
    backgroundColor: "#F8F8F8",
    padding: 30,
    alignItems: "center"
  },
  lineItem: {
    flexDirection: "row",
    alignItems: "center",
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
    zIndex: 0
  },
  labelText: {
    position: "absolute",
    zIndex: 1,
    fontSize: 10,
    right: width * 0.03,
    opacity: 0.8
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    marginVertical: 15,
    height: 50,
    backgroundColor: AppStyles.primaryColor,
    borderColor: AppStyles.primaryColor,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ForgotPassword;
