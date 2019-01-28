import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  SafeAreaView,
  Platform,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppStyles from '../../AppStyles'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FACEBOOK_APP_ID, GOOGLE_PLACES_API_KEY } from 'react-native-dotenv'


import Header from '../nav/Header'
const {width} = Dimensions.get('window')

class StartBooking extends React.Component{
  
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home',
    gesturesEnabled: false,
    drawerLockMode: 'locked-closed'
  }

  state = {
    pickUp: '',
    dropOff: '',
  }

  render(){
    const { pickUp, dropOff } = this.state

    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, paddingTop: Platform.OS === 'android' ? 25: 0}} />
        <SafeAreaView style={{flex: 1}}>
         <Header navigation={this.props.navigation} />
         <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 30, paddingBottom: 15 }}
            scrollEnabled={false}
            enableAutomaticScroll={true}
            pinchGestureEnabled={false}
          >

          <View style={styles.topContainer}>

            <View style={styles.titleContainer}>
              <Text style={{fontSize: 20, color: AppStyles.primaryColor, fontFamily: AppStyles.titleFont}}>Start Mooving</Text>
              <Text 
                style={{fontFamily: AppStyles.normalFont, color: AppStyles.fontColor}}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Fill out the form below to get an estimate on your moove
              </Text> 
            </View>
            <View style={{height: 1, width: '100%', borderColor: '#707070', borderWidth: 0.5}} />
            
            <View style={styles.inputsContainer}>
              <GooglePlacesAutocomplete
                styles={{
                  textInputContainer: styles.googleInputContainer, 
                  textInput: styles.googleInput,
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en', 
                }}
                GooglePlacesSearchQuery={{ rankby: 'distance'}}        
                debounce={200} 
                nearbyPlacesAPI='GooglePlacesSearch'
                placeholder="What's the pickup location?"
                returnKeyType={'search'} 
                minLength={2}
                renderLeftButton={()  => <Image style={styles.searchIcon} source={require('../../assets/icons/location-icon.png')} />}
                listViewDisplayed={false} 
                fetchDetails={false}
                textInputProps={{ ref: textInput => this.pickUp = textInput}}
                onPress={(data) => { 
                  this.setState({pickUp: data.description})
                }}
              >
                <Text style={[styles.labelText, {paddingTop: '10.5%'}]}> { pickUp.length > 0 ? 'Pick Up' : '' } </Text>
              </GooglePlacesAutocomplete>
              <GooglePlacesAutocomplete
                styles={{
                  textInputContainer: styles.googleInputContainer, 
                  textInput: styles.googleInput,
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en', 
                }}
                GooglePlacesSearchQuery={{ rankby: 'distance'}}        
                debounce={200} 
                nearbyPlacesAPI='GooglePlacesSearch'
                placeholder="What's the dropoff location?"
                returnKeyType={'search'} 
                minLength={2}
                listViewDisplayed={false} 
                renderLeftButton={()  => <Image style={styles.searchIcon} source={require('../../assets/icons/location-icon.png')} />}
                fetchDetails={false}
                textInputProps={{ ref: textInput => this.dropOff = textInput}}
                onPress={(data) => { 
                  this.setState({dropOff: data.description})
                }}
              >
                <Text style={[styles.labelText, {paddingTop: '10.5%'}]}> { dropOff.length > 0 ? 'Drop Off' : '' } </Text>
              </GooglePlacesAutocomplete>
            </View>

          </View>
          
          <View style={styles.detailsContainer}>
            <Text 
                style={styles.subtitle}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Type of Moove
            </Text> 

            <Text 
                style={styles.subtitle}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Will you need additional help?
            </Text> 
          </View>

          <View style={styles.quoteContainer}>

          </View>

         </KeyboardAwareScrollView>
      
        </SafeAreaView>
      </Fragment>    
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  detailsContainer: {
    flex: 5,
  },
  quoteContainer: {
    flex: 2,
    justifyContent: 'space-around',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'space-around',
  },
  inputsContainer: {
    flex: 3,
  },
  searchIcon: {
    alignSelf: 'center',
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: -8,
  },
  labelText: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 10,
    right: width * 0.03,
    opacity: 0.8
  },
  subtitle: {
    fontSize: 13, 
    fontFamily: AppStyles.titleFont, 
    color: AppStyles.fontColor
  },
  googleInputContainer: {
    backgroundColor: 'white', 
    borderWidth: 0.5, 
    borderColor: '#707070', 
    borderRadius: 5,
    paddingRight: '15%',
    height: 50,
    marginTop: 15,
  },
  googleInput: {
    fontFamily: AppStyles.normalFont,
    height: '70%',
    paddingVertical: 1,
    margin: 0,
  },
})


const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(StartBooking)