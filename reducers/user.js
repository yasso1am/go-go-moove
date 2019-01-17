import axios from 'axios';
import { Alert } from 'react-native'
import { BASE_URL } from 'react-native-dotenv'
debugger
// ApiClient.init(BASE_URL)

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const TOKEN = 'TOKEN'


export const loginFacebook = (fb_access_token, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/login/facebook`, {access_token: fb_access_token})
    .then( async res => {
      let user = res.data.user
      let token = res.data.token
      const tenMinutesFromNow = Date.now() + ((token.expires_in - 15) * 1000)
        token.expires_on = tenMinutesFromNow
          dispatch({type: TOKEN, token: token})
          dispatch({type: LOGIN, user})
          if (!user.height){
            navigation.navigate('BuildProfile')
          } else {
            navigation.navigate('Profile')
          }
    })
    .catch ( err => {
      console.log({err})
      Alert.alert(`Error signing in: ${err.response.data[0]}`)
    })
  }
}

export const register = (name, email, password, passwordConfirm, dob, country, stateAbv, city, line1, line2, zip, navigation) => {
  debugger
  return (dispatch) => {
    axios.post(`${BASE_URL}/register`, {name: name, email: email, password: password, password_confirmation: passwordConfirm, dob: dob, country: country, state: stateAbv, city: city, line_1: line1, line2: line2, zip: zip} )
      .then( async (res) => {
        let user = res.data.user
        let token = res.data.token
          const tenMinutesFromNow = Date.now() + ((token.expires_in - 15) * 1000)
          token.expires_on = tenMinutesFromNow
            dispatch({type: TOKEN, token: token})
            dispatch({type: LOGIN, user})
              navigation.navigate('Profile')
      })
      .catch( error => {
        console.log({error})
        Alert.alert(`Error registering user: ${error.response.data[0]}`)
      })
  }
}

export const login = (email, password, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/login`, { email: email, password: password} )
      .then ( res => {
        let user = res.data.user
        let token = res.data.token
          const tenMinutesFromNow = Date.now() + ((token.expires_in - 15) * 1000)
          token.expires_on = tenMinutesFromNow
            dispatch({type: TOKEN, token})
            dispatch({type: LOGIN, user})
            navigation.navigate('Profile')
      })
      .catch( err => {
        console.log({err})
        Alert.alert('Wrong username or password, please try again')
      })
  }
}

export const updateProfile = (profile) => {
  return ( dispatch, getState ) => {
    const { id } =  getState().user
    axios.put(`${BASE_URL}/v1/user/${id}`, profile)
    .then( res => {
      dispatch({type: LOGIN, user: res.data.user})
    })
    .catch( err => {
      Alert.alert('Something went wrong updating your profile, please try again later')
      console.log({err})
    })
  }
}

export const getProfile = () => {
  return (dispatch, getState) => {
    const { id } = getState().user
    axios.get(`${BASE_URL}/v1/user/${id}`)
      .then( (res) => {
        console.log('Successfully retrieved profile from server, and dispatching Login')
        dispatch({type: LOGIN, user: res.data})
      })
      .catch( err => {
        console.log('The catch of getProfile() has been hit, so the function failed')
        console.log({err})
      })
  }
}

export const logout = (navigation) => {
  debugger
  return ( dispatch ) => {
    axios.post(`${BASE_URL}/v1/logout`)
    .then( res => {
      Alert.alert('Signed out')
      dispatch({type: LOGOUT})
      dispatch({type: TOKEN, token: {} })
      navigation.navigate('Auth')
    })
    .catch ( err => {
      console.log({err})
    })
  }
}

export default ( state = {}, action ) => {
  switch(action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    default:
      return state;
  }
}