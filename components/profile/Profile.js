import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native'
import AppStyles from '../../AppStyles'

import { getProfile, logout } from '../../reducers/user'


class Profile extends React.Component{
  
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home',
    gesturesEnabled: false,
    drawerLockMode: 'locked-closed'
  }

  render(){

    return(
      <Fragment>
        <SafeAreaView style={{padding: 30, alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <TouchableOpacity onPress={ () => this.props.dispatch(logout(this.props.navigation))} style={{padding: 50, borderRadius: 5, borderColor: AppStyles.primaryColor, backgroundColor: AppStyles.primaryColor}}>
            <Text style={{ color: styles.primary } }> logout </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Fragment>    
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)