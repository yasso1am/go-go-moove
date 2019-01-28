import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Appstyles from '../../AppStyles'

const { height } = Dimensions.get('window')


class Header extends React.Component {
  render(){
    const { routeName } = this.props.navigation.state
    const color = this.props.color ? {backgroundColor: this.props.color} : {}
    const hamburger = require('../../assets/icons/menu-black.png')

  return (
    <View style={[styles.header, color]}>
      
      <TouchableOpacity 
        style={[styles.section, {padding: 25, alignItems: 'flex-start'}]}
      >
        <Image 
          fadeDuration={0} 
          style={{opacity: routeName === 'WorkoutSuccess' ? 0 : 1}} 
        />
      </TouchableOpacity>

      <View style={styles.section}>
        <Image 
        fadeDuration={0} 
        source={ require('../../assets/icons/moove-logo.png')}
        />
      </View>

      <TouchableOpacity 
        style={[styles.section, {padding: 25, alignItems: 'flex-end'}]}
        onPress={ () =>  this.props.navigation.openDrawer() }
      >
        <Image fadeDuration={0} source={hamburger}/> 
      </TouchableOpacity>

    </View>
  )
  }
}

const styles = StyleSheet.create({
  header:{
    height: (height * 0.09),
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  section: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  }
})

export default connect()(Header)

