import React from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { validateTokenAndUser } from '../../reducers/auth'
import AppStyles from '../../AppStyles'

class CheckUser extends React.Component{

  async componentDidMount() {
    const { user } = this.props
    validToken = await validateTokenAndUser()
    if (user && validToken === true){
      console.log('Token validation and stored user fetching succesful')
      this.props.navigation.navigate('App')
    } else {
        this.props.navigation.navigate('Auth')
    }
  }

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={AppStyles.primaryColor} />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CheckUser)