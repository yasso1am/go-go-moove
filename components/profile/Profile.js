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

import { getProfile } from '../../reducers/user'


class Profile extends React.Component{
  
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home',
    gesturesEnabled: false,
    drawerLockMode: 'locked-closed'
  }

  componentDidMount(){
    const { dispatch } = this.props
      dispatch(getProfile())
  }

  render(){

    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#FE7C2A'}}>
          <Text> Profile Page </Text>
        </SafeAreaView>
      </Fragment>    
    )
  }
}

const styles = StyleSheet.create({

 
})

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)