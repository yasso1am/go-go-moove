import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import NavigationService from './NavigationService'

import CheckUser from './components/auth/CheckUser'
import AuthHome from './components/auth/AuthHome'
import ForgotPassword from './components/auth/ForgotPassword'
import AddressSearch from './components/utils/AddressSearch'

import Profile from './components/profile/Profile'

const AuthStack = createStackNavigator(
  {
    AuthHome: {screen: AuthHome},
    ForgotPassword: {screen: ForgotPassword},
  },
  { 
    navigationOptions: {
      headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
      headerTintColor: '#F1552D',
    }
  }
)

const MainStack = createStackNavigator(
  {
    Profile: {screen: Profile}
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: {
      headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
      headerTintColor: '#F1552D',
    },
  }
)

const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
  },
  { 
    initialRouteName: 'MainStack',
    drawerPosition: 'right',
  }
  )
  
  MainStack.navigationOptions = () => ({ 
    drawerLockMode: 'locked-closed', 
  })
   
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: CheckUser,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            { bootstrapped => (
                bootstrapped &&
                  <AppContainer ref={ navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                  }}/>
            )}
        </PersistGate>
      </Provider>
    );
  }
}
